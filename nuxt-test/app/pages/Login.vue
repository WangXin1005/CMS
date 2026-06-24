<script lang="ts" setup>
/**
 * 登录页面
 * 三种模式：
 *   1. checking - 正在检查系统是否已初始化（加载中）
 *   2. init - 首次部署时创建超级管理员
 *   3. login / register - 正常登录或访客注册
 * 使用 blank 布局（居中卡片）
 */
definePageMeta({ layout: 'blank' })
import { ref, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { validatePassword } from '~/utils/password'
import { validateUsername } from '~/utils/username'
import { validateEmail } from '~/utils/email'

const { login, registerGuest, checkSuperAdmin, initSuperAdmin, hasSuperAdmin, checking, checkUsername } = useAuth()

const mode = ref('checking')
const loginForm = ref({ username: '', password: '' })
const registerForm = ref({ username: '', email: '', password: '', confirmPassword: '' })
const loginLoading = ref(false)
const registerLoading = ref(false)
const initLoading = ref(false)
const showRegister = ref(false)
const rememberMe = ref(false)

// 校验错误
const initUsernameError = ref('')
const initEmailError = ref('')
const initPasswordError = ref('')
const initConfirmError = ref('')
const regUsernameError = ref('')
const regEmailError = ref('')
const regPasswordError = ref('')
const regConfirmError = ref('')

// 用户名变更时取消记住账号
watch(() => loginForm.value.username, (newVal) => {
  if (rememberMe.value && newVal !== localStorage.getItem('remembered_username')) {
    rememberMe.value = false
    localStorage.removeItem('remembered_username')
  }
})

onMounted(async () => {
  await checkSuperAdmin()
  mode.value = hasSuperAdmin.value ? 'login' : 'init'
  const saved = localStorage.getItem('remembered_username')
  if (saved) {
    loginForm.value.username = saved
    rememberMe.value = true
  }
})

// ===== 初始化表单校验 =====

async function onInitUsernameBlur() {
  const err = validateUsername(registerForm.value.username)
  initUsernameError.value = err || ''
  if (!err && registerForm.value.username) {
    const taken = await checkUsername(registerForm.value.username)
    if (taken) initUsernameError.value = '用户名已被使用'
  }
}

function onInitEmailBlur() {
  initEmailError.value = validateEmail(registerForm.value.email) || ''
}

function onInitPasswordBlur() {
  initPasswordError.value = validatePassword(registerForm.value.password) || ''
  if (registerForm.value.confirmPassword) {
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      initPasswordError.value = '两次输入的密码不一致'
      initConfirmError.value = '两次输入的密码不一致'
    } else {
      initConfirmError.value = ''
    }
  }
}

function onInitConfirmBlur() {
  if (registerForm.value.confirmPassword && registerForm.value.password !== registerForm.value.confirmPassword) {
    initConfirmError.value = '两次输入的密码不一致'
    initPasswordError.value = '两次输入的密码不一致'
  } else {
    initConfirmError.value = ''
    initPasswordError.value = registerForm.value.password ? (validatePassword(registerForm.value.password) || '') : ''
  }
}

// ===== 注册表单校验 =====

async function onRegUsernameBlur() {
  const err = validateUsername(registerForm.value.username)
  regUsernameError.value = err || ''
  if (!err && registerForm.value.username) {
    const taken = await checkUsername(registerForm.value.username)
    if (taken) regUsernameError.value = '用户名已被使用'
  }
}

function onRegEmailBlur() {
  regEmailError.value = validateEmail(registerForm.value.email) || ''
}

function onRegPasswordBlur() {
  regPasswordError.value = validatePassword(registerForm.value.password) || ''
  if (registerForm.value.confirmPassword) {
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      regPasswordError.value = '两次输入的密码不一致'
      regConfirmError.value = '两次输入的密码不一致'
    } else {
      regConfirmError.value = ''
    }
  }
}

function onRegConfirmBlur() {
  if (registerForm.value.confirmPassword && registerForm.value.password !== registerForm.value.confirmPassword) {
    regConfirmError.value = '两次输入的密码不一致'
    regPasswordError.value = '两次输入的密码不一致'
  } else {
    regConfirmError.value = ''
    regPasswordError.value = registerForm.value.password ? (validatePassword(registerForm.value.password) || '') : ''
  }
}

// ===== 操作 =====

async function handleLogin() {
  if (!loginForm.value.username || !loginForm.value.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  loginLoading.value = true
  try {
    if (rememberMe.value) { localStorage.setItem('remembered_username', loginForm.value.username) } else { localStorage.removeItem('remembered_username') }
    await login(loginForm.value)
    ElMessage.success('登录成功')
    navigateTo('/home')
  } catch (e) {
    ElMessage.error(e.response?.data?.message || '用户名或密码错误')
  } finally {
    loginLoading.value = false
  }
}

async function handleRegister() {
  const ue = validateUsername(registerForm.value.username)
  const ee = validateEmail(registerForm.value.email)
  const pe = validatePassword(registerForm.value.password)
  regUsernameError.value = ue || ''
  regEmailError.value = ee || ''
  regPasswordError.value = pe || ''
  if (ue || ee || pe) return

  const taken = await checkUsername(registerForm.value.username)
  if (taken) {
    regUsernameError.value = '用户名已被使用'
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }
  registerLoading.value = true
  try {
    await registerGuest(registerForm.value)
    ElMessage.success('注册成功')
    showRegister.value = false
  } catch (e) {
    ElMessage.error(e.response?.data?.message || '注册失败')
  } finally {
    registerLoading.value = false
  }
}

async function handleInit() {
  const ue = validateUsername(registerForm.value.username)
  const ee = validateEmail(registerForm.value.email)
  const pe = validatePassword(registerForm.value.password)
  initUsernameError.value = ue || ''
  initEmailError.value = ee || ''
  initPasswordError.value = pe || ''
  if (ue || ee || pe) return

  const taken = await checkUsername(registerForm.value.username)
  if (taken) {
    initUsernameError.value = '用户名已被使用'
    return
  }

  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }
  initLoading.value = true
  try {
    await initSuperAdmin(registerForm.value)
    ElMessage.success('超级管理员创建成功，请登录')
    mode.value = 'login'
  } catch (e) {
    ElMessage.error(e.response?.data?.message || '初始化失败')
  } finally {
    initLoading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div v-if="mode === 'checking'" class="login-card">
      <div class="card-brand">
        <span class="brand-icon">📝</span>
        <h1 class="brand-title">CodeBlog</h1>
      </div>
      <div class="checking-area">
        <el-icon class="is-loading" :size="32"><Loading /></el-icon>
        <p>正在检查系统状态...</p>
      </div>
    </div>

    <div v-else-if="mode === 'init'" class="login-card">
      <div class="card-brand">
        <span class="brand-icon">🚀</span>
        <h1 class="brand-title">初始化系统</h1>
        <p class="brand-desc">首次使用，请创建超级管理员账号</p>
      </div>
      <el-form label-position="top" @submit.prevent="handleInit">
        <el-form-item label="用户名" :error="initUsernameError">
          <el-input v-model="registerForm.username" placeholder="请输入用户名" :prefix-icon="User" @blur="onInitUsernameBlur" />
        </el-form-item>
        <el-form-item label="邮箱" :error="initEmailError">
          <el-input v-model="registerForm.email" placeholder="请输入邮箱" :prefix-icon="Message" @blur="onInitEmailBlur" />
        </el-form-item>
        <el-form-item label="密码" :error="initPasswordError">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" show-password @blur="onInitPasswordBlur" />
        </el-form-item>
        <el-form-item label="确认密码" :error="initConfirmError">
          <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" :prefix-icon="Lock" show-password @blur="onInitConfirmBlur" />
        </el-form-item>
        <el-button type="primary" size="large" class="login-btn" :loading="initLoading" native-type="submit" block>
          创建超级管理员
        </el-button>
      </el-form>
    </div>

    <div v-else class="login-card">
      <div class="card-brand">
        <span class="brand-icon">📝</span>
        <h1 class="brand-title">CodeBlog</h1>
        <p class="brand-desc">欢迎回来，请登录您的账号</p>
      </div>
      <div v-if="!showRegister">
        <el-form label-position="top" @submit.prevent="handleLogin">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" show-password />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="rememberMe" class="remember-checkbox">记住账号</el-checkbox>
          </el-form-item>
          <el-button type="primary" size="large" class="login-btn" :loading="loginLoading" native-type="submit" block>
            登录
          </el-button>
        </el-form>
        <div class="form-footer">
          <el-button link type="primary" @click="showRegister = true">游客注册</el-button>
        </div>
      </div>
      <div v-else>
        <el-form label-position="top" @submit.prevent="handleRegister">
          <el-form-item label="用户名" :error="regUsernameError">
            <el-input v-model="registerForm.username" placeholder="请输入用户名" :prefix-icon="User" @blur="onRegUsernameBlur" />
          </el-form-item>
          <el-form-item label="邮箱" :error="regEmailError">
            <el-input v-model="registerForm.email" placeholder="请输入邮箱" :prefix-icon="Message" @blur="onRegEmailBlur" />
          </el-form-item>
          <el-form-item label="密码" :error="regPasswordError">
            <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" show-password @blur="onRegPasswordBlur" />
          </el-form-item>
          <el-form-item label="确认密码" :error="regConfirmError">
            <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" :prefix-icon="Lock" show-password @blur="onRegConfirmBlur" />
          </el-form-item>
          <el-button type="primary" size="large" class="login-btn" :loading="registerLoading" native-type="submit" block>
            注册
          </el-button>
        </el-form>
        <div class="form-footer">
          <el-button link type="primary" @click="showRegister = false">返回登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { User, Lock, Message, Loading } from '@element-plus/icons-vue'
export default { components: { User, Lock, Message, Loading } }
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}
.login-card {
  width: 420px;
  max-width: 100%;
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  animation: fadeInUp 0.5s ease;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.card-brand { text-align: center; margin-bottom: 32px; }
.brand-icon { font-size: 48px; }
.brand-title {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 12px 0 8px;
}
.brand-desc { color: #999; font-size: 14px; margin: 0; }
.checking-area { text-align: center; padding: 40px 0; color: #999; }
.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
  margin-top: 8px;
}
.remember-checkbox { margin-bottom: -8px; }
.form-footer { text-align: center; margin-top: 16px; }
</style>




