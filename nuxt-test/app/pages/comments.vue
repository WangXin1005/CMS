<!-- comments - 评论管理页（分页 pageSize=10） -->
<script lang="ts" setup>
import { ref, onMounted, onActivated } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
definePageMeta({ middleware: "auth" });

const { getAdminList, approve, reject, remove, getStats } = useComment();
const comments = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const statusFilter = ref(undefined);
const stats = ref({ pending: 0, approved: 0 });

// 使用 useTableHeight 测量 table-with-pagination 高度，预留 44px 给分页器
const { wrapperRef, tableHeight } = useTableHeight(0);

const statusLabel = { PENDING: "待审核", APPROVED: "已通过", REJECTED: "已驳回" };
const statusType = { PENDING: "warning", APPROVED: "success", REJECTED: "danger" };

async function loadData() {
  loading.value = true;
  try { const res = await getAdminList(currentPage.value, pageSize.value, statusFilter.value); comments.value = res.content ?? []; total.value = res.totalElements ?? 0; }
  catch { comments.value = []; total.value = 0; }
  finally { loading.value = false; }
}
async function loadStats() { try { const res = await getStats(); stats.value = res; } catch { /* ignore */ } }
async function handleApprove(id) { try { await approve(id); ElMessage.success("已通过"); await loadData(); await loadStats(); } catch { /* 拦截器已处理 */ } }
async function handleReject(id) { try { await reject(id); ElMessage.success("已驳回"); await loadData(); await loadStats(); } catch { /* 拦截器已处理 */ } }
async function handleDelete(id) {
  try {
    await ElMessageBox.confirm("确定删除此评论？", "确认", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" });
    await remove(id); ElMessage.success("删除成功"); await loadData(); await loadStats();
  } catch { /* cancelled */ }
}
const previewVisible = ref(false);
const previewContent = ref("");
const previewArticle = ref(null);
function previewComment(row) { previewContent.value = row.content || ""; previewArticle.value = row.article || null; previewVisible.value = true; }
function goArticle(slug) { navigateTo("/article/" + slug); }

function onStatusChange(val) { statusFilter.value = val === "__all__" ? undefined : val; currentPage.value = 1; loadData(); }
onMounted(() => { loadData(); loadStats(); })
onActivated(() => { loadData(); loadStats(); });;
</script>

<template>
  <!-- 根容器：flex 填充 content-inner 剩余空间 -->
  <div style="flex:1; min-height:0; display:flex; flex-direction:column">
    <div class="page-header">
      <h2>评论管理</h2>
      <div style="display: flex; gap: 8px">
        <el-tag type="warning">待审核: {{ stats.pending ?? 0 }}</el-tag>
        <el-tag type="success">已通过: {{ stats.approved ?? 0 }}</el-tag>
      </div>
    </div>
    <!-- page-card 填充剩余空间，底边距窗口 25px -->
    <div class="page-card" style="flex:1; min-height:0">
      <div class="filter-bar">
        <el-radio-group :model-value="statusFilter" @change="onStatusChange">
          <el-radio-button value="__all__">全部</el-radio-button>
          <el-radio-button value="PENDING">待审核</el-radio-button>
          <el-radio-button value="APPROVED">已通过</el-radio-button>
          <el-radio-button value="REJECTED">已驳回</el-radio-button>
        </el-radio-group>
      </div>
      <!-- table-with-pagination：表格+分页器外层容器 -->
      <div ref="wrapperRef" class="table-with-pagination">
        <el-table :data="comments" v-loading="loading" style="width: 100%" :max-height="tableHeight" stripe>
          <el-table-column type="index" label="序号" width="55" align="center"
            :index="(i) => (currentPage - 1) * pageSize + i + 1" />
          <el-table-column label="评论内容" min-width="250" show-overflow-tooltip>
            <template #default="{ row }">
              <span style="cursor:pointer;color:#409eff" @click="previewComment(row)">{{ (row.content || "").slice(0,
                60) }}{{ (row.content || "").length > 60 ? "..." : "" }}</span>
            </template>

          </el-table-column>
          <el-table-column label="关联文章" width="200" show-overflow-tooltip>
            <template #default="{ row }">
              <el-link v-if="row.article?.title" type="primary" :underline="false"
                @click="goArticle(row.article.slug)">{{ row.article.title }}</el-link>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="author.username" label="用户" width="120" />
          <el-table-column label="状态" width="100"><template #default="{ row }"><el-tag
                :type="statusType[row.status] || 'info'" size="small">{{ statusLabel[row.status] || row.status
                }}</el-tag></template></el-table-column>
          <el-table-column prop="createdAt" label="时间" width="170"><template #default="{ row }">{{ (row.createdAt ||
            "").replace("T", " ").slice(0, 16) }}</template></el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button v-if="row.status === 'PENDING'" link type="success" size="small"
                @click="handleApprove(row.id)">通过</el-button>
              <el-button v-if="row.status === 'PENDING'" link type="warning" size="small"
                @click="handleReject(row.id)">驳回</el-button>
              <el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
            </template>
          </el-table-column>
          <template #empty>
            <div style="padding:40px 0;color:#909399">暂无数据</div>
          </template>
        </el-table>
        <!-- 分页器：绝对定位固定在右下角 -->
        <div class="pagination-wrapper">
          <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="total"
            layout="prev, pager, next, jumper, total" :hide-on-single-page="false" background
            @current-change="loadData" />
        </div>
      </div>
    </div>
    <el-dialog v-model="previewVisible" title="评论详情" width="600" destroy-on-close>
      <div style="max-height:400px;overflow:auto;line-height:1.8;white-space:pre-wrap">{{ previewContent }}</div>
      <div v-if="previewArticle"
        style="margin-top:12px;padding-top:12px;border-top:1px solid #eee;color:#999;font-size:13px">关联文章：<el-link
          type="primary" @click="goArticle(previewArticle.slug)">{{ previewArticle.title }}</el-link></div>
    </el-dialog>
  </div>

</template>

<style scoped>
.page-card :deep(.el-table__body-wrapper .el-table__row) {
  height: 41px;
}

.page-card :deep(.el-table__body-wrapper .el-table__cell) {
  padding: 6px 0;
}
</style>
