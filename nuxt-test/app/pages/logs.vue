<!-- logs - 操作日志页（分页 pageSize=10） -->
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
definePageMeta({ middleware: "auth" });

const { getLogs } = useLog();
const { getList: getCatList } = useCategory();
const { getList: getTagList } = useTag();

const logs = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const filterUsername = ref("");
const filterAction = ref("");
const filterEntity = ref("");

const catMap = ref({});
const tagMap = ref({});

// 使用 useTableHeight 测量 table-with-pagination 高度，预留 44px 给分页器
const { wrapperRef, tableHeight } = useTableHeight(0);

const actionWeight = {
  DELETE: { weight: 5, type: "danger", label: "删除" },
  UPLOAD: { weight: 4, type: "success", label: "上传" },
  CREATE: { weight: 4, type: "success", label: "创建" },
  UPDATE: { weight: 3, type: "warning", label: "修改" },
  LOGOUT: { weight: 2, type: "info", label: "退出" },
  LOGIN: { weight: 1, type: "info", label: "登录" },
  OTHER: { weight: 0, type: "", label: "其他" },
};

function actionStyle(action) {
  const w = (actionWeight[action] || {}).weight ?? 0;
  const opacity = [0.55, 0.65, 0.8, 1, 1, 1][w] ?? 0.6;
  const fontWeight = w >= 4 ? 700 : w >= 3 ? 600 : 400;
  return { opacity, fontWeight };
}

const actionMap = { CREATE: "创建", UPDATE: "修改", DELETE: "删除", UPLOAD: "上传", LOGIN: "登录", LOGOUT: "退出", OTHER: "其他" };
const entityMap = { Article: "文章", Category: "分类", Tag: "标签", User: "用户", Comment: "评论", Media: "媒体", SiteSetting: "站点设置", Auth: "认证" };
const entityOptions = Object.entries(entityMap).map(([value, label]) => ({ value, label }));

const detailDialogVisible = ref(false);
const detailRow = ref(null);

function showDetail(row) { detailRow.value = row; detailDialogVisible.value = true; }

// 详情差异计算（computed 避免重复解析）
const detailDiff = computed(() => {
  if (!detailRow.value || detailRow.value.action !== "UPDATE") return { oldObj: null, newObj: null, changes: [] };
  const { data } = parseData(detailRow.value.details);
  if (!data) return { oldObj: null, newObj: null, changes: [] };
  try {
    const parsed = JSON.parse(data);
    const oldObj = parsed.o || {};
    const newObj = parsed.n || {};
    const changes = [];
    for (const key of Object.keys(oldObj)) {
      if (newObj[key] !== undefined && String(newObj[key]) !== String(oldObj[key])) {
        changes.push({ key, oldVal: oldObj[key], newVal: newObj[key] });
      }
    }
    return { oldObj, newObj, changes };
  } catch { return { oldObj: null, newObj: null, changes: [] }; }
});

function parseData(details) {
  if (!details) return { summary: "", data: "" };
  const idx = details.indexOf(" | 数据:");
  if (idx === -1) return { summary: details, data: "" };
  return { summary: details.substring(0, idx), data: details.substring(idx + 6).trim() };
}

// 格式化新增/删除操作描述
function formatOpDesc(row) {
  const { data } = parseData(row.details);
  let parsed = null;
  if (data) { try { parsed = JSON.parse(data); } catch {} }
  
  const entityLabel = entityMap[row.entity] || row.entity;

  if (row.action === "UPLOAD") {
    if (parsed && (parsed.originalName || parsed.filename)) return { prefix: "上传" + entityLabel, name: parsed.originalName || parsed.filename, nameColor: "#67c23a", suffix: "" };
    return null;
  }

  if (row.action === "CREATE") {
    if (parsed) {
      if (row.entity === "Article" && parsed.title) return { prefix: "创建" + entityLabel, name: parsed.title, nameColor: "#67c23a", suffix: "" };
      if (row.entity === "User" && parsed.username) return { prefix: "创建" + entityLabel, name: parsed.username, nameColor: "#67c23a", suffix: "" };
      if (row.entity === "Media" && (parsed.originalName || parsed.filename)) return { prefix: "创建" + entityLabel, name: parsed.originalName || parsed.filename, nameColor: "#67c23a", suffix: "" };
      if (parsed.name) return { prefix: "创建" + entityLabel, name: parsed.name, nameColor: "#67c23a", suffix: "" };
    }
    return null;
  }
  
  if (row.action === "DELETE") {
    if (parsed) {
      if (row.entity === "Article" && parsed.title) return { prefix: "删除" + entityLabel, name: parsed.title, nameColor: "#f56c6c", suffixLabel: "，ID：", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: "#f56c6c" };
      if (row.entity === "User" && parsed.username) return { prefix: "删除" + entityLabel, name: parsed.username, nameColor: "#f56c6c", suffixLabel: "，ID：", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: "#f56c6c" };
      if (row.entity === "Media" && (parsed.originalName || parsed.filename)) return { prefix: "删除" + entityLabel, name: parsed.originalName || parsed.filename, nameColor: "#f56c6c", suffixLabel: "，ID：", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: "#f56c6c" };
      if (parsed.name) return { prefix: "删除" + entityLabel, name: parsed.name, nameColor: "#f56c6c", suffixLabel: "，ID：", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: "#f56c6c" };
    }
    return { prefix: "删除" + entityLabel, name: "", nameColor: "", suffixLabel: " ID：", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: "#f56c6c" };
  }
  
  return null;
}

const fieldLabelMap = {
  username: "用户名", email: "邮箱", role: "角色", password: "密码",
  title: "标题", content: "内容", categoryId: "分类", tagIds: "标签",
  status: "状态", visibility: "可见性", name: "名称", description: "描述",
  oldPassword: "原密码", newPassword: "新密码",
};

// 从 details 数据中提取 o(旧数据) 和 n(新数据)
function parseOldNewData(row) {
  if (row.action !== "UPDATE") return { oldObj: null, newObj: null };
  const { data } = parseData(row.details);
  if (!data) return { oldObj: null, newObj: null };
  try {
    const parsed = JSON.parse(data);
    return { oldObj: parsed.o || null, newObj: parsed.n || null };
  } catch { return { oldObj: null, newObj: null }; }
}

function parseDataFields(detailsStr) {
  if (!detailsStr) return {};
  const fields = {};
  // Split by " | " but not inside values
  const parts = detailsStr.split(" | ");
  for (const part of parts) {
    const colonIdx = part.indexOf(": ");
    if (colonIdx === -1) continue;
    const key = part.substring(0, colonIdx).trim();
    const value = part.substring(colonIdx + 2).trim();
    fields[key] = value;
  }
  return fields;
}

function getFieldLabel(key) { return fieldLabelMap[key] || key; }

async function loadData() {
  loading.value = true;
  try {
    const res = await getLogs(currentPage.value, pageSize.value, {
      username: filterUsername.value || undefined,
      action: filterAction.value || undefined,
      entity: filterEntity.value || undefined,
    });
    logs.value = res.content ?? [];
    total.value = res.totalElements ?? 0;
  } catch { logs.value = []; total.value = 0; }
  finally { loading.value = false; }
}

async function loadMaps() {
  try {
    const [cats, tagRes] = await Promise.all([getCatList(), getTagList()]);
    for (const c of cats ?? []) catMap.value[c.id] = c.name;
    for (const t of tagRes ?? []) tagMap.value[t.id] = t.name;
  } catch { /* ignore */ }
}

function onFilter() { currentPage.value = 1; loadData(); }

const resultStyle = { SUCCESS: "color: #67c23a; font-weight: bold;", FAIL: "color: #f56c6c; font-weight: bold;" };
const resultIcon = { SUCCESS: "\u2713", FAIL: "\u2717" };

onMounted(() => { loadData(); loadMaps(); });
</script>

<template>
  <!-- 根容器：flex 填充 content-inner 剩余空间 -->
  <div style="flex:1; min-height:0; display:flex; flex-direction:column">
    <div class="page-header"><h2>操作日志</h2></div>
    <!-- page-card 填充剩余空间，底边距窗口 25px -->
    <div class="page-card" style="flex:1; min-height:0">
      <div class="filter-bar" style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <el-input v-model="filterUsername" placeholder="用户名" clearable style="width:140px" @clear="onFilter" @keyup.enter="onFilter" />
        <el-button @click="onFilter">搜索</el-button>
        <div style="display:flex;gap:12px;align-items:center;margin-left:auto">
          <el-select v-model="filterAction" placeholder="操作类型" clearable style="width:120px" @change="onFilter">
            <el-option label="登录" value="LOGIN" />
            <el-option label="退出" value="LOGOUT" />
            <el-option label="创建" value="CREATE" />
            <el-option label="修改" value="UPDATE" />
            <el-option label="删除" value="DELETE" />
          </el-select>
          <el-select v-model="filterEntity" placeholder="操作对象" clearable style="width:140px" @change="onFilter"><el-option v-for="e in entityOptions" :key="e.value" :label="e.label" :value="e.value" /></el-select>
        </div>
      </div>
      <!-- table-with-pagination：表格+分页器外层容器 -->
      <div ref="wrapperRef" class="table-with-pagination">
        <el-table style="width: 100%" :data="logs" v-loading="loading" :max-height="tableHeight" stripe>
          <el-table-column type="index" label="序号" width="55" align="center" :index="(i) => (currentPage - 1) * pageSize + i + 1" />
          <el-table-column prop="username" label="用户名" min-width="100" align="center" header-align="center" />
          <el-table-column label="操作类型" min-width="100" align="center" header-align="center">
            <template #default="{ row }">
              <el-tag :type="(actionWeight[row.action] || {}).type || 'info'" size="small" :style="actionStyle(row.action)">{{ actionMap[row.action] || row.action }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作对象" min-width="100" align="center" header-align="center"><template #default="{ row }">{{ entityMap[row.entity] || row.entity }}</template></el-table-column>
          <el-table-column prop="entityId" label="对象ID" width="85" show-overflow-tooltip header-align="center" />
          <el-table-column prop="clientIp" label="IP" min-width="130" align="center" header-align="center" />
          <el-table-column label="结果" width="70" align="center" header-align="center">
            <template #default="{ row }">
              <span :style="resultStyle[row.result] || ''">{{ resultIcon[row.result] || "" }} {{ row.result === "SUCCESS" ? "成功" : row.result === "FAIL" ? "失败" : row.result }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="时间" width="170" align="center" header-align="center">
            <template #default="{ row }">{{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}</template>
          </el-table-column>
          <el-table-column label="操作" width="80" fixed="right" align="center">
            <template #default="{ row }"><el-button link type="primary" size="small" @click="showDetail(row)">详情</el-button></template>
          </el-table-column>
          <template #empty><div style="padding:40px 0;color:#909399">暂无数据</div></template>
        </el-table>
        <!-- 分页器：绝对定位固定在右下角 -->
        <div class="pagination-wrapper">
          <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="total" layout="prev, pager, next, jumper, total" :hide-on-single-page="false" background @current-change="loadData" />
        </div>
      </div>
    </div>

    <el-dialog v-model="detailDialogVisible" title="日志详情" width="700" destroy-on-close>
      <template v-if="detailRow">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="用户名">{{ detailRow.username }}</el-descriptions-item>
          <el-descriptions-item label="操作类型">{{ actionMap[detailRow.action] || detailRow.action }}</el-descriptions-item>
          <el-descriptions-item label="操作对象">{{ entityMap[detailRow.entity] || detailRow.entity }}</el-descriptions-item>
          <el-descriptions-item label="操作实体ID">{{ detailRow.entityId }}</el-descriptions-item>
          <el-descriptions-item label="结果">
            <span :style="resultStyle[detailRow.result] || ''">{{ detailRow.result === "SUCCESS" ? "成功" : detailRow.result === "FAIL" ? "失败" : detailRow.result }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="IP地址">{{ detailRow.clientIp }}</el-descriptions-item>
          <el-descriptions-item label="操作描述" :span="2">
            <template v-if="formatOpDesc(detailRow)">
              {{ formatOpDesc(detailRow).prefix }}<span :style="{color:formatOpDesc(detailRow).nameColor,fontWeight:'bold'}">{{ formatOpDesc(detailRow).name }}</span><template v-if="formatOpDesc(detailRow).suffixLabel">{{ formatOpDesc(detailRow).suffixLabel }}<span :style="{color:formatOpDesc(detailRow).suffixColor,fontWeight:'bold'}">{{ formatOpDesc(detailRow).suffixValue }}</span></template>
              <span v-if="detailRow.result==='FAIL' && detailRow.errorMsg" style="color:#f56c6c;font-weight:bold">（失败原因：{{ detailRow.errorMsg }}）</span>
            </template>
            <template v-else-if="detailRow.action==='LOGIN'">
              用户 {{ detailRow.username }} 登录系统
              <span v-if="detailRow.result==='FAIL' && detailRow.errorMsg" style="color:#f56c6c;font-weight:bold">（失败原因：{{ detailRow.errorMsg }}）</span>
            </template>
            <template v-else>{{ detailRow.details }}</template>
          </el-descriptions-item>
          <el-descriptions-item label="时间">{{ (detailRow.createdAt || "").replace("T", " ").slice(0, 16) }}</el-descriptions-item>
          <el-descriptions-item label="请求路径" :span="2">{{ detailRow.path }}</el-descriptions-item>
        </el-descriptions>
        <div v-if="detailRow.action==='UPDATE'" style="margin-top:16px">
          <h4 style="margin-bottom:8px;color:#303133">操作数据</h4>
          <div style="background:#f5f7fa;padding:12px;border-radius:4px;max-height:300px;overflow:auto">
            <template v-if="detailDiff.changes.length">
              <div v-for="ch in detailDiff.changes" :key="ch.key" style="font-family:monospace;font-size:13px;line-height:1.8;margin-bottom:4px">
                <strong>{{ getFieldLabel(ch.key) }}:</strong>
                <span style="color:#f56c6c;text-decoration:line-through;margin-right:6px">{{ ch.oldVal }}</span>
                <span style="color:#67c23a">{{ ch.newVal }}</span>
              </div>
            </template>
            <div v-else style="font-family:monospace;font-size:13px;white-space:pre-wrap;word-break:break-all">暂无修改数据，原始记录：{{ parseData(detailRow.details).data || detailRow.details || "无" }}</div>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
