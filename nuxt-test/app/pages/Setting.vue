<!-- Setting -- 站点设置页（仅 SUPERADMIN）：站点名称、描述、Logo 等配置 -->
<script lang="ts" setup>
/**
 * Setting -- 站点设置页面
 * 读写 SiteSetting API，预设 key：site_name / site_description / site_logo / icp_number。需 auth 中间件保护。
 */
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '~/utils/request'
import { useMedia } from '~/composables/useMedia'
definePageMeta({ middleware: 'auth' })

const loading = ref(false)
const { getList: getMediaList } = useMedia()
const mediaDialogVisible = ref(false)
const mediaList = ref([])
const mediaLoading = ref(false)

async function openMediaPicker() {
  mediaDialogVisible.value = true
  mediaLoading.value = true
  try {
    const res = await getMediaList()
    mediaList.value = Array.isArray(res) ? res.filter(m => m.mimeType && m.mimeType.startsWith('image/')) : []
  } catch { mediaList.value = [] }
  finally { mediaLoading.value = false }
}

function selectMedia(url) {
  settings.value.site_logo = url
  mediaDialogVisible.value = false
}

const settings = ref<Record<string, string>>({
  site_name: '',
  site_description: '',
  site_logo: '',
  icp_number: '',
})
const settingKeys = [
  { key: 'site_name', label: '网站名称', type: 'text' },
  { key: 'site_description', label: '网站描述', type: 'textarea' },
  { key: 'site_logo', label: 'Logo', type: 'image' },
  { key: 'icp_number', label: '备案号', type: 'text' },
]

async function loadSettings() {
  try {
    const res = await request.get('/admin/settings')
    const list = res.data ?? []
    list.forEach((item) => {
      if (item.settingKey in settings.value)
        settings.value[item.settingKey] = item.settingValue ?? ''
    })
  } catch { /* ignore */ }
}

async function saveSetting(key) {
  try {
    await request.put(`/admin/settings/${key}`, { value: settings.value[key] })
    ElMessage.success('保存成功')
  } catch { /* 拦截器已处理 */ }
}

async function saveAll() {
  loading.value = true
  try {
    await Promise.all(
      settingKeys.map((s) =>
        request.put(`/admin/settings/${s.key}`, { value: settings.value[s.key] }),
      ),
    )
    ElMessage.success('全部设置已保存')
  } catch { /* 拦截器已处理 */ }
  finally { loading.value = false }
}

onMounted(loadSettings)
</script>

<template>
  <div style="flex:1; min-height:0; display:flex; flex-direction:column">
    <div class="page-header">
      <h2>站点设置</h2>
      <el-button type="primary" :loading="loading" @click="saveAll">保存全部</el-button>
    </div>
    <div class="page-card" style="flex:1; min-height:0; overflow:auto">
      <el-form label-width="120px" style="max-width: 640px">
        <el-form-item v-for="s in settingKeys" :key="s.key" :label="s.label">
          <el-input
            v-if="s.type === 'text'"
            v-model="settings[s.key]"
            :placeholder="`请输入${s.label}`"
          />
          <el-input
            v-else-if="s.type === 'textarea'"
            v-model="settings[s.key]"
            type="textarea"
            :rows="3"
            :placeholder="`请输入${s.label}`"
          />
          <template v-else-if="s.type === 'image'">
            <div style="display:flex;align-items:center;gap:8px;width:100%">
              <el-input v-model="settings[s.key]" placeholder="点击右侧按钮选择图片" readonly style="flex:1" />
              <el-button @click="openMediaPicker" style="flex-shrink:0">选择</el-button>
            </div>
            <img v-if="settings[s.key]" :src="settings[s.key]" style="max-width:200px;max-height:80px;margin-top:8px;border-radius:4px;border:1px solid #e8e8e8" />
          </template>
          <el-button link type="primary" style="margin-left:8px" @click="saveSetting(s.key)">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog v-model="mediaDialogVisible" title="选择图片" width="700" destroy-on-close>
      <div v-loading="mediaLoading" style="display:flex;flex-wrap:wrap;gap:12px;min-height:100px">
        <el-empty v-if="!mediaLoading && mediaList.length === 0" description="暂无图片" />
        <div
          v-for="m in mediaList"
          :key="m.id"
          style="width:140px;cursor:pointer;border:2px solid transparent;border-radius:8px;overflow:hidden;transition:all .2s"
          :style="{ borderColor: settings.site_logo === m.url ? '#409eff' : 'transparent' }"
          @click="selectMedia(m.url)"
        >
          <img :src="m.url" style="width:100%;height:100px;object-fit:cover;display:block" />
          <div style="padding:4px 8px;font-size:12px;color:#666;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ m.originalName || m.filename }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
