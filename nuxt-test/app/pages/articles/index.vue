<script lang="ts" setup>
/**
 * articles - 文章管理列表页
 * 分页展示所有文章（含草稿），支持按状态筛选。需 auth 中间件保护。
 * - ADMIN/SUPERADMIN 角色：查看所有文章
 * - USER/GUEST 角色：仅查看自己为作者的文章
 */
definePageMeta({ middleware: 'auth' })
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const { getAdminList, getMyArticles, remove, removeMyArticle } = useArticle()
const { role } = useAuth()

const isAdmin = computed(() => role.value === 'ADMIN' || role.value === 'SUPERADMIN')

const articles = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const statusFilter = ref(undefined)

const statusLabel = { PUBLISHED: '已发布', DRAFT: '草稿' }
const statusType = { PUBLISHED: 'success', DRAFT: 'warning' }

async function loadData() {
  loading.value = true
  try {
    let res
    if (isAdmin.value) {
      res = await getAdminList(currentPage.value, pageSize.value, statusFilter.value)
    } else {
      res = await getMyArticles(currentPage.value, pageSize.value, statusFilter.value)
    }
    articles.value = res.content ?? []
    total.value = res.totalElements ?? 0
  } catch { articles.value = []; total.value = 0 }
  finally { loading.value = false }
}

function onStatusChange(val) {
  statusFilter.value = val === '__all__' ? undefined : val
  currentPage.value = 1
  loadData()
}

async function handleDelete(id) {
  try {
    await ElMessageBox.confirm('确定删除此文章？此操作不可恢复', '确认删除')
    if (isAdmin.value) {
      await remove(id)
    } else {
      await removeMyArticle(id)
    }
    ElMessage.success('删除成功')
    await loadData()
  } catch { /* cancelled */ }
}

function goCreate() { navigateTo('/articles/create') }
function goEdit(id) { navigateTo('/articles/edit/' + id) }

onMounted(loadData)
</script>

<template>
  <div>
    <div class="page-header">
      <h2>文章管理</h2>
      <el-button type="primary" :icon="Plus" @click="goCreate()">写文章</el-button>
    </div>

    <div class="page-card">
      <div class="filter-bar">
        <el-radio-group :model-value="statusFilter" @change="onStatusChange">
          <el-radio-button value="__all__">全部</el-radio-button>
          <el-radio-button value="PUBLISHED">已发布</el-radio-button>
          <el-radio-button value="DRAFT">草稿</el-radio-button>
        </el-radio-group>
      </div>

      <el-table :data="articles" v-loading="loading" stripe>
        <el-table-column type="index" label="#" width="50" :index="(i) => (currentPage-1)*pageSize + i + 1" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="category?.name" label="分类" width="100" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="statusType[row.status] || 'info'" size="small" effect="dark">{{ statusLabel[row.status] || row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="isAdmin" prop="author.username" label="作者" width="100" />
        <el-table-column prop="viewCount" label="阅读" width="70" />
        <el-table-column prop="createdAt" label="创建时间" width="170">
          <template #default="{ row }">{{ row.createdAt?.slice(0, 16) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="goEdit(row.id)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="total > pageSize" class="pagination-wrapper">
        <el-pagination v-model:current-page="currentPage" :page-size="pageSize"
          :total="total" layout="prev, pager, next, total" background
          @current-change="loadData" />
      </div>
    </div>
  </div>
</template>
