<!-- tags - 标签管理页（分页 pageSize=10） -->
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search, Plus } from "@element-plus/icons-vue";
definePageMeta({ middleware: "auth" })
const { role } = useAuth()
const isGuest = computed(() => role.value === "GUEST");
const isAdmin = computed(() => role.value === 'ADMIN' || role.value === 'SUPERADMIN');

const { getList, create, update, remove } = useTag();
const tags = ref([]);
const search = ref("");
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);

// 使用 useTableHeight 测量 table-with-pagination 高度，预留 44px 给分页器
const { wrapperRef, tableHeight } = useTableHeight(0);

const filteredTags = computed(() => {
  if (!search.value) return tags.value;
  return tags.value.filter((t) => t.name && t.name.includes(search.value));
});
const pagedTags = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredTags.value.slice(start, start + pageSize.value);
});

const dialogVisible = ref(false);
const editingId = ref(null);
const form = ref({ name: "" });

async function loadData() {
  loading.value = true;
  try { const res = await getList(); tags.value = res ?? []; currentPage.value = 1; }
  catch { tags.value = []; }
  finally { loading.value = false; }
}
function openCreate() { editingId.value = null; form.value = { name: "" }; dialogVisible.value = true; }
function openEdit(tag) { editingId.value = tag.id; form.value = { name: tag.name }; dialogVisible.value = true; }
async function handleSave() {
  if (!form.value.name) { ElMessage.warning("名称不能为空"); return; }
  try {
    if (editingId.value) { await update(editingId.value, form.value); ElMessage.success("更新成功"); }
    else { const slug = form.value.name.toLowerCase().replace(/s+/g, "-"); await create({ name: form.value.name, slug }); ElMessage.success("创建成功"); }
    dialogVisible.value = false; await loadData();
  } catch { /* 拦截器已处理消息提示 */ }
}
async function handleDelete(id) {
  try {
    await ElMessageBox.confirm("确定删除此标签？", "确认", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" });
    await remove(id); ElMessage.success("删除成功"); await loadData();
  } catch { /* cancelled */ }
}
onMounted(loadData);
</script>

<template>
  <!-- 根容器：flex 填充 content-inner 剩余空间 -->
  <div style="flex:1; min-height:0; display:flex; flex-direction:column">
    <div class="page-header"><h2>标签管理</h2><el-button v-if="!isGuest" type="primary" :icon="Plus" @click="openCreate">新增标签</el-button></div>
    <!-- page-card 填充剩余空间，底边距窗口 25px -->
    <div class="page-card" style="flex:1; min-height:0">
      <div class="filter-bar"><el-input v-model="search" placeholder="搜索标签..." :prefix-icon="Search" style="width: 260px" clearable /></div>
      <!-- table-with-pagination：表格+分页器外层容器 -->
      <div ref="wrapperRef" class="table-with-pagination">
        <el-table :data="pagedTags" v-loading="loading" style="width: 100%" :max-height="tableHeight" stripe>
          <el-table-column type="index" label="序号" width="55" align="center" :index="(i) => (currentPage - 1) * pageSize + i + 1" />
          <el-table-column prop="name" label="名称" min-width="280" />
          <el-table-column prop="createdAt" label="创建时间" width="160"><template #default="{ row }">{{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}</template></el-table-column>
          <el-table-column v-if="isAdmin" label="操作" width="130" fixed="right"><template #default="{ row }"><el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button><el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button></template></el-table-column>
          <template #empty><div style="padding:40px 0;color:#909399">暂无数据</div></template>
        </el-table>
        <!-- 分页器：绝对定位固定在右下角 -->
        <div class="pagination-wrapper">
          <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="filteredTags.length" layout="prev, pager, next, jumper, total" :hide-on-single-page="false" background />
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑标签' : '新增标签'" width="480" destroy-on-close>
      <el-form :model="form" label-width="80px" @submit.prevent><el-form-item label="名称" required><el-input v-model="form.name" placeholder="标签名称" /></el-form-item></el-form>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" @click="handleSave">保存</el-button></template>
    </el-dialog>
  </div>
</template>
