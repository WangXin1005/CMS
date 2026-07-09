<!-- articles/index - 文章管理页（懒加载） -->
<script lang="ts" setup>
import { ref, onMounted, computed, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { sanitizeHtml } from "~/utils/sanitize";
import { Plus } from "@element-plus/icons-vue";
definePageMeta({ middleware: "auth" });

const { getAdminList, getMyArticles, update, updateMyArticle, remove, removeMyArticle } = useArticle();
const { role, username: currentUsername } = useAuth();

const isAdmin = computed(() => role.value === "ADMIN" || role.value === "SUPERADMIN");
const isGuest = computed(() => role.value === "GUEST");
const roleLevel: Record<string, number> = { SUPERADMIN: 3, ADMIN: 2, USER: 1, GUEST: 0 };
function canEdit(row: Record<string, unknown>) {
  if (isGuest.value) return false;
  if (role.value === 'SUPERADMIN') return true;
  // 自己的文章始终可编辑
  if (row.author?.username === currentUsername.value) return true;
  // ADMIN 可编辑下级用户（USER/GUEST）的文章
  if (role.value === 'ADMIN') { const lv = roleLevel[(row.author?.role as string) || ''] ?? -1; return lv <= 1; }
  return false;
}
function canEditPreview() {
  if (isGuest.value) return false;
  if (role.value === 'SUPERADMIN') return true;
  const authorName = dialogArticle.value?.author?.username;
  // 自己的文章始终可编辑
  if (authorName === currentUsername.value) return true;
  const authorRole = (dialogArticle.value?.author?.role as string) || '';
  // ADMIN 可编辑下级用户（USER/GUEST）的文章
  if (role.value === 'ADMIN') return roleLevel[authorRole] <= 1;
  return false;
}
const canEditPreviewDialog = computed(() => canEditPreview());

const articles = ref([]);
// 使用 useTableHeight 测量 page-card 高度（懒加载无分页器，offset=0）
const { wrapperRef, tableHeight } = useTableHeight(0);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(15);
const total = ref(0);
const statusFilter = ref(undefined);

const keyword = ref("");
const searchKeyword = ref("");

const filterCategoryId = ref(undefined);
const filterTagId = ref(undefined);
const filterAuthorId = ref(undefined);

const categories = ref([]);
const tags = ref([]);
const users = ref([]);

const dialogVisible = ref(false);
const dialogArticle = ref(null);
const allLoaded = ref(false);
const showEndMarker = computed(() => allLoaded.value && articles.value.length * 48 > (tableHeight.value || 600));
const loadingMore = ref(false);
const loadLocked = ref(false);
const tableRef = ref();

const displayArticles = computed(() => {
  if (showEndMarker.value) return [...articles.value, { _isEndMarker: true }];
  return articles.value;
});

const columnCount = computed(() => (isAdmin.value ? 10 : 9));

function tableSpanMethod({ row, columnIndex }) {
  if (row._isEndMarker) {
    if (columnIndex === 0) return [1, columnCount.value];
    return [0, 0];
  }
}

function viewArticle(row) { dialogArticle.value = row; dialogVisible.value = true; }

function onSearch() { searchKeyword.value = keyword.value.trim(); loadData(); }

function handleTableScroll() {
  if (allLoaded.value || loading.value || loadingMore.value || loadLocked.value) return;
  const el = tableRef.value?.$el?.querySelector(".el-table__body-wrapper");
  if (!el) return;
  const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
  if (dist <= 60) {
    loadLocked.value = true;
    currentPage.value++;
    loadData(true);
  }
}

const statusLabel = { PUBLISHED: "已发布", DRAFT: "草稿" };
const statusType = { PUBLISHED: "success", DRAFT: "warning" };

async function loadFilters() {
  try {
    const { getList: getCatList } = useCategory();
    const { getList: getTagList } = useTag();
    const [catRes, tagRes] = await Promise.all([getCatList(), getTagList()]);
    categories.value = catRes ?? [];
    tags.value = tagRes ?? [];
    if (isAdmin.value) {
      const { getUserList } = useAuth();
      try { const userRes = await getUserList(1, 999); users.value = (userRes.content ?? []).filter(u => u.role !== "GUEST"); }
      catch { /* ignore */ }
    }
  } catch { /* ignore */ }
}

async function loadData(append = false) {
  if (append) { loadingMore.value = true; }
  else { loading.value = true; currentPage.value = 1; allLoaded.value = false; }
  try {
    let res;
    if (isAdmin.value) {
      res = await getAdminList(currentPage.value, pageSize.value, statusFilter.value, searchKeyword.value || undefined, filterCategoryId.value, filterTagId.value, filterAuthorId.value);
    } else {
      res = await getMyArticles(currentPage.value, pageSize.value, statusFilter.value, searchKeyword.value || undefined, filterCategoryId.value, filterTagId.value);
    }
    const items = res.content ?? [];
    if (append) {
      articles.value = articles.value.concat(items);
    } else {
      articles.value = items;
    }
    total.value = res.totalElements ?? 0;
    if (items.length === 0 || items.length < pageSize.value) {
      allLoaded.value = true;
    }
    // GUEST 使用 findPublicArticles 查询，totalElements 可能因 DISTINCT+LEFT JOIN 偏高，用实际累计数判断
    if (articles.value.length >= (res.totalElements ?? 0)) {
      allLoaded.value = true;
    }
  } catch { if (!append) { articles.value = []; total.value = 0; } }
  finally { loading.value = false; loadingMore.value = false; nextTick(() => { loadLocked.value = false; }); }
}

function onStatusChange(val) { statusFilter.value = val; loadData(); }

async function handleDelete(id) {
  try {
    await ElMessageBox.confirm("确定删除此文章？此操作不可恢复", "确认删除", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" });
    if (isAdmin.value) await remove(id);
    else await removeMyArticle(id);
    ElMessage.success("删除成功"); await loadData();
  } catch { /* cancelled */ }
}

async function handleVisibilityChange(row) {
  try {
    const targetVis = row.visibility;
    if (isAdmin.value) await update(row.id, { visibility: targetVis });
    else await updateMyArticle(row.id, { visibility: targetVis });
    // 更新本地数据，让开关状态正确切换
    const item = articles.value.find(a => a.id === row.id);
    if (item) item.visibility = targetVis;
    ElMessage.success(targetVis === "PRIVATE" ? "已设为私密" : "已设为公开");
  } catch { /* 拦截器已处理消息提示 */ }
}

function goCreate() { navigateTo("/articles/create"); }

function handleDialogEdit() { dialogVisible.value = false; goEdit(dialogArticle.value.id); }
function goEdit(id) { navigateTo("/articles/edit/" + id); }

onMounted(async () => { await loadFilters(); await loadData(); });
</script>

<template>
  <!-- 根容器：flex 填充 content-inner 剩余空间 -->
  <div style="flex:1; min-height:0; display:flex; flex-direction:column">
    <div class="page-header">
      <h2>文章管理</h2>
      <el-button v-if="!isGuest" type="primary" :icon="Plus" @click="goCreate()">写文章</el-button>
    </div>

    <!-- page-card 作为表格外容器，填充剩余空间，底边距窗口 25px -->
    <div ref="wrapperRef" class="page-card" style="flex:1; min-height:0">
      <div class="filter-bar" style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap">
        <div style="display: flex; align-items: center">
          <el-input v-model="keyword" placeholder="搜索文章标题..." style="width: 240px" clearable @keyup.enter="onSearch">
            <template #prefix><el-icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"/></svg></el-icon></template>
          </el-input>
          <el-button type="primary" @click="onSearch" style="margin-left: 8px">搜索</el-button>
        </div>

        <div style="display: flex; align-items: center; gap: 12px; margin-left: auto">
          <el-select v-model="filterCategoryId" placeholder="分类筛选" clearable style="width: 140px" @change="loadData()">
            <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>

          <el-select v-model="filterTagId" placeholder="标签筛选" clearable style="width: 140px" @change="loadData()">
            <el-option v-for="t in tags" :key="t.id" :label="t.name" :value="t.id" />
          </el-select>

          <el-select v-model="statusFilter" placeholder="发布状态" clearable style="width: 120px" @change="onStatusChange">
            <el-option label="已发布" value="PUBLISHED" />
            <el-option label="草稿" value="DRAFT" />
          </el-select>

          <el-select v-if="isAdmin" v-model="filterAuthorId" placeholder="作者筛选" clearable style="width: 140px" @change="loadData()">
            <el-option v-for="u in users" :key="u.id" :label="u.username" :value="u.id" />
          </el-select>
        </div>
      </div>

      <!-- 懒加载表格：max-height 由 useTableHeight 动态计算 -->
      <el-table ref="tableRef" :data="displayArticles" v-loading="loading" :span-method="tableSpanMethod" style="width: 100%" :max-height="tableHeight" @scroll="handleTableScroll" stripe>
          <el-table-column label="序号" width="55">
            <template #default="{ row, $index }">
              <div v-if="row._isEndMarker" style="text-align:center;color:#999;font-size:13px;padding:2px 0;line-height:1.2;width:100%">已加载全部</div>
              <span v-else>{{ $index + 1 }}</span>
            </template>
          </el-table-column>

          <el-table-column label="标题" min-width="300">
            <template #default="{ row }">
              <div v-if="!row._isEndMarker" style="display:flex;align-items:center;gap:6px;cursor:pointer" @click="viewArticle(row)" :type="isGuest ? 'default' : 'primary'" :underline="!isGuest">
                <span style="color:#409eff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ row.title }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="分类" width="80">
            <template #default="{ row }">{{ row.category?.name || "-" }}</template>
          </el-table-column>

          <el-table-column label="标签" width="150">
            <template #default="{ row }">
              <div v-if="!row._isEndMarker" style="display:flex;gap:4px;flex-wrap:wrap">
                <el-tag v-for="t in (row.tags || [])" :key="t.id" size="small" type="info">{{ t.name }}</el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="90">
            <template #default="{ row }">
              <el-tag v-if="!row._isEndMarker" :type="statusType[row.status] || 'info'" size="small">{{ statusLabel[row.status] || row.status }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column v-if="isAdmin" prop="author.username" label="作者" width="100" />

          <el-table-column v-if="!isGuest" label="可见性" width="80" align="center">
            <template #default="{ row }">
              <el-switch v-if="!row._isEndMarker" :disabled="!canEdit(row)" :model-value="row.visibility === 'PUBLIC'" active-text="公" inactive-text="私" inline-prompt size="small" @change="handleVisibilityChange({ ...row, visibility: row.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC' })" />
            </template>
          </el-table-column>

          <el-table-column prop="viewCount" label="阅读" width="70" />
          <el-table-column label="创建时间" width="160" align="center">
            <template #default="{ row }">{{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}</template>
          </el-table-column>

          <el-table-column v-if="!isGuest" label="操作" width="130" fixed="right">
            <template #default="{ row }">
              <div v-if="!row._isEndMarker" style="display:flex;gap:4px">
                <el-button :disabled="!canEdit(row)" link type="primary" size="small" @click="goEdit(row.id)">编辑</el-button>
                <el-button :disabled="!canEdit(row)" link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
              </div>
            </template>
          </el-table-column>
                  <template #empty><div style="padding:40px 0;color:#909399">暂无数据</div></template>
        </el-table>
    </div>

    <!-- 文章预览对话框 -->
    <el-dialog v-model="dialogVisible" title="文章预览" width="800" destroy-on-close top="5vh">
      <template v-if="dialogArticle">
        <div style="margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #ebeef5">
          <h3 style="margin:0 0 8px 0;font-size:20px">{{ dialogArticle.title }}</h3>
          <div style="display:flex;gap:16px;color:#909399;font-size:13px">
            <span>作者: {{ dialogArticle.author?.username }}</span>
            <span>分类: {{ dialogArticle.category?.name || "-" }}</span>
            <span>{{ (dialogArticle.createdAt || "").replace("T", " ").slice(0, 16) }}</span>
            <span>阅读: {{ dialogArticle.viewCount || 0 }}</span>
          </div>
        </div>
        <div class="article-preview-content" v-html="sanitizeHtml(dialogArticle.content || '')" style="max-height:60vh;overflow:auto;line-height:1.8"></div>
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button v-if="canEditPreviewDialog" type="primary" @click="handleDialogEdit">编辑</el-button>
      </template>
    </el-dialog>
  </div>
</template>


<style scoped>
/* 文章预览 markdown 内容样式 */
.article-preview-content {
  font-size: 15px;
  line-height: 1.9;
  color: #2c3e50;
}
.article-preview-content :deep(h1) { font-size: 26px; font-weight: 700; margin: 24px 0 14px; color: #1a1a1a; }
.article-preview-content :deep(h2) { font-size: 22px; font-weight: 700; margin: 22px 0 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; }
.article-preview-content :deep(h3) { font-size: 18px; font-weight: 600; margin: 18px 0 10px; color: #1a1a1a; }
.article-preview-content :deep(h4) { font-size: 16px; font-weight: 600; margin: 14px 0 8px; color: #333; }
.article-preview-content :deep(h5) { font-size: 15px; font-weight: 600; margin: 12px 0 6px; color: #444; }
.article-preview-content :deep(p) { margin: 0 0 12px; }
.article-preview-content :deep(ul), .article-preview-content :deep(ol) { padding-left: 24px; margin: 8px 0 12px; }
.article-preview-content :deep(li) { margin: 4px 0; }
.article-preview-content :deep(code) { background: #f0f2f5; padding: 2px 8px; border-radius: 4px; font-size: 13px; color: #e74c3c; font-family: Menlo, Consolas, monospace; }
.article-preview-content :deep(pre) { background: #1e1e2e; color: #cdd6f4; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 12px 0 18px; font-size: 13px; line-height: 1.6; }
.article-preview-content :deep(pre code) { background: none; padding: 0; color: inherit; font-size: inherit; }
.article-preview-content :deep(blockquote) { border-left: 4px solid #667eea; margin: 12px 0 18px; padding: 10px 16px; background: #f8f9ff; border-radius: 0 8px 8px 0; color: #555; }
.article-preview-content :deep(blockquote p) { margin: 0; }
.article-preview-content :deep(img) { max-width: 100%; border-radius: 8px; margin: 10px 0; }
.article-preview-content :deep(strong) { font-weight: 700; color: #1a1a1a; }
.article-preview-content :deep(a) { color: #667eea; text-decoration: underline; }
.article-preview-content :deep(table) { border-collapse: collapse; width: 100%; margin: 12px 0; }
.article-preview-content :deep(th), .article-preview-content :deep(td) { border: 1px solid #e4e7ed; padding: 8px 12px; text-align: left; }
.article-preview-content :deep(th) { background: #f5f7fa; font-weight: 600; }
.article-preview-content :deep(hr) { border: none; border-top: 1px solid #e4e7ed; margin: 18px 0; }
</style>
