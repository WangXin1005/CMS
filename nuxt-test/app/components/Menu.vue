<!-- Menu — 管理后台侧边菜单，根据角色动态显示菜单项 -->
<template>
  <div class="menu-container">
    <div class="menu-logo">
      <span class="logo-icon"><img v-if="siteLogo" :src="siteLogo" class="logo-img" alt="logo" /><span v-else class="logo-emoji">📝</span></span>
      <span class="logo-text">{{ siteName }}</span>
    </div>
    <el-menu
      :router="true"
      :default-active="route.path"
      background-color="#1e1e2d"
      text-color="#a2a3b7"
      active-text-color="#fff"
      class="side-menu" style="width:100%;border-right:none"
    >
      <el-menu-item index="/home">
        <el-icon><HomeFilled /></el-icon>
        <span>仪表盘</span>
      </el-menu-item>
      <el-menu-item index="/articles">
        <el-icon><Document /></el-icon>
        <span>文章管理</span>
      </el-menu-item>
      <el-menu-item index="/categories">
        <el-icon><Folder /></el-icon>
        <span>分类管理</span>
      </el-menu-item>
      <el-menu-item index="/tags">
        <el-icon><PriceTag /></el-icon>
        <span>标签管理</span>
      </el-menu-item>
      <el-menu-item v-if="isAdmin" index="/comments">
        <el-icon><ChatDotRound /></el-icon>
        <span>评论管理</span>
      </el-menu-item>
      <el-menu-item v-if="isNotGuest" index="/media">
        <el-icon><Picture /></el-icon>
        <span>媒体管理</span>
      </el-menu-item>
      <el-menu-item v-if="isAdmin" index="/user">
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item v-if="isSuperAdmin" index="/setting">
        <el-icon><Setting /></el-icon>
        <span>站点设置</span>
      </el-menu-item>
      <el-menu-item v-if="isAdmin" index="/logs">
        <el-icon><List /></el-icon>
        <span>操作日志</span>
      </el-menu-item>
    </el-menu>
    
  </div>
</template>

<script lang="ts" setup>
import {
  HomeFilled,
  Document,
  Folder,
  PriceTag,
  ChatDotRound,
  Picture,
  User,
  Setting,
  View,
  List,
} from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue'
const route = useRoute()

// 站点设置
const siteLogo = ref('')
const siteName = ref('CodeBlog')

onMounted(async () => {
  try {
    const res = await fetch('/api/public/settings')
    const list = await res.json()
    if (Array.isArray(list)) {
      list.forEach((item: any) => {
        if (item.settingKey === 'site_logo') siteLogo.value = item.settingValue || ''
        if (item.settingKey === 'site_name') siteName.value = item.settingValue || 'CodeBlog'
      })
    }
  } catch { /* keep defaults */ }
})
const { role } = useAuth()
const isAdmin = computed(() => role.value === 'SUPERADMIN' || role.value === 'ADMIN')
const isNotGuest = computed(() => role.value !== 'GUEST')
const isSuperAdmin = computed(() => role.value === 'SUPERADMIN')
</script>

<style lang="less" scoped>
.menu-container {
  width: 220px;
  min-width: 220px;
  height: 100%;
  background: #1e1e2d;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.menu-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 22px 20px;
  border-bottom: 1px solid #2a2a3d;
  flex-shrink: 0;
}
.logo-icon {
  font-size: 24px;
  display: flex;
  align-items: center;
}
.logo-img {
  height: 28px;
  width: auto;
}
.logo-emoji {
  line-height: 1;
}
.logo-text {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
}.side-menu::-webkit-scrollbar {
  width: 4px;
}
.side-menu::-webkit-scrollbar-thumb {
  background: #2a2a3d;
  border-radius: 2px;
}
</style>