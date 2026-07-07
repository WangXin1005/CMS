<!-- tags - 标签管理页 -->
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search, Plus } from "@element-plus/icons-vue";
definePageMeta({ middleware: "auth" })
const { role } = useAuth()
const isGuest = computed(() => role.value === "GUEST");

const { getList, create, update, remove } = useTag();
const tags = ref([]);
const search = ref("");
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);

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
    else { const slug = form.value.name.toLowerCase().replace(/\s+/g, "-"); await create({ name: form.value.name, slug }); ElMessage.success("创建成功"); }
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
  <div>
    <div class="page-header"><h2>标签管理</h2><el-button type="primary" :icon="Plus" @click="openCreate">新增标签</el-button></div>
    <div class="page-card">
      <div class="filter-bar"><el-input v-model="search" placeholder="搜索标签..." :prefix-icon="Search" style="width: 260px" clearable /></div>
      <div class="table-with-pagination">
      <el-table :data="pagedTags" v-loading="loading" style="width: 100%" stripe>
          <el-table-column type="index" label="序号" width="55" align="center" :index="(i) => (currentPage - 1) * pageSize + i + 1" />
          <el-table-column prop="name" label="名称" min-width="280" />
          <el-table-column prop="createdAt" label="创建时间" width="160"><template #default="{ row }">{{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}</template></el-table-column>
          <el-table-column v-if="!isGuest" label="操作" width="130" fixed="right"><template #default="{ row }"><el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button><el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button></template></el-table-column>
                  <template #empty><div style="padding:40px 0;color:#909399">暂无数据</div></template>
        </el-table>
      <div class="pagination-wrapper"><el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="filteredTags.length" layout="prev, pager, next, jumper, total" :hide-on-single-page="false" background /></div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑标签' : '新增标签'" width="480" destroy-on-close>
      <el-form :model="form" label-width="80px"><el-form-item label="名称" required><el-input v-model="form.name" placeholder="标签名称" /></el-form-item></el-form>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" @click="handleSave">保存</el-button></template>
    </el-dialog>
  </div>
</template>
<style scoped>.el-table { min-height: 500px; }.table-with-pagination { position: relative; }
.table-with-pagination .pagination-wrapper { margin: 0; padding: 6px 12px; position: absolute; bottom: 0; right: 0; z-index: 1; background: rgba(255,255,255,0.95); border-radius: 4px; }
.el-table { min-height: 500px; }
</style>
