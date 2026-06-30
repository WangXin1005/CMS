<!-- Setting — 站点设置页（仅 SUPERADMIN）：站点名称、描述、Logo 等配置 -->
<script lang="ts" setup>
/**
 * Setting — 站点设置页面
 * 读写 SiteSetting API，预设 key：site_name / site_description / site_logo / icp_number。需 auth 中间件保护。
 */
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '~/utils/request'
definePageMeta({ middleware: 'auth' })

const loading = ref(false)
const settings = ref<Record<string, string>>({
  site_name: '',
  site_description: '',
  site_logo: '',
  icp_number: '',
})
const settingKeys = [
  { key: 'site_name', label: '网站名称', type: 'text' },
  { key: 'site_description', label: '网站描述', type: 'textarea' },
  { key: 'site_logo', label: 'Logo URL', type: 'text' },
  { key: 'icp_number', label: '备案号', type: 'text' },
]

async function loadSettings() {
  try {
    const res = await request.get('/admin/settings')
    const list = res.data ?? []
    list.forEach((item: { settingKey: string; settingValue: string }) => {
      if (item.settingKey in settings.value)
        settings.value[item.settingKey] = item.settingValue ?? ''
    })
  } catch {
    /* ignore */
  }
}

async function saveSetting(key: string) {
  try {
    await request.put(`/admin/settings/${key}`, { value: settings.value[key] })
    ElMessage.success('保存成功')
  } catch {
    ElMessage.error('保存失败')
  }
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
  } catch {
    ElMessage.error('保存失败')
  } finally {
    loading.value = false
  }
}

onMounted(loadSettings)
</script>

<template>
  <div>
    <div class="page-header">
      <h2>站点设置</h2>
      <el-button type="primary" :loading="loading" @click="saveAll">保存全部</el-button>
    </div>
    <div class="page-card">
      <el-form label-width="120px" style="max-width: 640px">
        <el-form-item v-for="s in settingKeys" :key="s.key" :label="s.label">
          <el-input
            v-if="s.type === 'text'"
            v-model="settings[s.key]"
            :placeholder="`请输入${s.label}`"
          />
          <el-input
            v-else
            v-model="settings[s.key]"
            type="textarea"
            :rows="3"
            :placeholder="`请输入${s.label}`"
          />
          <el-button link type="primary" style="margin-left: 8px" @click="saveSetting(s.key)"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
