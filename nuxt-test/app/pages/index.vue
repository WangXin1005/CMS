<!-- index — 博客首页（公开）：搜索、分类/标签筛选、分页文章列表、侧边栏 -->

<script lang="ts" setup>
/**
 * index — 博客首页（公开）
 *
 * 功能：
 *  - 关键词搜索文章
 *  - 按分类/标签互斥筛选
 *  - 分页浏览已发布文章
 *  - 侧边栏展示分类列表和标签云
 *
 * 数据流：
 *   onMounted → loadArticles() + loadSidebar() 并行加载
 *   用户交互 → 更新筛选条件 → currentPage=1 → loadArticles()
 */
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

definePageMeta({ layout: 'public' })

const { getPublished } = useArticle()
const { getList: getCategories } = useCategory()
const { getList: getTags } = useTag()

const articles = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

const searchKeyword = ref('')
const activeCategoryId = ref<number | null>(null)
const activeTagId = ref<number | null>(null)

const categories = ref<Record<string, unknown>[]>([])
const tags = ref<Record<string, unknown>[]>([])

async function loadArticles() {
  loading.value = true
  try {
    const res = await getPublished(currentPage.value, pageSize.value, {
      categoryId: activeCategoryId.value ?? undefined,
      tagId: activeTagId.value ?? undefined,
      keyword: searchKeyword.value || undefined,
    })
    articles.value = res.content
    total.value = res.totalElements
  } catch {
    ElMessage.error('加载文章失败，请稍后重试')
    articles.value = []
    total.value = 0
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
    categories.value = []
    tags.value = []
  }
}

function handleSearch() {
  currentPage.value = 1
  loadArticles()
}

function selectCategory(catId: number) {
  activeCategoryId.value = activeCategoryId.value === catId ? null : catId
  activeTagId.value = null
  currentPage.value = 1
  loadArticles()
}

function selectTag(tagId: number) {
  activeTagId.value = activeTagId.value === tagId ? null : tagId
  activeCategoryId.value = null
  currentPage.value = 1
  loadArticles()
}

function navigateToArticle(slug: string) {
  navigateTo('/article/' + slug)
}

onMounted(async () => {
  await Promise.all([loadArticles(), loadSidebar()])
})
</script>

<template>
  <div class="blog-layout">
    <div class="main-content">
      <div class="search-bar">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索文章..."
          clearable
          :prefix-icon="Search"
          size="large"
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        />
      </div>

      <div v-if="loading" class="skeleton-grid">
        <el-skeleton v-for="i in 4" :key="i" :count="1" style="--el-skeleton-color: #f0f0f0">
          <template #template>
            <div style="padding: 0">
              <el-skeleton-item
                variant="image"
                style="width: 100%; height: 180px; border-radius: 8px 8px 0 0"
              />
              <div style="padding: 14px">
                <el-skeleton-item variant="text" style="width: 40%" />
                <el-skeleton-item variant="h3" style="width: 80%; margin-top: 8px" />
                <el-skeleton-item variant="text" style="width: 60%; margin-top: 8px" />
                <el-skeleton-item variant="text" style="width: 30%; margin-top: 8px" />
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>

      <el-empty v-else-if="articles.length === 0" description="暂无文章">
        <el-button
          v-if="activeCategoryId || activeTagId || searchKeyword"
          type="primary"
          @click="
            () => {
              activeCategoryId = null
              activeTagId = null
              searchKeyword = ''
              handleSearch()
            }
          "
        >
          清空筛选条件
        </el-button>
      </el-empty>

      <div v-else class="article-grid">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
          @click="navigateToArticle(article.slug)"
        />
      </div>

      <div v-if="total > pageSize" class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next, total"
          background
          @current-change="loadArticles"
        />
      </div>
    </div>

    <aside class="sidebar">
      <div class="widget">
        <h3 class="widget-title">📂 分类</h3>
        <ul v-if="categories.length" class="category-list">
          <li
            v-for="cat in categories"
            :key="cat.id"
            :class="{ active: activeCategoryId === cat.id }"
            @click="selectCategory(cat.id)"
          >
            {{ cat.name }}
          </li>
        </ul>
        <p v-else class="empty-hint">暂无分类</p>
      </div>
      <div class="widget">
        <h3 class="widget-title">🏷️ 标签</h3>
        <div v-if="tags.length" class="tag-cloud">
          <el-tag
            v-for="tag in tags"
            :key="tag.id"
            :type="activeTagId === tag.id ? 'primary' : undefined"
            :effect="activeTagId === tag.id ? 'dark' : undefined"
            class="tag-item"
            @click="selectTag(tag.id)"
          >
            {{ tag.name }}
          </el-tag>
        </div>
        <p v-else class="empty-hint">暂无标签</p>
      </div>
    </aside>
  </div>
</template>

<style lang="less" scoped>
.blog-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  gap: 24px;
  padding-bottom: 40px;
}

.page-header {
  text-align: center;
  padding: 40px 0 32px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px;
}

.page-subtitle {
  font-size: 16px;
  color: #999;
  margin: 0;
}

.main-content {
  flex: 1;
  min-width: 0;
}

.search-bar {
  margin-top: 16px;
  margin-bottom: 24px;
}

.search-bar :deep(.el-input__wrapper) {
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.article-grid,
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

// ===== 侧边栏 =====
.sidebar {
  width: 280px;
  flex-shrink: 0;
}

.widget {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
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
  cursor: pointer;
  transition: all 0.2s;
  color: #555;
  font-size: 14px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: #667eea;
    padding-left: 4px;
  }

  &.active {
    color: #667eea;
    font-weight: 600;
  }
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  cursor: pointer;
  transition: all 0.25s ease;
}
.tag-item:hover {
  color: #409eff !important;
  border-color: #409eff !important;
}

.empty-hint {
  color: #999;
  font-size: 14px;
  text-align: center;
  padding: 16px 0;
  margin: 0;
}

@media (max-width: 768px) {
  .blog-layout {
    flex-direction: column;
  }
  .article-grid,
  .skeleton-grid {
    grid-template-columns: 1fr;
  }
  .sidebar {
    width: 100%;
  }
}
</style>
