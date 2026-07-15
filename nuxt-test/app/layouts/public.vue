<template>
  <div class="public-layout">
    <header class="public-header">
      <div class="header-inner">
        <NuxtLink to="/" class="logo">
          <span class="logo-icon"><img v-if="siteLogo" :src="siteLogo" class="logo-img" alt="logo" /><span v-else class="logo-emoji">&#x1F4DD;</span></span>
          <span class="logo-text">{{ siteName }}</span>
        </NuxtLink>
        <nav class="nav-links">
          <ClientOnly>
            <template v-if="isLoggedIn">
              <span class="nav-item logged-in-hint">{{ username }}</span>
              <NuxtLink to="/home" class="nav-item admin-btn">管理后台</NuxtLink>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="nav-item login-btn">登录后台</NuxtLink>
            </template>
          </ClientOnly>
        </nav>
      </div>
    </header>
    <main class="main-area"><slot /></main>
    <footer class="blog-footer">
      <p>&copy; 2026 {{ siteName }}. Powered by Nuxt &amp; Spring Boot.</p>
      <p v-if="icpNumber" class="icp-text">{{ icpNumber }}</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
const { username, isLoggedIn } = useAuth()

const siteLogo = ref('')
const siteName = ref('CodeBlog')
const siteDesc = ref('基于 Nuxt + Spring Boot 构建的博客 CMS 系统')
const icpNumber = ref('蒙ICP备2026006795号-1')

// 向子页面提供站点设置（供页脚使用）
const siteSettings = computed(() => ({
  siteName: siteName.value,
  siteLogo: siteLogo.value,
  icpNumber: icpNumber.value,
}))
provide('siteSettings', siteSettings)

onMounted(async () => {
  try {
    const res = await fetch('/api/public/settings')
    const list = await res.json()
    if (Array.isArray(list)) {
      list.forEach((item: any) => {
        if (item.settingKey === 'site_logo') siteLogo.value = item.settingValue || ''
        if (item.settingKey === 'site_name') siteName.value = item.settingValue || 'CodeBlog'
        if (item.settingKey === 'site_description') siteDesc.value = item.settingValue || ''
        if (item.settingKey === 'icp_number') icpNumber.value = item.settingValue || ''
      })
    }
  } catch { /* keep defaults */ }
})

useHead({
  title: computed(() => siteName.value),
  meta: [{ name: 'description', content: computed(() => siteDesc.value) }]
})
</script>

<style lang="less" scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}
.public-header {
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}
.logo-icon {
  font-size: 24px;
  display: flex;
  align-items: center;
}
.logo-img {
  height: 28px;
  width: auto;
  object-fit: contain;
}
.logo-emoji {
  line-height: 1;
}
.logo-text {
  font-size: 22px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nav-item {
  text-decoration: none;
  color: #555;
  font-size: 14px;
  padding: 8px 18px;
  border-radius: 6px;
  transition: all 0.2s;
  font-weight: 500;
  &:hover {
    color: #667eea;
    background: #f5f5f5;
  }
}
.logged-in-hint {
  color: #999;
  font-size: 13px;
  cursor: default;
}
.logged-in-hint:hover {
  color: #999;
  background: transparent;
}
.admin-btn {
  background: #52c41a;
  color: #fff !important;
}
.admin-btn:hover {
  opacity: 0.9;
  background: #52c41a;
}
.login-btn-placeholder {
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  padding: 8px 18px;
  border-radius: 6px;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.7;
  cursor: default;
}
.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff !important;
  &:hover {
    opacity: 0.9;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
}
.main-area {
  flex: 1;
}


.blog-footer {
  text-align: center;
  padding: 24px 0;
  color: #999;
  font-size: 13px;
  border-top: 1px solid #e8e8e8;
  margin-top: auto;
}

.blog-footer p {
  margin: 0;
}

.icp-text {
  margin-top: 4px;
  font-size: 12px;
  color: #bbb;
}
</style>
