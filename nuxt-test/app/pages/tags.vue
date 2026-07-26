<!-- tags - 标签管理页（拖拽排序） -->
<script lang="ts" setup>
import { ref, computed, onMounted, onActivated, nextTick, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus, Rank } from "@element-plus/icons-vue";
import Sortable from "sortablejs";
definePageMeta({ middleware: "auth" })
const { role } = useAuth()
const isGuest = computed(() => role.value === "GUEST");
const isAdmin = computed(() => role.value === "ADMIN" || role.value === "SUPERADMIN");

const { getList, create, update, remove, reorder } = useTag();
const tags = ref([]);
const { wrapperRef, tableHeight } = useTableHeight(0);
const loading = ref(false);
const displayCount = ref(15);
const allLoaded = ref(false);
const showEndMarker = computed(() => allLoaded.value && tags.value.length * 42 > (tableHeight.value || 400));
const loadingMore = ref(false);
const tableRef = ref();
const tableKey = ref(0);

const displayTags = computed(() => {
  const items = tags.value.slice(0, displayCount.value);
  if (showEndMarker.value) return [...items, { _isEndMarker: true }];
  return items;
});

const columnCount = 4;
function tableRowClassName({ row }: any) {
  return row._isEndMarker ? 'end-marker-row' : ''
}
function tableSpanMethod({ row, columnIndex }: any) {
  if (row._isEndMarker) {
    if (columnIndex === 0) return [1, columnCount];
    return [0, 0];
  }
}

const dialogVisible = ref(false);
const editingId = ref(null);
const form = ref({ name: "" });
let sortableInstance: any = null;

async function loadData(append = false) {
  if (!append) { loading.value = true; displayCount.value = 15; allLoaded.value = false; }
  else { loadingMore.value = true; }
  try {
    const res = await getList();
    tags.value = res ?? [];
    if (!append && tableHeight.value) {
      const rowH = 42;
      const needed = Math.ceil(tableHeight.value / rowH) + 2;
      displayCount.value = Math.min(needed, tags.value.length);
    }
    if (displayCount.value >= tags.value.length) allLoaded.value = true;
  } catch { if (!append) tags.value = []; }
  finally { loading.value = false; loadingMore.value = false; }
}

function initSortable() {
  nextTick(() => {
    requestAnimationFrame(() => {
      tryInitSortable();
    });
  });
}

// 带重试机制的 Sortable 初始化，避免生产环境 DOM 渲染延迟导致初始化失败
function tryInitSortable(retryCount = 10) {
    const el = document.querySelector(".el-table__body-wrapper tbody");
    if (!el || !el.children.length) {
      if (retryCount > 0) {
        setTimeout(() => tryInitSortable(retryCount - 1), 100);
      }
      return;
    }
    // 销毁旧实例
    if (sortableInstance) {
      sortableInstance.destroy();
      sortableInstance = null;
    }
    sortableInstance = Sortable.create(el, {
      handle: ".drag-handle", animation: 200,
      onEnd: async (evt: any) => {
        if (sortableInstance) { sortableInstance.destroy(); sortableInstance = null }
        const list = [...tags.value]
        const [moved] = list.splice(evt.oldIndex, 1)
        list.splice(evt.newIndex, 0, moved)
        tags.value = list
        const orders = list.map((item: any, idx: number) => ({ id: item.id, sortOrder: idx }))
        try {
          await reorder(orders)
          ElMessage.success("排序已保存")
        } catch { /* ignore */ }
        await loadData()
        tableKey.value++
      },
    });
}

function openCreate() { editingId.value = null; form.value = { name: "" }; dialogVisible.value = true; }
function openEdit(tag: any) { editingId.value = tag.id; form.value = { name: tag.name }; dialogVisible.value = true; }

async function handleSave() {
  if (!form.value.name) { ElMessage.warning("名称不能为空"); return; }
  try {
    if (editingId.value) { await update(editingId.value, form.value); ElMessage.success("更新成功"); }
    else { const slug = form.value.name.toLowerCase().replace(/\s+/g, "-"); await create({ name: form.value.name, slug }); ElMessage.success("创建成功"); }
    dialogVisible.value = false; await loadData();
  } catch { /* ignore */ }
}

async function handleDelete(id: number) {
  try {
    await ElMessageBox.confirm("确定删除此标签？", "确认", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" });
    await remove(id); ElMessage.success("删除成功"); await loadData();
  } catch { /* ignore */ }
}

function handleScroll() {
  if (allLoaded.value || loading.value || loadingMore.value) return;
  const el = tableRef.value?.$el?.querySelector(".el-table__body-wrapper");
  if (!el) return;
  const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
  if (dist <= 50) {
    loadingMore.value = true;
    displayCount.value = Math.min(displayCount.value + 8, tags.value.length);
    if (displayCount.value >= tags.value.length) allLoaded.value = true;
    nextTick(() => { loadingMore.value = false; });
  }
}

onMounted(async () => { await nextTick(); await loadData(); if (isAdmin.value) initSortable(); });
onActivated(async () => { await loadData(); tableKey.value++; });
watch(tableKey, () => { if (isAdmin.value) nextTick(() => initSortable()) });
</script>

<template>
  <div style="flex:1; min-height:0; display:flex; flex-direction:column">
    <div class="page-header"><h2>标签管理</h2><el-button v-if="!isGuest" type="primary" :icon="Plus" @click="openCreate">新增标签</el-button></div>
    <div ref="wrapperRef" class="page-card" style="flex:1; min-height:0">
      <el-table ref="tableRef" :data="displayTags" :key="tableKey" v-loading="loading" :span-method="tableSpanMethod" :row-class-name="tableRowClassName" style="width: 100%" :max-height="tableHeight" @scroll="handleScroll" stripe>
        <el-table-column label="排序" width="55" class-name="drag-handle-col" align="center">
          <template #default="{ row, $index }">
            <div v-if="row._isEndMarker" style="text-align:center;color:#999;font-size:13px;padding:2px 0;line-height:1.2;width:100%">已加载全部</div>
            <template v-else-if="isAdmin">
              <el-icon class="drag-handle" style="cursor: grab; color: #bbb; font-size: 16px"><Rank /></el-icon>
            </template>
            <span v-else style="color:#999;font-size:13px">{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="280" />
        <el-table-column prop="createdAt" label="创建时间" width="160"><template #default="{ row }">{{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}</template></el-table-column>
        <el-table-column v-if="isAdmin" label="操作" width="130" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
        <template #empty><div style="padding:40px 0;color:#909399">暂无数据</div></template>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑标签' : '新增标签'" width="480" destroy-on-close>
      <el-form :model="form" label-width="80px" @submit.prevent><el-form-item label="名称" required><el-input v-model="form.name" placeholder="标签名称" /></el-form-item></el-form>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" @click="handleSave">保存</el-button></template>
    </el-dialog>
  </div>
</template>
