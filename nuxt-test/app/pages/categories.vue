<script lang="ts" setup>
definePageMeta({ middleware: "auth" })
import { ref, onMounted, nextTick } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { Plus, Rank } from "@element-plus/icons-vue"
import Sortable from "sortablejs"

const { getList, create, update, remove, reorder } = useCategory()
const categories = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const editingId = ref(null)
const form = ref({ name: "", description: "" })
let sortableInstance = null

async function loadData() {
  loading.value = true
  try { const res = await getList(); categories.value = res ?? [] }
  catch { categories.value = [] }
  finally { loading.value = false }
}

function initSortable() {
  nextTick(() => {
    const el = document.querySelector(".el-table__body-wrapper tbody")
    if (!el || sortableInstance) return
    sortableInstance = Sortable.create(el, {
      handle: ".drag-handle",
      animation: 200,
      onEnd: async (evt) => {
        const list = categories.value
        const [moved] = list.splice(evt.oldIndex, 1)
        list.splice(evt.newIndex, 0, moved)
        const orders = list.map((item, idx) => ({ id: item.id, sortOrder: idx }))
        categories.value = [...list]
        try { await reorder(orders); ElMessage.success("排序已保存") }
        catch { ElMessage.error("排序保存失败"); await loadData() }
      }
    })
  })
}

function openCreate() { editingId.value = null; form.value = { name: "", description: "" }; dialogVisible.value = true }

function openEdit(cat) { editingId.value = cat.id; form.value = { name: cat.name, description: cat.description ?? "" }; dialogVisible.value = true }

async function handleSave() {
  if (!form.value.name) { ElMessage.warning("名称不能为空"); return }
  try {
    if (editingId.value) {
      await update(editingId.value, { name: form.value.name, description: form.value.description })
      ElMessage.success("更新成功")
    } else {
      const slug = form.value.name.toLowerCase().replace(/\s+/g, "-")
      await create({ name: form.value.name, slug, description: form.value.description })
      ElMessage.success("创建成功")
    }
    dialogVisible.value = false; await loadData()
  } catch (e) { ElMessage.error(e.response?.data?.message || "操作失败") }
}

async function handleDelete(id) {
  try {
    await ElMessageBox.confirm("确定删除此分类？", "确认", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" })
    await remove(id); ElMessage.success("删除成功"); await loadData()
  } catch { }
}

onMounted(async () => { await loadData(); initSortable() })
</script>

<template>
  <div>
    <div class="page-header">
      <h2>分类管理</h2>
      <el-button type="primary" :icon="Plus" @click="openCreate">新增分类</el-button>
    </div>
    <div class="page-card">
      <el-table :data="categories" v-loading="loading" stripe row-key="id">
        <el-table-column label="#" width="48" class-name="drag-handle-col" align="center">
          <template #default>
            <el-icon class="drag-handle" style="cursor:grab;color:#bbb;font-size:16px"><Rank /></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="64" align="center" />
        <el-table-column prop="name" label="名称" min-width="160" />
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="createdAt" label="创建时间" width="160"><template #default="{ row }">{{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}</template></el-table-column>
        <el-table-column label="操作" width="130" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑分类' : '新增分类'" width="480" destroy-on-close>
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称" required><el-input v-model="form.name" placeholder="分类名称" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" type="textarea" :rows="2" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.drag-handle-col {
  :deep(.cell) { padding: 0 8px !important; }
}
</style>
