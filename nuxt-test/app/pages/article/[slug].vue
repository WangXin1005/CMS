<!-- article/[slug] — 文章详情页（公开）：内容渲染、作者信息、评论区 -->
<script lang="ts" setup>
/**
 * 文章详情页（公开）
 * 路由：/article/:slug
 */
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { sanitizeHtml } from '~/utils/sanitize'

definePageMeta({ layout: 'public' })

const route = useRoute()
const router = useRouter()

const { getBySlug } = useArticle()
const { getList: getCategories } = useCategory()
const { getList: getTags } = useTag()

const article = ref<Record<string, unknown> | null>(null)
const loading = ref(true)
const categories = ref<Record<string, unknown>[]>([])
const tags = ref<Record<string, unknown>[]>([])

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

async function loadSidebar() {
  try {
    const [catRes, tagRes] = await Promise.all([getCategories(), getTags()])
    categories.value = catRes ?? []
    tags.value = tagRes ?? []
  } catch {
    // ignore sidebar errors
  }
}

const formattedDate = computed(() => {
  if (!article.value?.createdAt) return ''
  return (article.value.createdAt || '').replace('T', ' ').slice(0, 16)
})

onMounted(async () => {
  await Promise.all([loadArticle(), loadSidebar()])
})
</script>

<template>
  <div v-if="!loading && article" class="article-detail-layout">
    <!-- 主内容 -->
    <div class="detail-main">
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
          <el-tag v-if="article.category" size="small" type="primary" effect="plain">
            {{ article.category.name }}
          </el-tag>
        </div>
      </div>

      <!-- 封面图 -->
      <div v-if="article.coverImage" class="article-cover">
        <img :src="article.coverImage" :alt="article.title" />
      </div>

      <!-- 文章内容 -->
      <div class="article-content" v-html="sanitizeHtml(article.content)"></div>

      <!-- 标签 -->
      <div v-if="article.tags?.length" class="article-tags">
        <el-tag
          v-for="tag in article.tags"
          :key="tag.id"
          size="small"
          effect="plain"
          class="tag-item"
        >
          #{{ tag.name }}
        </el-tag>
      </div>

      <el-divider />

      <!-- 评论区 -->
      <CommentSection :article-id="article.id" />
    </div>

    <!-- 侧边栏 -->
    <aside class="detail-sidebar">
      <div class="widget">
        <h3 class="widget-title">📂 分类</h3>
        <ul v-if="categories.length" class="category-list">
          <li v-for="cat in categories" :key="cat.id">
            <NuxtLink :to="`/?categoryId=${cat.id}`" class="cat-link">{{ cat.name }}</NuxtLink>
          </li>
        </ul>
        <p v-else class="empty-hint">暂无分类</p>
      </div>
      <div class="widget">
        <h3 class="widget-title">🏷️ 标签</h3>
        <div v-if="tags.length" class="tag-cloud">
          <NuxtLink
            v-for="tag in tags"
            :key="tag.id"
            :to="`/?tagId=${tag.id}`"
            class="sidebar-tag-item"
            >{{ tag.name }}</NuxtLink
          >
        </div>
        <p v-else class="empty-hint">暂无标签</p>
      </div>
    </aside>
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

  h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 36px 0 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
    color: #1a1a1a;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 28px 0 12px;
    color: #1a1a1a;
  }

  p {
    margin: 0 0 16px;
  }

  ul,
  ol {
    padding-left: 24px;
    margin: 12px 0 16px;

    li {
      margin: 6px 0;
    }
  }

  code {
    background: #f0f2f5;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 14px;
    color: #e74c3c;
  }

  pre {
    background: #1e1e2e;
    color: #cdd6f4;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 16px 0 24px;
    font-size: 14px;
    line-height: 1.6;

    code {
      background: none;
      padding: 0;
      color: inherit;
      font-size: inherit;
    }
  }

  blockquote {
    border-left: 4px solid #667eea;
    margin: 16px 0 24px;
    padding: 14px 20px;
    background: #f8f9ff;
    border-radius: 0 8px 8px 0;
    color: #555;

    p {
      margin: 0;
    }
  }

  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 16px 0;
    display: block;
  }

  strong {
    font-weight: 700;
    color: #1a1a1a;
  }
  a {
    color: #667eea;
    text-decoration: underline;
  }
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

// ===== 侧边栏 =====
.detail-sidebar {
  width: 280px;
  flex-shrink: 0;
}

.widget {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.widget-title {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 14px;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
  color: #333;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  padding: 9px 0;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
}

.cat-link {
  color: #555;
  text-decoration: none;
  font-size: 14px;
  display: block;
  transition: all 0.2s;

  &:hover {
    color: #667eea;
    padding-left: 4px;
  }
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sidebar-tag-item {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-size: 13px;
  padding: 4px 10px;
  background: #f0f2ff;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #667eea;
    color: #fff;
  }
}

.empty-hint {
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 16px 0;
  margin: 0;
}

// ===== 加载态 =====
.detail-loading {
  max-width: 800px;
  margin: 40px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
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
  .detail-sidebar {
    width: 100%;
  }
  .detail-main {
    padding: 20px;
  }
  .article-title {
    font-size: 24px;
  }
}
</style>
