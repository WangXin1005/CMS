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
  APPROVE: { weight: 3, type: "success", label: "通过" },
  REJECT: { weight: 3, type: "warning", label: "驳回" },
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

const actionMap = { CREATE: "创建", UPDATE: "修改", DELETE: "删除", UPLOAD: "上传", APPROVE: "通过", REJECT: "驳回", LOGIN: "登录", LOGOUT: "退出", OTHER: "其他" };
const roleMap = { SUPERADMIN: "超级管理员", ADMIN: "管理员", USER: "用户", GUEST: "访客" };
// 站点设置 key 到中文标签映射
const settingLabelMap = { site_name: "网站名称", site_description: "网站描述", site_logo: "Logo URL", icp_number: "备案号" };
const entityMap = { Article: "文章", Category: "分类", Tag: "标签", User: "用户", Comment: "评论", Media: "媒体", SiteSetting: "站点设置", Auth: "认证" };
const entityOptions = Object.entries(entityMap).map(([value, label]) => ({ value, label }));

const detailDialogVisible = ref(false);
const detailRow = ref(null);

function showDetail(row) { detailRow.value = row; detailDialogVisible.value = true; }

// computed 缓存，避免模板中重复计算
const logDesc = computed(() => detailRow.value ? formatLogDesc(detailRow.value) : null);
const updateDiff = computed(() => detailRow.value ? getUpdateDiff(detailRow.value) : null);


function parseData(details) {
  if (!details) return { summary: "", data: "" };
  const idx = details.indexOf(" | 数据:");
  if (idx === -1) return { summary: details, data: "" };
  return { summary: details.substring(0, idx), data: details.substring(idx + 6).trim() };
}

const fieldLabelMap = {
  username: "用户名", email: "邮箱", role: "角色", password: "密码",
  title: "标题", content: "内容", categoryId: "分类", tagIds: "标签",
  status: "状态", visibility: "可见性", name: "名称", description: "描述",
  oldPassword: "原密码", newPassword: "新密码", value: "值", summary: "摘要",
};

const visibilityLabelMap = { PUBLIC: "公开", PRIVATE: "私密" };
const statusLabelMap = { DRAFT: "草稿", PUBLISHED: "已发布" };
const roleLabelMap = { SUPERADMIN: "超级管理员", ADMIN: "管理员", USER: "普通用户", GUEST: "访客" };


// 格式化 CREATE/DELETE/UPLOAD 的操作描述
function formatLogDesc(row) {
  if (row.action === "UPDATE") return null;
  const { data } = parseData(row.details);
  let parsed = null;
  if (data) { try { parsed = JSON.parse(data); } catch {} }
  const entityLabel = entityMap[row.entity] || row.entity;
  const idStr = row.entityId ? "，ID：" + row.entityId : "";

  // 提取名称：按实体类型匹配对应字段
  function getName(obj) {
    if (!obj) return "";
    if (row.entity === "Article") return obj.title || "";
    if (row.entity === "User") { const rl = roleMap[obj.role] || "用户"; return rl + " " + (obj.username || ""); }
    if (row.entity === "Media") return obj.originalName || obj.filename || "";
    if (row.entity === "Comment") return (obj.content || "").substring(0, 30) + (obj.content && obj.content.length > 30 ? "..." : "");
    if (row.entity === "Auth") return obj.username || "";
    return obj.name || obj.title || "";
  }

  if (row.action === "CREATE") {
    const name = getName(parsed);
    // 文章草稿状态在操作描述中标注
    const isArticleDraft = row.entity === "Article" && parsed && parsed.status === "DRAFT";
    const prefix = isArticleDraft ? "创建草稿" + entityLabel + " " : "创建" + entityLabel + " ";
    if (name) return { prefix, name, nameColor: "#67c23a", suffix: "" };
  }
  if (row.action === "DELETE") {
    const name = getName(parsed);
    if (name) return { prefix: "删除" + entityLabel + " ", name, nameColor: "#f56c6c", suffixLabel: idStr ? "，ID：" : "", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: "#f56c6c" };
    return { prefix: "删除" + entityLabel, name: "", nameColor: "", suffixLabel: " ID：", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: "#f56c6c" };
  }
  if (row.action === "UPLOAD") {
    const name = getName(parsed);
    if (name) return { prefix: "上传" + entityLabel + " ", name, nameColor: "#67c23a", suffix: "" };
  }
  if (row.action === "APPROVE" || row.action === "REJECT") {
    const name = getName(parsed);
    const actLabel = row.action === "APPROVE" ? "通过" : "驳回";
    const color = row.action === "APPROVE" ? "#67c23a" : "#f56c6c";
    if (name) return { prefix: actLabel + entityLabel + " ", name, nameColor: color, suffixLabel: row.entityId ? "，ID：" : "", suffixValue: row.entityId ? String(row.entityId) : "", suffixColor: color };
  }
  if (row.action === "LOGIN" || row.action === "LOGOUT") {
    const name = parsed ? (parsed.username || "") : (row.username || "");
    const loginColor = row.result === "FAIL" ? "#f56c6c" : (row.action === "LOGIN" ? "#67c23a" : "#f56c6c");
    return { prefix: "用户 ", name, nameColor: loginColor, suffix: row.action === "LOGIN" ? " 登录" : " 退出", suffixColor: "" };
  }
  return null;
}

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
// 为 UPDATE 操作生成变更字段列表
function getUpdateDiff(row) {
  if (row.action !== "UPDATE") return null;
  const { oldObj, newObj } = parseOldNewData(row);
  if (!newObj) return null;
  // 无旧数据时（如 SiteSetting 按 key 更新），将所有新字段显示为新增
  // SiteSetting 特殊处理：将 key 解析为可读标签
  const isSiteSetting = row.entity === "SiteSetting";
  const settingKeyLabel = isSiteSetting && newObj.key ? (settingLabelMap[newObj.key] || newObj.key) : null;
  // 标准化 tagIds 排序，避免顺序不同导致误判变更
  function normalizeTagIds(val) {
    if (Array.isArray(val)) return [...val].sort((a,b) => Number(a)-Number(b));
    if (typeof val === "string" && val.includes(",")) return val.split(",").map(Number).sort((a,b)=>a-b);
    return val;
  }
  // 统一标准化某个 key 的值（tagIds 排序）
  function normalizeVal(key, val) {
    if (key === "tagIds") return normalizeTagIds(val);
    return val;
  }
  // 跳过字段
  function skipKey(key) {
    return key === "id" || key === "createdAt" || key === "updatedAt" || key === "password" || key === "viewCount" || key === "slug" || (isSiteSetting && key === "key");
  }
  // 获取显示 key
  function displayKey(key) {
    if (isSiteSetting && key === "value" && settingKeyLabel) return settingKeyLabel;
    return key;
  }
  if (!oldObj) {
    const changes = [];
    for (const key of Object.keys(newObj)) {
      if (skipKey(key)) continue;
      changes.push({ key: displayKey(key), oldVal: null, newVal: normalizeVal(key, newObj[key]) });
    }
    return changes.length > 0 ? changes : null;
  }
  const changes = [];
  // 只遍历新数据中的 key：新独有（null→值）算新增，旧独有（未在请求中发送）直接跳过
  const newKeys = Object.keys(newObj).filter(k => !skipKey(k));
  for (const key of newKeys) {
    const oldVal = normalizeVal(key, oldObj[key]);
    const newVal = normalizeVal(key, newObj[key]);
    if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
      changes.push({ key: displayKey(key), oldVal: oldObj[key], newVal: newObj[key] });
    }
  }
  return changes.length > 0 ? changes : null;
}

// 去除 HTML 标签，保留换行结构
function stripHtml(html) {
  if (!html || typeof html !== "string") return String(html ?? "");
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(p|div|h[1-6]|li|blockquote|pre|hr|table|tr|ul|ol)[^>]*>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function computeCharDiff(oldStr, newStr) {
  const o = stripHtml(String(oldStr ?? ""));
  const n = stripHtml(String(newStr ?? ""));
  if (o === n) return [{ type: "same", text: o }];

  // 短文本：完整 LCS 逐字 diff
  if (o.length <= 100 && n.length <= 100) {
    const m = o.length, len = n.length;
    const dp = Array.from({ length: m + 1 }, () => new Uint16Array(len + 1));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= len; j++) {
        dp[i][j] = o[i-1] === n[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
    const temp = [];
    let i = m, j = len;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && o[i-1] === n[j-1]) {
        temp.push({ type: "same", char: o[i-1] }); i--; j--;
      } else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) {
        temp.push({ type: "insert", char: n[j-1] }); j--;
      } else {
        temp.push({ type: "delete", char: o[i-1] }); i--;
      }
    }
    temp.reverse();
    const segs = [];
    for (const s of temp) {
      const last = segs[segs.length - 1];
      if (last && last.type === s.type) last.text += s.char;
      else segs.push({ type: s.type, text: s.char });
    }
    return segs;
  }

  // 长文本：截取差异区域前后各 50 字符上下文
  const CTX = 50;
  let samePrefix = 0;
  while (samePrefix < o.length && samePrefix < n.length && o[samePrefix] === n[samePrefix]) samePrefix++;
  let sameSuffix = 0;
  while (sameSuffix < o.length - samePrefix && sameSuffix < n.length - samePrefix &&
         o[o.length - 1 - sameSuffix] === n[n.length - 1 - sameSuffix]) sameSuffix++;

  const prefixStart = Math.max(0, samePrefix - CTX);
  const suffixEndOld = Math.min(o.length, o.length - sameSuffix + CTX);
  const suffixEndNew = Math.min(n.length, n.length - sameSuffix + CTX);
  const hasMoreLeft = prefixStart > 0;
  const hasMoreRight = o.length - sameSuffix + CTX < o.length || n.length - sameSuffix + CTX < n.length;

  const oldMid = o.slice(samePrefix, o.length - sameSuffix);
  const newMid = n.slice(samePrefix, n.length - sameSuffix);

  const result = [];
  if (samePrefix > 0) {
    const pre = o.slice(prefixStart, samePrefix);
    result.push({ type: "same", text: (hasMoreLeft ? "…" : "") + pre });
  }
  if (oldMid) result.push({ type: "delete", text: oldMid });
  if (newMid) result.push({ type: "insert", text: newMid });
  if (sameSuffix > 0) {
    const suf = o.slice(o.length - sameSuffix, suffixEndOld);
    result.push({ type: "same", text: suf + (hasMoreRight ? "…" : "") });
  }
  return result;
}
// 判断值是否为字符串类型（适合逐字 diff）
// 下拉选择类字段，使用删除+新增格式而非逐字 diff
const selectFields = new Set(["status", "visibility", "role", "categoryId", "tagIds"]);

function isDiffable(val) {
  if (val === null || val === undefined) return false;
  const s = String(val);
  return s.length > 0 && typeof val !== "object";
}
function formatDiffVal(val, key) {
  if (val === null || val === undefined) return "(空)";
  // categoryId/tagIds 解析为名称
  if (key === "categoryId" && val != null) {
    const id = typeof val === "object" ? val.id : Number(val);
    if (catMap.value[id]) return catMap.value[id];
  }
  if (key === "tagIds" && val != null) {
    // tagIds 可能是数组或逗号分隔的字符串
    const ids = Array.isArray(val) ? val : String(val).split(",").map(Number);
    const names = ids.map(id => tagMap.value[id] || id).filter(Boolean);
    return names.join(", ");
  }
  // visibility/status/role 值中文化
  if (key === "visibility") return visibilityLabelMap[String(val)] || String(val);
  if (key === "status") return statusLabelMap[String(val)] || String(val);
  if (key === "role") return roleLabelMap[String(val)] || String(val);
  if (typeof val === "object") return JSON.stringify(val);
  return String(val);
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
            <el-option label="通过" value="APPROVE" />
            <el-option label="驳回" value="REJECT" />
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
            <template v-if="detailRow.action === 'UPDATE'">
              <div v-if="updateDiff" style="font-size:13px;line-height:1.8;white-space:pre-wrap">
                <div v-for="c in updateDiff" :key="c.key" style="margin-bottom:4px">
                  <strong>{{ getFieldLabel(c.key) }}：</strong>
                  <template v-if="c.oldVal != null && c.newVal != null && (isDiffable(c.oldVal) || isDiffable(c.newVal)) && !selectFields.has(c.key) && c.key !== 'Logo URL'">
                    <template v-for="seg in computeCharDiff(String(c.oldVal ?? ''), String(c.newVal ?? ''))" :key="seg.type + seg.text">
                      <span v-if="seg.type === 'same'">{{ seg.text }}</span>
                      <span v-else-if="seg.type === 'delete'" style="color:#f56c6c;text-decoration:line-through">{{ seg.text }}</span>
                      <span v-else style="color:#67c23a;font-weight:bold">{{ seg.text }}</span>
                    </template>
                  </template>
                  <template v-else>
                    <span style="color:#f56c6c;text-decoration:line-through">{{ formatDiffVal(c.oldVal, c.key) }}</span>
                    <span style="margin:0 6px;color:#909399">→</span>
                    <span style="color:#67c23a;font-weight:bold">{{ formatDiffVal(c.newVal, c.key) }}</span>
                  </template>
                </div>
              </div>
              <div v-else style="color:#909399;font-size:13px">无字段变更</div>
            </template>
            <template v-else-if="logDesc">
              <span>{{ logDesc.prefix }}</span><span :style="{color:logDesc.nameColor,fontWeight:'bold'}">{{ logDesc.name }}</span>
              <template v-if="logDesc.suffixLabel">{{ logDesc.suffixLabel }}<span :style="{color:logDesc.suffixColor,fontWeight:'bold'}">{{ logDesc.suffixValue }}</span></template><span>{{ logDesc.suffix }}</span>
            </template>
            <pre v-else style="background:#f5f7fa;padding:10px 12px;border-radius:4px;font-size:13px;white-space:pre-wrap;word-break:break-all;max-height:200px;overflow:auto;margin:0">{{ detailRow.details || "无" }}</pre>
          </el-descriptions-item>          <el-descriptions-item label="时间">{{ (detailRow.createdAt || "").replace("T", " ").slice(0, 16) }}</el-descriptions-item>
          <el-descriptions-item label="请求路径" :span="2">{{ detailRow.path }}</el-descriptions-item>
        </el-descriptions>
      </template>
    </el-dialog>
  </div>
</template>
