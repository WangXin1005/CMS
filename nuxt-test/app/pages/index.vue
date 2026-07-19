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
import { ref, computed, onMounted, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

definePageMeta({ layout: 'public' })


const { getPublished } = useArticle()
const { getList: getCategories } = useCategory()
const { getList: getTags } = useTag()

const articles = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const total = ref(0)
const currentPage = useState('index:currentPage', () => 1)
const pageSize = ref(12)

const searchKeyword = useState('index:searchKeyword', () => '')
const activeCategoryId = useState<number | null>('index:activeCategoryId', () => null)
const activeTagId = useState<number | null>('index:activeTagId', () => null)

const categories = ref<Record<string, unknown>[]>([])
const tags = ref<Record<string, unknown>[]>([])
const categoryExpanded = ref(false)
const tagExpanded = ref(false)
const categoryOverflow = ref(false)
const tagOverflow = ref(false)
const categoryItemsRef = ref(null)
const tagItemsRef = ref(null)
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
  await nextTick()
  await checkOverflow()
}

function handleSearch() {
  currentPage.value = 1
  loadArticles()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function selectCategory(catId: number) {
  activeCategoryId.value = activeCategoryId.value === catId ? null : catId
  currentPage.value = 1
  loadArticles()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function selectTag(tagId: number) {
  activeTagId.value = activeTagId.value === tagId ? null : tagId
  currentPage.value = 1
  loadArticles()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handlePageChange(page: number) {
  currentPage.value = page
  loadArticles()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function navigateToArticle(slug: string) {
  sessionStorage.setItem('indexScrollY', String(window.scrollY || document.documentElement.scrollTop))
  navigateTo('/article/' + slug)
}


function checkOverflow() {
  if (categoryItemsRef.value) categoryOverflow.value = categoryItemsRef.value.scrollHeight > categoryItemsRef.value.clientHeight
  if (tagItemsRef.value) tagOverflow.value = tagItemsRef.value.scrollHeight > tagItemsRef.value.clientHeight
}

onMounted(async () => {
  await Promise.all([loadArticles(), loadSidebar()])
  await nextTick()
  checkOverflow()
})


</script>

<template>
  <div class="blog-layout">
    <div class="sticky-top">
      <div class="search-bar">
        <el-input v-model="searchKeyword" placeholder="搜索文章..." clearable :prefix-icon="Search" size="large"
          @clear="handleSearch" @keyup.enter="handleSearch" />
      </div>
      <div class="filter-bar">
        <div class="filter-section">
          <span class="filter-label">📂 分类</span>
          <div class="filter-items" :class="{ collapsed: !categoryExpanded }" ref="categoryItemsRef">
            <span v-for="cat in categories" :key="cat.id" :class="{ active: activeCategoryId === cat.id }"
              class="filter-chip" @click="selectCategory(cat.id)">{{ cat.name }}</span>
            <span v-if="categories.length === 0" class="filter-empty">暂无分类</span>
          </div>
          <div v-if="categoryOverflow" class="expand-row" @click="categoryExpanded = !categoryExpanded">{{ categoryExpanded ? '▲ 收起' : '▼ 展开' }}</div>
        </div>
        <div class="filter-section">
          <span class="filter-label">🏷️ 标签</span>
          <div class="filter-items" :class="{ collapsed: !tagExpanded }" ref="tagItemsRef">
            <span v-for="tag in tags" :key="tag.id" :class="{ active: activeTagId === tag.id }"
              class="filter-chip tag-chip" @click="selectTag(tag.id)">{{ tag.name }}</span>
            <span v-if="tags.length === 0" class="filter-empty">暂无标签</span>
          </div>
          <div v-if="tagOverflow" class="expand-row" @click="tagExpanded = !tagExpanded">{{ tagExpanded ? '▲ 收起' : '▼ 展开' }}</div>
        </div>
      </div>
    </div>
    <div class="blog-content-row">
      <div class="main-content">


        <div v-if="loading" class="skeleton-grid">
          <el-skeleton v-for="i in 4" :key="i" :count="1" style="--el-skeleton-color: #f0f0f0">
            <template #template>
              <div style="padding: 0">
                <el-skeleton-item variant="image" style="width: 100%; height: 180px; border-radius: 8px 8px 0 0" />
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
          <el-button v-if="activeCategoryId || activeTagId || searchKeyword" type="primary" @click="
            () => {
              activeCategoryId = null
              activeTagId = null
              searchKeyword = ''
              handleSearch()
            }
          ">
            清空筛选条件
          </el-button>
        </el-empty>

        <div v-else class="article-grid">
          <ArticleCard v-for="article in articles" :key="article.id" :article="article"
            @click="navigateToArticle(article.slug)" />
        </div>

        <div v-if="total > pageSize" class="pagination-wrapper">
          <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="total"
            layout="prev, pager, next, jumper, total" :hide-on-single-page="false" background
            @current-change="handlePageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.blog-layout {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
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
  margin-top: 0;
}


.blog-content-row {
  display: flex;
  gap: 24px;
}

.sticky-top {
  position: sticky;
  top: 60px;
  z-index: 50;
  background: #f0f2f5;
  padding-top: 16px;
  width: 100%;
}

.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px 16px 10px 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  width: 100%;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #999;
  white-space: nowrap;
  line-height: 20px;
  min-width: 52px;
  margin-top: -5px;
}

.filter-items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 2px;
}
/* 折叠状态：限制高度并隐藏溢出 */
.filter-items.collapsed {
  max-height: 30px;
  overflow: hidden;
}

.expand-row {
  text-align: center;
  font-size: 12px;
  color: #999;
  cursor: pointer;
  padding: 6px 0 0 0;
  transition: color 0.2s;
  line-height: 7px;
}

.expand-row:hover {
  color: #667eea;
}

.filter-chip {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 16px;
  font-size: 13px;
  color: #555;
  background: #f8f9ff;
  border: 1.5px solid #d4d9f0;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  font-weight: 500;
  line-height: 1.3;
}

.filter-chip:hover {
  color: #667eea;
  background: #eef0ff;
  border-color: #667eea;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.15);
  transform: translateY(-1px);
}

.filter-chip.active {
  color: #fff;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  font-weight: 600;
}

.tag-chip {
  border-radius: 4px;
  background: #f5fdf5;
  border-color: #c8e6c9;
  color: #4a7c4f;
}

.tag-chip:hover {
  color: #52c41a;
  background: #eef9ee;
  border-color: #52c41a;
  box-shadow: 0 2px 6px rgba(82, 196, 26, 0.15);
}

.tag-chip.active {
  color: #fff;
  background: linear-gradient(135deg, #52c41a, #389e0d);
  box-shadow: 0 2px 8px rgba(82, 196, 26, 0.3);
}

.filter-empty {
  font-size: 13px;
  color: #ccc;
  line-height: 28px;
}

.search-bar {
  margin-bottom: 10px;
}

.search-bar :deep(.el-input__wrapper) {
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.article-grid,
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    gap: 8px;
  }

  .article-grid,
  .skeleton-grid {
    grid-template-columns: 1fr;
  }
}
</style>
