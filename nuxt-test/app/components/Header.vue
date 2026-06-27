<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const { username, role, logout, changePassword } = useAuth()
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
  '/logs': '操作日志',
}

const currentTitle = computed(() => {
  const path = route.path
  if (pageTitleMap[path]) return pageTitleMap[path]
  if (path.startsWith('/articles/edit/')) return '编辑文章'
  return '系统管理'
})

// 修改密码弹窗
const dialogVisible = ref(false)
const passwordForm = ref({ oldPassword: '', newPassword: '', confirmPassword: '' })
const passwordLoading = ref(false)

function openDialog() {
  passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
  dialogVisible.value = true
}

async function handleChangePassword() {
  if (!passwordForm.value.oldPassword || !passwordForm.value.newPassword) {
    ElMessage.warning('请填写完整信息')
    return
  }
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }
  passwordLoading.value = true
  try {
    await changePassword({ oldPassword: passwordForm.value.oldPassword, newPassword: passwordForm.value.newPassword })
    ElMessage.success('密码修改成功')
    dialogVisible.value = false
  } catch (e) {
    ElMessage.error(e.response?.data?.message || '密码修改失败')
  } finally {
    passwordLoading.value = false
  }
}

function handleCommand(command: string) {
  // 清除下拉菜单项残留的 focus 状态
  ;(document.activeElement as HTMLElement)?.blur?.()
  if (command === 'setting') {
    openDialog()
  } else if (command === 'logout') {
    logout()
  }
}
</script>

<template>
  <el-header class="admin-header">
    <div class="header-left">
      <span class="header-title">{{ currentTitle }}</span>
    </div>
    <div class="header-right">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="user-info">
          <el-avatar :size="32" class="user-avatar">{{ username?.charAt(0)?.toUpperCase() }}</el-avatar>
          <span class="username">{{ username }}</span>
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-item command="setting">个人设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </el-header>

  <!-- 修改密码弹窗 -->
  <el-dialog v-model="dialogVisible" title="个人设置" width="420px">
    <el-form label-position="top" @submit.prevent="handleChangePassword">
      <el-form-item label="用户名">
        <el-input :model-value="username" disabled />
      </el-form-item>
      <el-form-item label="角色">
        <el-tag>{{ role }}</el-tag>
      </el-form-item>
      <el-divider />
      <el-form-item label="原密码">
        <el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入原密码" show-password />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" show-password />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="请再次输入新密码" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" :loading="passwordLoading" @click="handleChangePassword">确认修改</el-button>
    </template>
  </el-dialog>
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

<style>
.el-dropdown-menu__item {
  border-radius: 6px !important;
  margin: 2px 4px;
}
</style>





















