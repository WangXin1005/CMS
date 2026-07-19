<!-- media - 媒体管理页（分页 pageSize=7） -->
<script lang="ts" setup>
import { ref, computed, onMounted, onActivated } from "vue";
const { role } = useAuth();
const isAdmin = computed(() => role.value === "ADMIN" || role.value === "SUPERADMIN");
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
definePageMeta({ middleware: "auth" });

const { upload, getList, remove } = useMedia();
const mediaList = ref([]);
const currentPage = ref(1);
const pageSize = ref(7);

// 使用 useTableHeight 测量 table-with-pagination 高度，预留 44px 给分页器
const { wrapperRef, tableHeight } = useTableHeight(0);

const pagedMedia = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return mediaList.value.slice(start, start + pageSize.value);
});
const loading = ref(false);
const uploadLoading = ref(false);

function formatSize(bytes) {
  if (!bytes) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

async function loadData() {
  loading.value = true;
  try { const res = await getList(); mediaList.value = res ?? []; }
  catch { mediaList.value = []; }
  finally { loading.value = false; }
}

async function handleUpload(file) {
  uploadLoading.value = true;
  try { await upload(file); ElMessage.success("上传成功"); await loadData(); }
  catch { /* 拦截器已处理 */ }
  finally { uploadLoading.value = false; }
}

function beforeUpload(file) {
  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
  if (!allowed.includes(file.type)) { ElMessage.error("只支持 jpg/png/gif/webp/svg 格式"); return false; }
  if (file.size > 10 * 1024 * 1024) { ElMessage.error("文件大小不能超过 10MB"); return false; }
  handleUpload(file);
  return false;
}

async function handleDelete(id) {
  try {
    await ElMessageBox.confirm("确定删除此文件？", "确认", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" });
    await remove(id); ElMessage.success("删除成功"); await loadData();
  } catch { /* cancelled */ }
}

onMounted(loadData);
onActivated(loadData);
</script>

<template>
  <!-- 根容器：flex 填充 content-inner 剩余空间 -->
  <div style="flex:1; min-height:0; display:flex; flex-direction:column">
    <div class="page-header">
      <h2>媒体管理</h2>
      <el-upload :show-file-list="false" :before-upload="beforeUpload" accept="image/*">
        <el-button type="primary" :icon="Plus" :loading="uploadLoading">上传文件</el-button>
      </el-upload>
    </div>
    <!-- page-card 填充剩余空间，底边距窗口 25px -->
    <div class="page-card" style="flex:1; min-height:0">
      <!-- table-with-pagination：表格+分页器外层容器 -->
      <div ref="wrapperRef" class="table-with-pagination">
        <el-table :data="pagedMedia" v-loading="loading" style="width: 100%" :max-height="tableHeight" stripe>
          <el-table-column type="index" label="序号" width="55" align="center" :index="(i) => (currentPage - 1) * pageSize + i + 1" />
          <el-table-column label="预览" width="70">
            <template #default="{ row }"><el-image :src="row.url" style="width: 42px; height: 42px; border-radius: 6px" fit="cover" :preview-src-list="[row.url]" preview-teleported /></template>
          </el-table-column>
          <el-table-column prop="originalName" label="文件名" min-width="200" show-overflow-tooltip />
          <el-table-column prop="mimeType" label="类型" width="100" />
          <el-table-column label="大小" width="90"><template #default="{ row }">{{ formatSize(row.size) }}</template></el-table-column>
          <el-table-column prop="uploadedBy.username" label="上传者" width="100" />
          <el-table-column prop="createdAt" label="时间" width="170"><template #default="{ row }">{{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}</template></el-table-column>
          <el-table-column v-if="isAdmin" label="操作" width="100" fixed="right">
            <template #default="{ row }"><el-button link type="danger" size="small" @click="handleDelete(row.id)">删除</el-button></template>
          </el-table-column>
          <template #empty><div style="padding:40px 0;color:#909399">暂无数据</div></template>
        </el-table>
        <!-- 分页器：绝对定位固定在右下角 -->
        <div class="pagination-wrapper">
          <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="mediaList.length" layout="prev, pager, next, jumper, total" :hide-on-single-page="false" background />
        </div>
      </div>
    </div>
  </div>
</template>
