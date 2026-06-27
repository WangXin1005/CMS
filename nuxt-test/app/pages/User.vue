<script lang="ts" setup>
/**
 * User - 用户管理页面
 * 支持分页列表、搜索、新增用户、编辑用户、删除用户功能。
 * 新增/编辑使用弹窗表单，删除需确认。需 auth 中间件保护。
 */
definePageMeta({ middleware: 'auth' })
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { validatePassword } from '~/utils/password'
import { validateUsername } from '~/utils/username'
import { validateEmail } from '~/utils/email'
import { Search, Plus } from '@element-plus/icons-vue'

const { getUserList, createUser, updateUser, deleteUser, role, checkUsername } = useAuth()

const tableData = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const search = ref('')
const loading = ref(false)

// 角色映射
const roleOptions = [
  { value: 'USER', label: '普通用户' },
  { value: 'ADMIN', label: '管理员' },
  { value: 'GUEST', label: '访客' },
]
const roleTagType = { SUPERADMIN: 'danger', ADMIN: 'warning', USER: 'success', GUEST: 'info' }
const roleLabel = { SUPERADMIN: '超级管理员', ADMIN: '管理员', USER: '用户', GUEST: '访客' }

// 弹窗控制
const dialogVisible = ref(false)
const dialogTitle = ref('')
const editingId = ref(null)
const form = ref({ username: '', email: '', password: '', role: 'USER' })
const submitting = ref(false)
const formValid = computed(() => {
  if (!form.value.username || !form.value.email) return false
  if (nameError.value || mailError.value) return false
  if (!editingId.value && (!form.value.password || pwdError.value)) return false
  return true
})
const pwdError = ref('')
const nameError = ref('')
const mailError = ref('')
async function onNameBlur(val) {
  if (!val) { nameError.value = ''; return }
  const err = validateUsername(val)
  if (err) { nameError.value = err; return }
  // 编辑时不校验重复
  if (!editingId.value) {
    const taken = await checkUsername(val)
    if (taken) { nameError.value = '用户名已被使用'; return }
  }
  nameError.value = ''
}
function onMailBlur(val) {
  if (!val) { mailError.value = ''; return }
  mailError.value = validateEmail(val) || ''
}
function onPwdBlur(val) {
  if (!val) { pwdError.value = ''; return }
  pwdError.value = validatePassword(val) || ''
}

/** 初始化加载 */
async function loadData() {
  loading.value = true
  try {
    const res = await getUserList(currentPage.value, pageSize.value)
    tableData.value = res.content ?? []
    total.value = res.totalElements ?? 0
  } catch { tableData.value = []; total.value = 0 }
  finally { loading.value = false }
}

/** 打开新增弹窗 */
function openCreate() {
  editingId.value = null
  dialogTitle.value = '新增用户'
  form.value = { username: '', email: '', password: '', role: 'USER' }
  dialogVisible.value = true
}

/** 打开编辑弹窗 */
function openEdit(row) {
  editingId.value = row.id
  dialogTitle.value = '编辑用户'
  form.value = {
    username: row.username ?? '',
    email: row.email ?? '',
    password: '',
    role: row.role ?? 'USER',
  }
  dialogVisible.value = true
}

/** 提交表单（新增/编辑） */
async function handleSubmit() {
  // 字段级校验
  const nameErr = validateUsername(form.value.username)
  const mailErr = validateEmail(form.value.email)
  nameError.value = nameErr || ''
  mailError.value = mailErr || ''
  if (nameErr || mailErr) return
  if (!editingId.value) {
    const pwdErr = validatePassword(form.value.password)
    pwdError.value = pwdErr || ''
    if (pwdErr) return
  }
  submitting.value = true
  try {
    if (editingId.value) {
      const payload = { username: form.value.username, email: form.value.email, role: form.value.role }
      await updateUser(editingId.value, payload)
      ElMessage.success('用户更新成功')
    } else {
      await createUser(form.value)
      ElMessage.success('用户创建成功')
    }
    dialogVisible.value = false
    await loadData()
  } catch (e) {
    ElMessage.error(e.response?.data?.message || '操作失败')
  } finally {
    submitting.value = false
  }
}

/** 删除用户 */
async function handleDelete(id, username) {
  try {
    await ElMessageBox.confirm(
      `确定删除用户 "${username}"？此操作不可恢复`,
      '确认删除',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
    )
    await deleteUser(id)
    ElMessage.success('用户已删除')
    await loadData()
  } catch { /* cancelled */ }
}

onMounted(loadData)
</script>

<template>
  <div>
    <div class="page-header">
      <h2>用户管理</h2>
      <el-button type="primary" :icon="Plus" @click="openCreate()">新增用户</el-button>
    </div>

    <div class="page-card">
      <div class="filter-bar">
        <el-input v-model="search" placeholder="搜索用户..." :prefix-icon="Search" style="width:260px" clearable />
      </div>

      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column type="index" label="#" width="60" :index="(i) => (currentPage - 1) * pageSize + i + 1" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="role" label="角色" width="130">
          <template #default="{ row }">
            <el-tag :type="roleTagType[row.role] || 'info'" effect="dark">
              {{ roleLabel[row.role] || row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="170">
          <template #default="{ row }">{{ (row.createdAt || "").replace("T", " ").slice(0, 16) }}</template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
            <el-button
              link type="danger" size="small"
              :disabled="row.role === 'SUPERADMIN'"
              @click="handleDelete(row.id, row.username)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="total > pageSize" class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage" :page-size="pageSize"
          :total="total" layout="prev, pager, next, total" background
          @current-change="loadData"
        />
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="480px" :close-on-click-modal="false">
      <el-form label-position="top">
        <el-form-item label="用户名" required :error="nameError">
          <el-input v-model="form.username" placeholder="4~15位，字母和数字" maxlength="15" @blur="onNameBlur(form.username)" />
        </el-form-item>
        <el-form-item label="邮箱" required :error="mailError">
          <el-input v-model="form.email" placeholder="请输入邮箱地址" maxlength="100" @blur="onMailBlur(form.email)" />
        </el-form-item>
        <el-form-item v-if="!editingId" label="密码" required :error="pwdError">
          <el-input v-model="form.password" type="password" placeholder="请输入密码，12~16位含大小写字母、数字、特殊符号" show-password @blur="onPwdBlur(form.password)" />
        </el-form-item>
        <el-form-item label="角色" required>
          <el-select v-model="form.role" placeholder="选择角色" style="width:100%">
            <el-option v-for="opt in roleOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitting" :disabled="!formValid" @click="handleSubmit()">
          {{ editingId ? '保存修改' : '创建用户' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>