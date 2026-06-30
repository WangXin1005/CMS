<!-- articles/index — 文章管理页（ADMIN/SUPERADMIN）：分页列表、筛选、预览、编辑、删除 -->

<script lang="ts" setup>
/**
 * articles - 文章管理列表页
 * 分页展示所有文章（含草稿），支持按状态筛选。需 auth 中间件保护。
 * - ADMIN/SUPERADMIN 角色：查看所有文章
 * - USER/GUEST 角色：仅查看自己为作者的文章
 */
import { ref, onMounted, computed, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { sanitizeHtml } from '~/utils/sanitize'
import { Plus } from '@element-plus/icons-vue'
definePageMeta({ middleware: 'auth' })

const { getAdminList, getMyArticles, update, updateMyArticle, remove, removeMyArticle } =
  useArticle()
const { role } = useAuth()

const isAdmin = computed(() => role.value === 'ADMIN' || role.value === 'SUPERADMIN')
const isGuest = computed(() => role.value === 'GUEST')

const articles = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const statusFilter = ref(undefined)

const keyword = ref('')
const searchKeyword = ref('')

const filterCategoryId = ref<number | undefined>()
const filterTagId = ref<number | undefined>()
const filterAuthorId = ref<number | undefined>()

const categories = ref<Record<string, unknown>[]>([])
const tags = ref<Record<string, unknown>[]>([])
const users = ref<Record<string, unknown>[]>([])

const dialogVisible = ref(false)
const dialogArticle = ref(null)
const allLoaded = ref(false)
const loadingMore = ref(false)
const loadLocked = ref(false)
const tableRef = ref<{ doLayout: () => void }>()
const tableHeight = ref<number | undefined>(undefined)

// 哨兵行：全部加载后在表格末尾显示
const displayArticles = computed(() => {
  if (allLoaded.value && articles.value.length > 0) {
    return [...articles.value, { _isEndMarker: true }]
  }
  return articles.value
})

const columnCount = computed(() => (isAdmin.value ? 10 : 9))

function tableSpanMethod({
  row,
  columnIndex,
}: {
  row: Record<string, unknown>
  columnIndex: number
}) {
  if (row._isEndMarker) {
    if (columnIndex === 0) {
      return [1, columnCount.value]
    }
    return [0, 0]
  }
}

function viewArticle(row) {
  dialogArticle.value = row
  dialogVisible.value = true
}

function onSearch() {
  searchKeyword.value = keyword.value.trim()
  loadData()
}

function handleTableScroll(_scroll: unknown) {
  if (allLoaded.value || loadingMore.value || loadLocked.value) return
  // el-table @scroll emits {scrollLeft, scrollTop}, not DOM Event
  // Access the body wrapper directly from table ref
  const el = tableRef.value?.$el?.querySelector('.el-table__body-wrapper')
  if (!el) return
  const dist = el.scrollHeight - el.scrollTop - el.clientHeight
  if (dist <= 50) {
    loadingMore.value = true
    loadLocked.value = true
    currentPage.value++
    loadData(true)
  }
}

const statusLabel = { PUBLISHED: '已发布', DRAFT: '草稿' }
const statusType = { PUBLISHED: 'success', DRAFT: 'warning' }

async function loadFilters() {
  try {
    const { getList: getCatList } = useCategory()
    const { getList: getTagList } = useTag()
    const [catRes, tagRes] = await Promise.all([getCatList(), getTagList()])
    categories.value = catRes ?? []
    tags.value = tagRes ?? []
    if (isAdmin.value) {
      const { getUserList } = useAuth()
      try {
        const userRes = await getUserList(1, 999)
        users.value = (userRes.content ?? []).filter(function (u) {
          return u.role !== 'GUEST'
        })
      } catch {
        /* 忽略错误 */
      }
    }
  } catch {
    /* 忽略错误 */
  }
}

async function loadData(append = false) {
  if (append) {
    loadingMore.value = true
  } else {
    loading.value = true
    currentPage.value = 1
    allLoaded.value = false
  }
  try {
    let res
    if (isAdmin.value) {
      res = await getAdminList(
        currentPage.value,
        pageSize.value,
        statusFilter.value,
        searchKeyword.value || undefined,
        filterCategoryId.value,
        filterTagId.value,
        filterAuthorId.value,
      )
    } else {
      res = await getMyArticles(
        currentPage.value,
        pageSize.value,
        statusFilter.value,
        searchKeyword.value || undefined,
        filterCategoryId.value,
        filterTagId.value,
      )
    }
    const items = res.content ?? []
    if (append) {
      articles.value = articles.value.concat(items)
    } else {
      articles.value = items
    }
    total.value = res.totalElements ?? 0
    if (items.length === 0 || items.length < pageSize.value) {
      allLoaded.value = true
    }
  } catch {
    if (!append) {
      articles.value = []
      total.value = 0
    }
  } finally {
    loading.value = false
    loadingMore.value = false
    nextTick(() => {
      loadLocked.value = false
    })
  }
}

function onStatusChange(val) {
  statusFilter.value = val
  loadData()
}

async function handleDelete(id) {
  try {
    await ElMessageBox.confirm('确定删除此文章？此操作不可恢复', '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    if (isAdmin.value) {
      await remove(id)
    } else {
      await removeMyArticle(id)
    }
    ElMessage.success('删除成功')
    await loadData()
  } catch {
    /* cancelled */
  }
}

async function handleVisibilityChange(row) {
  try {
    const targetVis = row.visibility
    if (isAdmin.value) {
      await update(row.id, { visibility: targetVis })
    } else {
      await updateMyArticle(row.id, { visibility: targetVis })
    }
    ElMessage.success(targetVis === 'PRIVATE' ? '已设为私密' : '已设为公开')
  } catch (e) {
    ElMessage.error(e.response?.data?.message || '操作失败')
  }
}

function goCreate() {
  navigateTo('/articles/create')
}
// 对话框内点击编辑：关闭弹窗后跳转
function handleDialogEdit() {
  dialogVisible.value = false
  goEdit(dialogArticle.value.id)
}
function goEdit(id) {
  navigateTo('/articles/edit/' + id)
}

onMounted(async () => {
  await loadFilters()
  await loadData()
  tableHeight.value = window.innerHeight - 260
  window.addEventListener('resize', () => {
    tableHeight.value = window.innerHeight - 260
  })
})
</script>

<template>
  <div>
    <div class="page-header">
      <h2>文章管理</h2>
      <el-button type="primary" :icon="Plus" @click="goCreate()">写文章</el-button>
    </div>

    <div class="page-card">
      <div
        class="filter-bar"
        style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap"
      >
        <div style="display: flex; align-items: center">
          <el-input
            v-model="keyword"
            placeholder="搜索标题..."
            clearable
            style="width: 220px"
            @keyup.enter="onSearch"
            @clear="onSearch"
          >
            <template #prefix>
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="#999"
                  d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                />
              </svg>
            </template>
          </el-input>
          <el-button type="primary" style="margin-left: 8px" @click="onSearch">搜索</el-button>
        </div>
        <div style="display: flex; align-items: center; margin-left: auto; gap: 12px">
          <el-select
            v-model="statusFilter"
            placeholder="全部"
            clearable
            style="width: 100px"
            @change="onStatusChange"
          >
            <el-option label="已发布" value="PUBLISHED" />
            <el-option label="草稿" value="DRAFT" />
          </el-select>
          <el-select
            v-model="filterCategoryId"
            placeholder="分类"
            clearable
            style="width: 120px"
            @change="loadData()"
          >
            <el-option v-for="cat in categories" :key="cat.id" :label="cat.name" :value="cat.id" />
          </el-select>
          <el-select
            v-model="filterTagId"
            placeholder="标签"
            clearable
            style="width: 120px"
            @change="loadData()"
          >
            <el-option v-for="tag in tags" :key="tag.id" :label="tag.name" :value="tag.id" />
          </el-select>
          <el-select
            v-if="isAdmin"
            v-model="filterAuthorId"
            placeholder="作者"
            clearable
            style="width: 120px"
            @change="loadData()"
          >
            <el-option v-for="u in users" :key="u.id" :label="u.username" :value="u.id" />
          </el-select>
        </div>
      </div>

      <el-table
        ref="tableRef"
        v-loading="loading"
        :data="displayArticles"
        stripe
        :max-height="tableHeight"
        :span-method="tableSpanMethod"
        @scroll="handleTableScroll"
      >
        <el-table-column label="序号" width="55">
          <template #default="{ row, $index }">
            <div
              v-if="row._isEndMarker"
              style="
                text-align: center;
                color: #999;
                font-size: 13px;
                padding: 2px 0;
                line-height: 1.2;
              "
            >
              已加载全部
            </div>
            <span v-else>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="200">
          <template #default="{ row }">
            <el-button
              link
              type="primary"
              style="
                text-align: left;
                word-break: break-word;
                white-space: normal;
                height: auto;
                line-height: 1.4;
                padding: 0;
              "
              @click="viewArticle(row)"
              >{{ row.title }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="分类" width="80">
          <template #default="{ row }">
            {{ row.category?.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="标签" width="150">
          <template #default="{ row }">
            <el-tag
              v-for="tag in row.tags || []"
              :key="tag.id"
              size="small"
              style="margin-right: 4px; margin-bottom: 2px"
              >{{ tag.name }}</el-tag
            >
            <span v-if="!row.tags?.length" style="color: #999">-</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="statusType[row.status] || 'info'" size="small" effect="dark">{{
              statusLabel[row.status] || row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="isAdmin" prop="author.username" label="作者" width="100" />
        <el-table-column label="可见性" width="80" align="center">
          <template #default="{ row }">
            <el-switch
              v-model="row.visibility"
              active-value="PRIVATE"
              inactive-value="PUBLIC"
              active-text="私"
              inactive-text="公"
              size="small"
              inline-prompt
              @change="handleVisibilityChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="viewCount" label="阅读" width="70" />
        <el-table-column label="创建时间" width="160" align="center">
          <template #default="{ row }">
            <span style="white-space: normal; word-break: break-word; line-height: 1.4"
              >{{ (row.createdAt || '').replace('T', ' ').slice(0, 10) }}<br />{{
                (row.createdAt || '').replace('T', ' ').slice(11, 16)
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130" fixed="right">
          <template #default="{ row }">
            <el-button v-if="!isGuest" link type="primary" size="small" @click="goEdit(row.id)"
              >编辑</el-button
            >
            <el-button v-if="!isGuest" link type="danger" size="small" @click="handleDelete(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 文章预览对话框 -->
    <el-dialog v-model="dialogVisible" title="文章预览" width="700px" :close-on-click-modal="false">
      <template v-if="dialogArticle">
        <h2 style="font-size: 20px; margin: 0 0 12px; color: #1a1a1a">{{ dialogArticle.title }}</h2>
        <div style="font-size: 13px; color: #999; margin-bottom: 16px">
          <span>✔ {{ dialogArticle.author?.username }}</span>
          <span style="margin-left: 16px">{{
            (dialogArticle.createdAt || '').replace('T', ' ').slice(0, 16)
          }}</span>
          <el-tag v-if="dialogArticle.category" size="small" style="margin-left: 12px">{{
            dialogArticle.category.name
          }}</el-tag>
        </div>
        <div v-if="dialogArticle.tags?.length" style="margin-bottom: 12px">
          <el-tag
            v-for="tag in dialogArticle.tags"
            :key="tag.id"
            size="small"
            style="margin-right: 6px"
            >{{ tag.name }}</el-tag
          >
        </div>
        <el-divider style="margin: 12px 0" />
        <div
          style="
            max-height: 400px;
            overflow-y: auto;
            font-size: 15px;
            line-height: 1.8;
            color: #333;
          "
          class="article-content-render"
          v-html="sanitizeHtml(dialogArticle.content)"
        ></div>
      </template>
      <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="handleDialogEdit">编辑</el-button>
      </template>
    </el-dialog>
  </div>
</template>
