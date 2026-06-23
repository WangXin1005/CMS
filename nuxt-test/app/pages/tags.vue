<script lang="ts" setup>
/**
 * tags — 标签管理页面
 * 标签列表 + 对话框增/删/改。需 auth 中间件保护。
 */
definePageMeta({ middleware: 'auth' })
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const { getList, create, update, remove } = useTag()
const tags = ref<any[]>([])
const loading = ref(false)
const dialogVisible = ref(false)
const editingId = ref<number | null>(null)
const form = ref({ name: '', slug: '' })

async function loadData() {
  loading.value = true
  try { const res = await getList(); tags.value = res ?? [] }
  catch { tags.value = [] }
  finally { loading.value = false }
}

function openCreate() { editingId.value = null; form.value = { name: '', slug: '' }; dialogVisible.value = true }
function openEdit(tag: any) { editingId.value = tag.id; form.value = { name: tag.name, slug: tag.slug }; dialogVisible.value = true }

async function handleSave() {
  if (!form.value.name || !form.value.slug) { ElMessage.warning('名称和 Slug 不能为空'); return }
  try {
    if (editingId.value) { await update(editingId.value, form.value); ElMessage.success('更新成功') }
    else { await create(form.value); ElMessage.success('创建成功') }
    dialogVisible.value = false; await loadData()
  } catch (e: any) { ElMessage.error(e.response?.data?.message || '操作失败') }
}

async function handleDelete(id: number) {
  try { await ElMessageBox.confirm('确定删除此标签？', '确认'); await remove(id); ElMessage.success('删除成功'); await loadData() }
  catch { /* cancelled */ }
}

onMounted(loadData)
</script>

<template>
  <div>
    <div class="page-header">
      <h2>标签管理</h2>
      <el-button type="primary" :icon="Plus" @click="openCreate">新增标签</el-button>
    </div>
    <div class="page-card">
      <el-table :data="tags" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="名称" width="200" />
        <el-table-column prop="slug" label="Slug" width="200" />
        <el-table-column prop="createdAt" label="创建时间" width="170"><template #default="{ row }">{{ row.createdAt?.slice(0, 16) }}</template></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑标签' : '新增标签'" width="480" destroy-on-close>
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称" required><el-input v-model="form.name" placeholder="标签名称" /></el-form-item>
        <el-form-item label="Slug" required><el-input v-model="form.slug" placeholder="标签标识（唯一）" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
