<!--
  CommentSection — 评论区组件
  用于文章详情页底部。功能：
  - 展示已审核评论列表
  - 提交评论表单（需登录）
  - 评论需管理员审核后方可显示
-->
<script lang="ts" setup>
/**
 * 评论区组件
 * 展示已审核评论 + 提交评论表单
 */
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps<{ articleId: number }>()

const { getArticleComments, submit } = useComment()
const { isLoggedIn } = useAuth()

const comments = ref<any[]>([])
const loading = ref(true)
const newComment = ref('')
const submitting = ref(false)

async function loadComments() {
  loading.value = true
  try {
    const res = await getArticleComments(props.articleId)
    comments.value = Array.isArray(res) ? res : []
  } catch {
    comments.value = []
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  if (!newComment.value.trim()) return
  submitting.value = true
  try {
    await submit({ content: newComment.value.trim(), articleId: props.articleId })
    ElMessage.success('评论提交成功，等待审核')
    newComment.value = ''
    await loadComments()
  } catch {
    ElMessage.error('提交失败，请重试')
  } finally {
    submitting.value = false
  }
}

onMounted(loadComments)
</script>

<template>
  <div class="comment-section">
    <h3 class="comment-title">💬 评论 ({{ comments.length }})</h3>

    <!-- 评论表单 -->
    <div v-if="isLoggedIn" class="comment-form">
      <el-input v-model="newComment" type="textarea" :rows="3"
        placeholder="写下你的评论..." maxlength="1000" show-word-limit />
      <div class="form-actions">
        <el-button type="primary" :loading="submitting" :disabled="!newComment.trim()" @click="handleSubmit">
          提交评论
        </el-button>
      </div>
    </div>
    <div v-else class="login-hint">
      <p>请 <NuxtLink to="/login" class="login-link">登录</NuxtLink> 后发表评论</p>
    </div>

    <el-divider />

    <!-- 评论列表 -->
    <div v-if="loading" class="comments-loading">
      <el-skeleton :count="2">
        <template #template>
          <el-skeleton-item variant="text" style="width:30%" />
          <el-skeleton-item variant="text" style="width:100%" />
        </template>
      </el-skeleton>
    </div>

    <div v-else-if="comments.length === 0" class="comments-empty">
      暂无评论
    </div>

    <div v-else class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <strong>{{ comment.author?.username || '匿名' }}</strong>
          <span class="comment-date">{{ comment.createdAt?.slice(0, 10) }}</span>
        </div>
        <p class="comment-content">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.comment-section { margin-top: 8px; }
.comment-title { font-size: 18px; font-weight: 600; margin: 0 0 16px 0; }
.comment-form { margin-bottom: 16px; }
.form-actions { margin-top: 12px; text-align: right; }
.login-hint { text-align: center; padding: 24px; background: #fafafa; border-radius: 8px; color: #999; }
.login-link { color: var(--el-color-primary); text-decoration: none; font-weight: 500; }
.comments-loading { padding: 16px; }
.comments-empty { text-align: center; padding: 32px; color: #999; }
.comments-list { display: flex; flex-direction: column; gap: 16px; }
.comment-item { padding: 16px; background: #fafafa; border-radius: 8px; }
.comment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.comment-header strong { font-size: 14px; color: #333; }
.comment-date { font-size: 12px; color: #999; }
.comment-content { font-size: 14px; line-height: 1.6; color: #555; margin: 0; }
</style>
