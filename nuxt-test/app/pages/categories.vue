<!-- categories — 分类管理页（ADMIN/SUPERADMIN）：列表、新增、编辑、拖拽排序、删除 -->
<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Rank } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
definePageMeta({ middleware: 'auth' })

const { getList, create, update, remove, reorder } = useCategory()
const categories = ref([])
const loading = ref(false)
const displayCount = ref(5)
const allLoaded = ref(false)
const loadingMore = ref(false)
const tableRef = ref<any>()
// 设置固定高度确保始终有滚动条，触发懒加载
const tableHeight = ref<number | undefined>(undefined)
// 哨兵行：全部加载后在表格末尾显示
const displayCategories = computed(() => {
  const items = categories.value.slice(0, displayCount.value)
  if (allLoaded.value && items.length > 0) {
    return [...items, { _isEndMarker: true }]
  }
  return items
})

const columnCount = 5 // 排序、名称、描述、创建时间、操作

function tableSpanMethod({ row, columnIndex }: any) {
  if (row._isEndMarker) {
    if (columnIndex === 0) return [1, columnCount]
    return [0, 0]
  }
}

const dialogVisible = ref(false)
const editingId = ref(null)
const form = ref({ name: '', description: '' })
let sortableInstance = null

async function loadData(append = false) {
  if (!append) {
    loading.value = true
    displayCount.value = 5
    allLoaded.value = false
  } else {
    loadingMore.value = true
  }
  try {
    const res = await getList()
    categories.value = res ?? []
    if (!append && tableHeight.value) {
      // 动态计算初始显示条数，确保溢出触发滚动
      const rowH = 42
      const needed = Math.ceil(tableHeight.value / rowH) + 2
      displayCount.value = Math.min(needed, categories.value.length)
    }
    if (displayCount.value >= categories.value.length) {
      allLoaded.value = true
    }
  } catch {
    if (!append) categories.value = []
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

function initSortable() {
  nextTick(() => {
    const el = document.querySelector('.el-table__body-wrapper tbody')
    if (!el || sortableInstance) return
    sortableInstance = Sortable.create(el, {
      handle: '.drag-handle',
      animation: 200,
      onEnd: async (evt) => {
        const list = categories.value
        const displayList = list.slice(0, displayCount.value)
        const [moved] = displayList.splice(evt.oldIndex, 1)
        displayList.splice(evt.newIndex, 0, moved)
        // Replace back into full array
        for (let i = 0; i < displayList.length; i++) {
          list[i] = displayList[i]
        }
        categories.value = [...list]
        const orders = list.map((item, idx) => ({ id: item.id, sortOrder: idx }))
        try {
          await reorder(orders)
          ElMessage.success('排序已保存')
        } catch {
          ElMessage.error('排序保存失败')
          await loadData()
        }
      },
    })
  })
}

function openCreate() {
  editingId.value = null
  form.value = { name: '', description: '' }
  dialogVisible.value = true
}

function openEdit(cat) {
  editingId.value = cat.id
  form.value = { name: cat.name, description: cat.description ?? '' }
  dialogVisible.value = true
}

async function handleSave() {
  if (!form.value.name) {
    ElMessage.warning('名称不能为空')
    return
  }
  try {
    if (editingId.value) {
      await update(editingId.value, { name: form.value.name, description: form.value.description })
      ElMessage.success('更新成功')
    } else {
      const slug = form.value.name.toLowerCase().replace(/\s+/g, '-')
      await create({ name: form.value.name, slug, description: form.value.description })
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    await loadData()
  } catch (e) {
    ElMessage.error(e.response?.data?.message || '操作失败')
  }
}

async function handleDelete(id) {
  try {
    await ElMessageBox.confirm('确定删除此分类？', '确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await remove(id)
    ElMessage.success('删除成功')
    await loadData()
  } catch {
    /* 忽略错误 */
  }
}

function handleScroll(_scroll: any) {
  if (allLoaded.value || loadingMore.value) return
  const el = tableRef.value?.$el?.querySelector('.el-table__body-wrapper')
  if (!el) return
  const dist = el.scrollHeight - el.scrollTop - el.clientHeight
  if (dist <= 50) {
    loadingMore.value = true
    displayCount.value = Math.min(displayCount.value + 8, categories.value.length)
    if (displayCount.value >= categories.value.length) {
      allLoaded.value = true
    }
    nextTick(() => { loadingMore.value = false })
  }
}

onMounted(async () => {
  tableHeight.value = window.innerHeight - 260
  window.addEventListener('resize', () => { tableHeight.value = window.innerHeight - 260 })
  await nextTick()
  await loadData()
  initSortable()
})
</script>

<template>
  <div>
    <div class="page-header">
      <h2>分类管理</h2>
      <el-button type="primary" :icon="Plus" @click="openCreate">新增分类</el-button>
    </div>
    <div class="page-card">
      <el-table v-loading="loading" :data="displayCategories" stripe row-key="id" ref="tableRef" :max-height="tableHeight" :span-method="tableSpanMethod" @scroll="handleScroll">
        <el-table-column label="排序" width="55" class-name="drag-handle-col" align="center">
          <template #default="{ row }">
            <div v-if="row._isEndMarker" style="text-align:center;color:#999;font-size:13px;padding:2px 0;line-height:1.2;width:100%">已加载全部</div>
            <el-icon v-else class="drag-handle" style="cursor: grab; color: #bbb; font-size: 16px"><Rank /></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="160" />
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="createdAt" label="创建时间" width="160"
          ><template #default="{ row }">{{
            (row.createdAt || '').replace('T', ' ').slice(0, 16)
          }}</template></el-table-column
        >
        <el-table-column label="操作" width="130" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="editingId ? '编辑分类' : '新增分类'"
      width="480"
      destroy-on-close
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称" required
          ><el-input v-model="form.name" placeholder="分类名称"
        /></el-form-item>
        <el-form-item label="描述"
          ><el-input v-model="form.description" type="textarea" :rows="2"
        /></el-form-item>
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
  :deep(.cell) {
    padding: 0 8px !important;
  }
}
</style>
