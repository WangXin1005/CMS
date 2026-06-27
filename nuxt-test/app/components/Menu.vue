<template>
  <div class="menu-container">
    <div class="menu-logo">
      <span class="logo-icon">📝</span>
      <span class="logo-text">CodeBlog</span>
    </div>
    <el-menu
      :router="true"
      :default-active="route.path"
      background-color="#1e1e2d"
      text-color="#a2a3b7"
      active-text-color="#fff"
      class="side-menu"
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
      <el-menu-item index="/comments">
        <el-icon><ChatDotRound /></el-icon>
        <span>评论管理</span>
      </el-menu-item>
      <el-menu-item index="/media">
        <el-icon><Picture /></el-icon>
        <span>媒体管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <el-icon><User /></el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <el-icon><Setting /></el-icon>
        <span>站点设置</span>
      </el-menu-item>
      <el-menu-item index="/logs">
        <el-icon><List /></el-icon>
        <span>操作日志</span>
      </el-menu-item>

      <!-- 返回博客首页 -->
      <div class="menu-footer">
        <el-divider style="margin:8px 16px;border-color:#2a2a3d" />
        <el-menu-item index="/" class="back-to-site">
          <el-icon><View /></el-icon>
          <span>返回博客</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import {
  HomeFilled, Document, Folder, PriceTag,
  ChatDotRound, Picture, User, Setting, View, List
} from '@element-plus/icons-vue'
const route = useRoute()
</script>

<style lang="less" scoped>
.menu-container {
  width: 220px;
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
  padding: 20px 20px 16px;
  border-bottom: 1px solid #2a2a3d;
}
.logo-icon { font-size: 22px; }
.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}
.side-menu {
  flex: 1;
  overflow-y: auto;
  border-right: none !important;
  padding: 8px 0;
}
.side-menu .el-menu-item {
  height: 44px;
  line-height: 44px;
  margin: 2px 8px;
  border-radius: 8px;
  padding: 0 12px !important;

  &:hover {
    background: #2a2a3d !important;
    color: #fff !important;
  }

  &.is-active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    color: #fff !important;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
}
.menu-footer {
  margin-top: auto;
  padding-bottom: 8px;
}
.back-to-site {
  margin: 2px 8px;
  border-radius: 8px;
}
.side-menu::-webkit-scrollbar { width: 4px; }
.side-menu::-webkit-scrollbar-thumb { background: #2a2a3d; border-radius: 2px; }
</style>
