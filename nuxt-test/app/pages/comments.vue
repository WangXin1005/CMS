<script lang="ts" setup>
/**
 * comments — 评论管理页面
 * 分页展示评论，支持按状态筛选，操作：审核通过/驳回/删除。需 auth 中间件保护。
 */
definePageMeta({ middleware: 'auth' })
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const { getAdminList, approve, reject, remove, getStats } = useComment()
const comments = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const statusFilter = ref<string | undefined>(undefined)
const stats = ref({ pending: 0, approved: 0 })
const statusLabel: Record<string, string> = { PENDING: '待审核', APPROVED: '已通过', REJECTED: '已驳回' }
const statusType: Record<string, string> = { PENDING: 'warning', APPROVED: 'success', REJECTED: 'danger' }

async function loadData() {
  loading.value = true
  try {
    const res = await getAdminList(currentPage.value, pageSize.value, statusFilter.value)
    comments.value = res.content ?? []; total.value = res.totalElements ?? 0
  } catch { comments.value = []; total.value = 0 } finally { loading.value = false }
}
async function loadStats() { try { const res = await getStats(); stats.value = res } catch { /* ignore */ } }
async function handleApprove(id: number) { try { await approve(id); ElMessage.success('已通过'); await loadData(); await loadStats() } catch { ElMessage.error('操作失败') } }
async function handleReject(id: number) { try { await reject(id); ElMessage.success('已驳回'); await loadData(); await loadStats() } catch { ElMessage.error('操作失败') } }
async function handleDelete(id: number) { try { await ElMessageBox.confirm('确定删除此评论？', '确认', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }); await remove(id); ElMessage.success('删除成功'); await loadData(); await loadStats() } catch { /* cancelled */ } }
function onStatusChange(val: string | undefined) { statusFilter.value = val === '__all__' ? undefined : val; currentPage.value = 1; loadData() }

onMounted(() => { loadData(); loadStats() })
</script>

<template>
  <div>
    <div class="page-header">
      <h2>评论管理</h2>
      <div style="display:flex;gap:8px">
        <el-tag type="warning">待审核: {{ stats.pending ?? 0 }}</el-tag>
        <el-tag type="success">已通过: {{ stats.approved ?? 0 }}</el-tag>
      </div>
    </div>
    <div class="page-card">
      <div class="filter-bar">
        <el-radio-group :model-value="statusFilter" @change="onStatusChange">
          <el-radio-button value="__all__">全部</el-radio-button>
          <el-radio-button value="PENDING">待审核</el-radio-button>
          <el-radio-button value="APPROVED">已通过</el-radio-button>
          <el-radio-button value="REJECTED">已驳回</el-radio-button>
        </el-radio-group>
      </div>
      <el-table :data="comments" v-loading="loading" stripe>
        <el-table-column type="index" label="#" width="50" :index="(i:any) => (currentPage-1)*pageSize + i + 1" />
        <el-table-column prop="content" label="评论内容" min-width="250" show-overflow-tooltip />
        <el-table-column prop="author.username" label="用户" width="120" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }"><el-tag :type="statusType[row.status] || 'info'" size="small" effect="dark">{{ statusLabel[row.status] || row.status }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="createdAt" label="时间" width="170"><template #default="{ row }">{{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}</template></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button v-if="row.status === 'PENDING'" link type="success" size="small" @click="handleApprove(row.id)">通过</el-button>
            <el-button v-if="row.status === 'PENDING'" link type="warning" size="small" @click="handleReject(row.id)">驳回</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="total > pageSize" class="pagination-wrapper">
        <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="total" layout="prev, pager, next, total" background @current-change="loadData" />
      </div>
    </div>
  </div>
</template>
