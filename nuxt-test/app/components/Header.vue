<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'

const { username, logout } = useAuth()
const route = useRoute()

const pageTitleMap: Record<string, string> = {
  '/home': '仪表盘',
  '/articles': '文章管理',
  '/articles/create': '创建文章',
  '/categories': '分类管理',
  '/tags': '标签管理',
  '/comments': '评论管理',
  '/media': '媒体管理',
  '/user': '用户管理',
  '/setting': '站点设置',
}

const currentTitle = computed(() => {
  const path = route.path
  // Check exact match first
  if (pageTitleMap[path]) return pageTitleMap[path]
  // Check prefix match for edit pages
  if (path.startsWith('/articles/edit/')) return '编辑文章'
  return '系统管理'
})
</script>

<template>
  <el-header class="admin-header">
    <div class="header-left">
      <span class="header-title">{{ currentTitle }}</span>
    </div>
    <div class="header-right">
      <el-dropdown trigger="click" @command="logout">
        <span class="user-info">
          <el-avatar :size="32" class="user-avatar">{{ username?.charAt(0)?.toUpperCase() }}</el-avatar>
          <span class="username">{{ username }}</span>
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style lang="less" scoped>
.admin-header {
  height: 56px !important;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px !important;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-title {
  font-size: 17px;
  font-weight: 600;
  color: #1a1a1a;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }
}

.user-avatar {
  background: #409eff;
  color: #fff;
  font-weight: 600;
}

.username {
  font-size: 14px;
  color: #555;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
