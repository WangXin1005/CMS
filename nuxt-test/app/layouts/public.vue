<template>
  <div class="public-layout">
    <header class="public-header">
      <div class="header-inner">
        <NuxtLink to="/" class="logo">
          <span class="logo-icon">📝</span>
          <span class="logo-text">CodeBlog</span>
        </NuxtLink>
        <nav class="nav-links">
          <!-- SSR 时始终显示登录按钮，客户端水合后根据 auth 状态切换 -->
          <NuxtLink to="/login" class="nav-item login-btn">登录后台</NuxtLink>
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
    <main class="main-area">
      <slot />
    </main>
    <footer class="public-footer">
      <p>&copy; 2026 CodeBlog. Powered by Nuxt &amp; Spring Boot.</p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const { username, isLoggedIn } = useAuth()
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
.logo-icon { font-size: 24px; }
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
  &:hover { color: #667eea; background: #f5f5f5; }
}
.logged-in-hint {
  color: #999;
  font-size: 13px;
  cursor: default;
}
.logged-in-hint:hover { color: #999; background: transparent; }
.admin-btn {
  background: #52c41a;
  color: #fff !important;
}
.admin-btn:hover { opacity: 0.9; background: #52c41a; }
.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff !important;
  &:hover { opacity: 0.9; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
}
.main-area { flex: 1; }
.public-footer {
  text-align: center;
  padding: 24px;
  color: #999;
  font-size: 13px;
  border-top: 1px solid #e8e8e8;
  margin-top: 40px;
  background: #fff;
  p { margin: 0; }
}
</style>
