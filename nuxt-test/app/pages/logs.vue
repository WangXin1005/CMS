<script lang="ts" setup>
/**
 * logs - 操作日志页面
 * 分页展示操作日志，支持按用户名、操作类型、操作对象筛选。
 */
definePageMeta({ middleware: 'auth' })
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const { getLogs } = useLog()
const { getList: getCatList } = useCategory()
const { getList: getTagList } = useTag()

const logs = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const filterUsername = ref('')
const filterAction = ref('')
const filterEntity = ref('')

const catMap = ref<Record<number, string>>({})
const tagMap = ref<Record<number, string>>({})

const actionWeight: Record<string, { weight: number; type: string; label: string }> = {
  DELETE: { weight: 5, type: "danger", label: "删除" },
  CREATE: { weight: 4, type: "success", label: "创建" },
  UPDATE: { weight: 3, type: "warning", label: "修改" },
  LOGOUT: { weight: 2, type: "info", label: "退出" },
  LOGIN:  { weight: 1, type: "info", label: "登录" },
  OTHER:  { weight: 0, type: "",      label: "其他" },
}

function actionStyle(action: string) {
  const w = (actionWeight[action] || {}).weight ?? 0
  const opacity = [0.55, 0.65, 0.8, 1, 1, 1][w] ?? 0.6
  const fontWeight = w >= 4 ? 700 : w >= 3 ? 600 : 400
  return { opacity, fontWeight }
}

const actionMap: Record<string, string> = {
  CREATE: '创建', UPDATE: '修改', DELETE: '删除',
  LOGIN: '登录', LOGOUT: '退出', OTHER: '其他'
}

const detailDialogVisible = ref(false)
const detailRow = ref<any>(null)

function showDetail(row: any) {
  detailRow.value = row
  detailDialogVisible.value = true
}

function parseData(details: string): { summary: string; data: string } {
  if (!details) return { summary: "", data: "" }
  const idx = details.indexOf(" | 数据:")
  if (idx === -1) return { summary: details, data: "" }
  return {
    summary: details.substring(0, idx),
    data: details.substring(idx + 6).trim()
  }
}

/** 去除 HTML 标签，保留纯文本用于 diff 对比 */
function stripHtml(html: string | null): string | null {
  if (!html) return html;
  return html.replace(/<[^>]*>/g, "").trim();
}


/** 基于 LCS 的统一 diff：返回单行段落，公共部分灰色、删除部分红色粗体、新增部分绿色粗体 */
function computeUnifiedDiff(oldStr, newStr) {
  if (oldStr === newStr) return [{ type: 'text', text: newStr }];
  const m = oldStr.length, n = newStr.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = oldStr[i - 1] === newStr[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const segments = [];
  let i = m, j = n;
  const temp = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldStr[i - 1] === newStr[j - 1]) {
      temp.push({ type: 'text', char: oldStr[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      temp.push({ type: 'add', char: newStr[j - 1] });
      j--;
    } else {
      temp.push({ type: 'del', char: oldStr[i - 1] });
      i--;
    }
  }
  temp.reverse();
  let curType = temp[0]?.type, curText = '';
  for (const item of temp) {
    if (item.type === curType) { curText += item.char; }
    else {
      if (curText) segments.push({ type: curType, text: curText });
      curType = item.type; curText = item.char;
    }
  }
  if (curText) segments.push({ type: curType, text: curText });
  return segments;
}

interface FieldItem {
  label: string
  oldVal: string | null
  newVal: string
  diff: any
  isHtml?: boolean
  isOldHtml?: boolean
}

/** 字段名中文映射 */
const fieldLabels: Record<string, string> = {
  title: "标题", slug: "标识", content: "内容", summary: "摘要",
  coverImage: "封面", status: "状态", categoryId: "分类", tagIds: "标签",
  name: "名称", description: "描述", sortOrder: "排序",
  username: "用户名", email: "邮箱", password: "密码", role: "角色",
  oldPassword: "原密码", newPassword: "新密码"
}

function resolveLabel(key: string, val: string | null): string | null {
  if (val === null || val === undefined) return null;
  if (key === "categoryId") { if (!val || val === "0" || val === "null") return null; return catMap.value[Number(val)] || val; }
  if (key === "tagIds") {
    if (!val || val === "[]" || val === "") return null;
    let ids: number[] = [];
    try { ids = JSON.parse(val); } catch {}
    if (!Array.isArray(ids) || ids.length === 0) {
      ids = val.split(",").map(s => Number(s.trim())).filter(n => !isNaN(n));
    }
    if (ids.length > 0) return ids.map(id => tagMap.value[id] || String(id)).join(", ");
    return val;
  }
  return val;
}

function parseDataFields(details: string): { fields: FieldItem[]; hasOld: boolean } | null {
  const { data } = parseData(details)
  if (!data) return null
  const fields: FieldItem[] = []
  let hasOld = false

  try {
    const parsed = JSON.parse(data)
    if (parsed.o || parsed.n) {
      hasOld = true
      const o = parsed.o || {}
      const n = parsed.n || {}
      const keys = new Set([...Object.keys(o), ...Object.keys(n)])
      const skip = new Set(["id", "createdAt", "updatedAt", "author", "category", "tags"])
      for (const key of keys) {
        if (skip.has(key)) continue
        const rawOld = o[key] !== undefined ? String(o[key]) : null
        const rawNew = n[key] !== undefined ? String(n[key]) : null
        if (rawNew === null) continue
        const isHtml = key === "content"
        const displayOld = isHtml ? stripHtml(rawOld) : resolveLabel(key, rawOld)
        const displayNew = isHtml ? stripHtml(rawNew) : resolveLabel(key, rawNew)
        if (displayNew === null) continue
        if (displayOld !== null && displayOld === displayNew) continue
        let diff = null
        if (displayOld !== null && displayNew !== null && displayOld !== displayNew && (displayNew.length > 10 || displayOld.length > 10)) {
          diff = computeUnifiedDiff(displayOld, displayNew)
        }
        fields.push({ label: fieldLabels[key] || key, oldVal: isHtml ? rawOld : displayOld, newVal: isHtml ? rawNew : displayNew, diff, isHtml })
      }
    } else {
      const skip = new Set(["id", "createdAt", "updatedAt", "author", "category", "tags"])
      for (const [key, val] of Object.entries(parsed)) {
        if (skip.has(key)) continue
        const rawVal = val === null ? "" : typeof val === "object" ? JSON.stringify(val) : String(val)
        const isHtml = key === "content"
        const newVal = isHtml ? rawVal : resolveLabel(key, rawVal)
        if (newVal === null) continue
        fields.push({ label: fieldLabels[key] || key, oldVal: null, newVal, diff: null, isHtml })
      }
    }
  } catch {
    return null
  }

  return fields.length > 0 ? { fields, hasOld } : null
}

async function loadCatTag() {
  try {
    const cats = await getCatList();
    const tags = await getTagList();
    if (Array.isArray(cats)) cats.forEach(cat => catMap.value[cat.id] = cat.name);
    if (Array.isArray(tags)) tags.forEach(tag => tagMap.value[tag.id] = tag.name);
  } catch {}
}

async function loadData() {
  loading.value = true
  try {
    const res = await getLogs(currentPage.value, pageSize.value, {
      username: filterUsername.value || undefined,
      action: filterAction.value || undefined,
      entity: filterEntity.value || undefined,
    })
    logs.value = res.content ?? []
    total.value = res.totalElements ?? 0
  } catch {
    logs.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

function onFilter() { currentPage.value = 1; loadData() }

onMounted(() => { loadData(); loadCatTag(); })
</script>

<template>
  <div>
    <div class="page-header">
      <h2>操作日志</h2>
    </div>
    <div class="page-card">
      <div class="filter-bar">
        <el-input v-model="filterUsername" placeholder="用户名" clearable style="width:140px" @clear="onFilter" @keyup.enter="onFilter" />
        <el-select v-model="filterAction" placeholder="操作类型" clearable style="width:120px" @change="onFilter">
          <el-option label="创建" value="CREATE" />
          <el-option label="修改" value="UPDATE" />
          <el-option label="删除" value="DELETE" />
          <el-option label="登录" value="LOGIN" />
          <el-option label="退出" value="LOGOUT" />
          <el-option label="其他" value="OTHER" />
        </el-select>
        <el-select v-model="filterEntity" placeholder="操作对象" clearable style="width:120px" @change="onFilter">
          <el-option label="文章" value="Article" />
          <el-option label="分类" value="Category" />
          <el-option label="标签" value="Tag" />
          <el-option label="用户" value="User" />
          <el-option label="评论" value="Comment" />
          <el-option label="媒体" value="Media" />
          <el-option label="站点设置" value="SiteSetting" />
        </el-select>
        <el-button type="primary" @click="onFilter">筛选</el-button>
      </div>

      <el-table :data="logs" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="55" align="center" :index="(currentPage - 1) * pageSize + 1" />
        <el-table-column prop="username" label="用户名" width="170" align="center" header-align="center" />
        <el-table-column label="操作类型" width="160" align="center" header-align="center">
          <template #default="{ row }">
            <el-tag
              :type="row.action === 'DELETE' ? 'danger' : row.action === 'CREATE' ? 'success' : row.action === 'UPDATE' ? 'warning' : 'info'"
              :style="actionStyle(row.action)"
              size="small" effect="dark">{{ actionMap[row.action] || row.action }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="entity" label="操作对象" width="200" align="center" header-align="center" />
        <el-table-column prop="entityId" label="对象ID" width="110" align="center" header-align="center" />
        <el-table-column label="结果" width="100" align="center" header-align="center">
          <template #default="{ row }">
            <el-tag :type="row.result === 'SUCCESS' ? 'success' : 'danger'" size="small" effect="plain">
              {{ row.result === 'SUCCESS' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="clientIp" label="IP地址" width="160" align="center" header-align="center" />
        <el-table-column label="时间" width="180" align="center" header-align="center">
          <template #default="{ row }">
            {{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center" header-align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="showDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 16px; display: flex; justify-content: flex-end">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total" layout="prev, pager, next, total" background
          @current-change="loadData" />
      </div>
    </div>

    <el-dialog v-model="detailDialogVisible" title="日志详情" width="650px" :close-on-click-modal="false">
      <template v-if="detailRow">
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="用户名">{{ detailRow.username }}</el-descriptions-item>
          <el-descriptions-item label="操作类型">
            <el-tag :type="detailRow.action === 'DELETE' ? 'danger' : detailRow.action === 'CREATE' ? 'success' : 'primary'" size="small" effect="dark">{{ actionMap[detailRow.action] || detailRow.action }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="操作对象">{{ detailRow.entity }}</el-descriptions-item>
          <el-descriptions-item label="对象ID">{{ detailRow.entityId ?? '-' }}</el-descriptions-item>
          <el-descriptions-item label="请求路径" :span="2">{{ detailRow.path }}</el-descriptions-item>
          <el-descriptions-item label="结果">{{ detailRow.result === 'SUCCESS' ? '成功' : '失败' }}</el-descriptions-item>
          <el-descriptions-item label="IP地址">{{ detailRow.clientIp || '-' }}</el-descriptions-item>
          <el-descriptions-item label="时间" :span="2">{{ (detailRow.createdAt || "").replace("T", " ").slice(0, 16) }}</el-descriptions-item>
          <el-descriptions-item v-if="detailRow.errorMsg" label="错误信息" :span="2">
            <span style="color:#f56c6c">{{ detailRow.errorMsg }}</span>
          </el-descriptions-item>
        </el-descriptions>

        <div v-if="parseData(detailRow.details).data" style="margin-top:16px">
          <h4 style="margin:0 0 12px;font-size:14px;color:#333">操作数据</h4>
          <template v-if="parseDataFields(detailRow.details)">
            <template v-if="parseDataFields(detailRow.details)!.hasOld">
              <el-descriptions :column="1" border size="small">
                <el-descriptions-item v-for="(field, i) in parseDataFields(detailRow.details)!.fields" :key="i" :label="field.label">
                  <template v-if="field.diff">
                    <div class="diff-block">
                      <div v-if="!field.isHtml"><span v-for="(seg, si) in field.diff" :key="si" :class="'diff-' + seg.type + '-text'">{{ seg.text }}</span></div>
                    <div v-else><span v-for="(seg, si) in field.diff" :key="si" :class="'diff-' + seg.type + '-text'" v-html="seg.text"></span></div>
                    </div>
                  </template>
                  <template v-else-if="field.oldVal !== null">
                    <div class="diff-block">
                      <div v-if="!field.isHtml"><span class="diff-del-text">{{ field.oldVal }}</span></div>
                      <div v-else><span class="diff-del-text" v-html="field.oldVal"></span></div>
                      <div v-if="!field.isHtml"><span class="diff-add-text">{{ field.newVal }}</span></div>
                      <div v-else><span class="diff-add-text" v-html="field.newVal"></span></div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="diff-block" v-if="!field.isHtml"><span class="diff-add-text">{{ field.newVal }}</span></div>
                  <div class="diff-block" v-else><span class="diff-add-text" v-html="field.newVal"></span></div>
                  </template>
                </el-descriptions-item>
              </el-descriptions>
            </template>
            <template v-else>
              <el-descriptions :column="1" border size="small">
                <el-descriptions-item v-for="(field, i) in parseDataFields(detailRow.details)!.fields" :key="i" :label="field.label">
                  <span v-if="!field.isHtml" style="color:#333;word-break:break-all">{{ field.newVal }}</span>
                  <span v-else style="color:#333;word-break:break-all" v-html="field.newVal"></span>
                </el-descriptions-item>
              </el-descriptions>
            </template>
          </template>
          <template v-else>
            <div style="font-size:13px;line-height:1.8;white-space:pre-wrap;word-break:break-all;color:#333;padding:8px 0">
              {{ parseData(detailRow.details).data }}
            </div>
          </template>
        </div>
      </template>
      <template #footer>
        <el-button @click="detailDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

/* el-descriptions 标签列样式 */
.el-descriptions__label {
  white-space: nowrap;
  min-width: 80px;
  font-weight: 500;
}

/* 操作数据差异展示容器 */
.diff-block {
  font-size: 13px;
  line-height: 1.8;
  font-family: ui-monospace, SFMono, Consolas, monospace;
  word-break: break-all;
}
.diff-block .diff-text {
  color: #606266;
}
.diff-block .diff-del-text {
  color: #f56c6c;
  font-weight: 700;
}
.diff-block .diff-add-text {
  color: #67c23a;
  font-weight: 700;
}

</style>