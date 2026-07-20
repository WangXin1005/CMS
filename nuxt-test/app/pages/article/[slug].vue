<!-- article/[slug] — 文章详情页（公开）：内容渲染、作者信息、评论区 -->
<script lang="ts" setup>
/**
 * 文章详情页（公开）
 * 路由：/article/:slug
 */
import { ref, computed, onMounted, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { sanitizeHtml } from '~/utils/sanitize'

definePageMeta({ layout: 'public' })

// 从布局注入站点设置（供页脚使用）
const siteSettings = inject('siteSettings', computed(() => ({
  siteName: 'CodeBlog',
  siteLogo: '',
  icpNumber: '',
})))

const route = useRoute()
const router = useRouter()

const { getBySlug } = useArticle()

const article = ref<Record<string, unknown> | null>(null)
const loading = ref(true)

const slug = computed(() => route.params.slug as string)

async function loadArticle() {
  loading.value = true
  try {
    const res = await getBySlug(slug.value)
    article.value = res
  } catch {
    ElMessage.error('文章不存在或未发布')
    navigateTo('/')
  } finally {
    loading.value = false
  }
}


const formattedDate = computed(() => {
  if (!article.value?.createdAt) return ''
  return (article.value.createdAt || '').replace('T', ' ').slice(0, 16)
})

onMounted(async () => {
  await loadArticle()
})
</script>

<template>
  <div v-if="!loading && article" class="article-detail-layout">
    <!-- 主内容 -->
    <div class="detail-main">
      <div class="sticky-header">
        <div class="back-bar">
          <el-button size="small" class="back-btn" @click="router.back()">
            <svg viewBox="0 0 24 24" width="14" height="14" style="margin-right: 2px">
              <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            返回
          </el-button>
        </div>
        <div class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span>👤 {{ article.author?.username }}</span>
            <span>📅 {{ formattedDate }}</span>
            <span>👁 {{ article.viewCount }} 次阅读</span>
          </div>
        </div>


      </div>

      <!-- 封面图 -->
      <div v-if="article.coverImage" class="article-cover">
        <img :src="article.coverImage" :alt="article.title" />
      </div>

      <!-- 文章内容 -->
      <div class="article-content" v-html="sanitizeHtml(article.content)"></div>



    </div>

  </div>

  <!-- 加载态 -->
  <div v-else-if="loading" class="detail-loading">
    <el-skeleton :count="1">
      <template #template>
        <el-skeleton-item variant="h1" style="width: 60%; height: 32px" />
        <el-skeleton-item variant="text" style="margin-top: 16px" />
        <el-skeleton-item variant="text" />
        <el-skeleton-item variant="text" style="width: 40%" />
        <el-skeleton-item variant="image" style="width: 100%; height: 300px; margin-top: 24px" />
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="less" scoped>
.article-detail-layout {
  display: flex;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
}

// ===== 主内容区 =====
.detail-main {
  flex: 1;
  min-width: 0;
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  padding-top: 150px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.article-header {
  margin-bottom: 32px;
}

.article-title {
  font-size: 30px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 20px;
  line-height: 1.35;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: #999;
  flex-wrap: wrap;
}

// ===== 封面图 =====
.article-cover {
  margin-bottom: 32px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    max-height: 450px;
    object-fit: cover;
    display: block;
  }
}

// ===== 文章内容排版 =====
.article-content {
  font-size: 16px;
  line-height: 1.9;
  color: #2c3e50;
}

.article-content :deep(h2) {
  font-size: 24px;
  font-weight: 700;
  margin: 36px 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
  color: #1a1a1a;
}

.article-content :deep(h3) {
  font-size: 20px;
  font-weight: 600;
  margin: 28px 0 12px;
  color: #1a1a1a;
}

.article-content :deep(p) {
  margin: 0 0 16px;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  padding-left: 24px;
  margin: 12px 0 16px;
}

.article-content :deep(li) {
  margin: 6px 0;
}

.article-content :deep(code) {
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 14px;
  color: #e74c3c;
}

.article-content :deep(pre) {
  background: #1e1e2e;
  color: #cdd6f4;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0 24px;
  font-size: 14px;
  line-height: 1.6;
}

.article-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #667eea;
  margin: 16px 0 24px;
  padding: 14px 20px;
  background: #f8f9ff;
  border-radius: 0 8px 8px 0;
  color: #555;
}

.article-content :deep(blockquote p) {
  margin: 0;
}

.article-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 16px 0;
  display: block;
}

.article-content :deep(strong) {
  font-weight: 700;
  color: #1a1a1a;
}

.article-content :deep(a) {
  color: #667eea;
  text-decoration: underline;
}
.article-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
  border: 1px solid #e0e0e0;
}
.article-content :deep(th),
.article-content :deep(td) {
  border: 1px solid #e0e0e0 !important;
  padding: 10px 14px;
  text-align: left;
  min-width: 60px;
}
.article-content :deep(th) {
  background: #f7f8fa !important;
  font-weight: 600;
  color: #333;
}
.article-content :deep(tr:nth-child(even)) {
  background: #fafbfc;
}
.article-content :deep(td p) {
  margin: 0;
}

// ===== 标签 =====
.article-tags {
  margin-top: 32px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-item {
  cursor: default;
}

// ===== 加载态 =====
.detail-loading {
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
}

// ===== 粘性头部 =====
.sticky-header {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;
  background: rgba(248, 249, 250, 0.94);
  backdrop-filter: blur(8px);
  padding: 16px 40px 4px 40px;
  width: calc(100% - 32px);
  max-width: 1168px;
}

// ===== 响应式 =====
.back-bar {
  margin-bottom: 20px;
}

.back-bar .el-button {
  font-size: 13px;
  color: #666;
  padding: 6px 14px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
}

.back-bar .el-button:hover {
  color: #409eff;
  background: #f0f7ff;
  border-color: #409eff;
}

@media (max-width: 768px) {
  .article-detail-layout {
    flex-direction: column;
    padding: 16px;
  }

  .detail-main {
    padding: 20px;
  }

  .article-title {
    font-size: 24px;
  }
}
</style>

<!-- 表格全局样式（非 scoped，确保 v-html 中的表格线正常渲染） -->
<style lang="less">
.article-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
  border: 1px solid #e8e8e8;
}
.article-content th,
.article-content td {
  border: 1px solid #e8e8e8;
  padding: 10px 14px;
  text-align: left;
}
.article-content th {
  background: #f7f8fa;
  font-weight: 600;
  color: #333;
}
.article-content tr:nth-child(even) {
  background: #fafbfc;
}
</style>

