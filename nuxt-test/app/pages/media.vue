<script lang="ts" setup>
/**
 * media — 媒体管理页面
 * 文件上传（jpg/png/gif/webp/svg，最大10MB）+ 列表展示 + 删除。需 auth 中间件保护。
 */
definePageMeta({ middleware: 'auth' })
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const { upload, getList, remove } = useMedia()
const mediaList = ref<any[]>([])
const loading = ref(false)
const uploadLoading = ref(false)

function formatSize(bytes: number) {
  if (!bytes) return '0 B'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1048576).toFixed(1) + ' MB'
}

async function loadData() {
  loading.value = true
  try { const res = await getList(); mediaList.value = res ?? [] }
  catch { mediaList.value = [] } finally { loading.value = false }
}

async function handleUpload(file: File) {
  uploadLoading.value = true
  try { await upload(file); ElMessage.success('上传成功'); await loadData() }
  catch { ElMessage.error('上传失败') } finally { uploadLoading.value = false }
}

function beforeUpload(file: File) {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
  if (!allowed.includes(file.type)) { ElMessage.error('只支持 jpg/png/gif/webp/svg 格式'); return false }
  if (file.size > 10 * 1024 * 1024) { ElMessage.error('文件大小不能超过 10MB'); return false }
  handleUpload(file); return false
}

async function handleDelete(id: number) {
  try { await ElMessageBox.confirm('确定删除此文件？', '确认', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }); await remove(id); ElMessage.success('删除成功'); await loadData() }
  catch { /* cancelled */ }
}

onMounted(loadData)
</script>

<template>
  <div>
    <div class="page-header">
      <h2>媒体管理</h2>
      <el-upload :show-file-list="false" :before-upload="beforeUpload" accept="image/*">
        <el-button type="primary" :icon="Plus" :loading="uploadLoading">上传文件</el-button>
      </el-upload>
    </div>
    <div class="page-card">
      <el-table :data="mediaList" v-loading="loading" stripe>
        <el-table-column label="预览" width="70">
          <template #default="{ row }">
            <el-image :src="row.url" style="width:42px;height:42px;border-radius:6px" fit="cover" :preview-src-list="[row.url]" preview-teleported />
          </template>
        </el-table-column>
        <el-table-column prop="originalName" label="文件名" min-width="200" show-overflow-tooltip />
        <el-table-column prop="mimeType" label="类型" width="100" />
        <el-table-column label="大小" width="90"><template #default="{ row }">{{ formatSize(row.size) }}</template></el-table-column>
        <el-table-column prop="uploadedBy.username" label="上传者" width="100" />
        <el-table-column prop="createdAt" label="时间" width="170"><template #default="{ row }">{{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}</template></el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }"><el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button></template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
