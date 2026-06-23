<script lang="ts" setup>
/**
 * Home - 仪表盘页面（管理后台首页）
 * 展示统计概览、快捷操作入口、近期文章列表。需 auth 中间件保护。
 */
definePageMeta({ middleware: 'auth' })
import { ref, onMounted } from 'vue'

const { getStats, getRecent } = useArticle()

const stats = ref({ totalArticles: 0, totalCategories: 0, totalTags: 0, totalComments: 0 })
const recentArticles = ref([])
const statsLoading = ref(true)
const articlesLoading = ref(true)

function goCreate() { return navigateTo('/articles/create') }
function goArticleList() { return navigateTo('/articles') }
function goComments() { return navigateTo('/comments') }

onMounted(async () => {
  // 加载统计信息
  try {
    const res = await getStats()
    stats.value = {
      totalArticles: res.totalArticles ?? 0,
      totalCategories: res.totalCategories ?? 0,
      totalTags: res.totalTags ?? 0,
      totalComments: res.totalComments ?? 0,
    }
  } catch (e) {
    console.error('获取统计信息失败', e)
  } finally {
    statsLoading.value = false
  }

  // 加载近期文章
  try {
    const res = await getRecent(1, 5)
    recentArticles.value = res.content ?? []
    if (recentArticles.value.length === 0) {
      console.warn('近期文章列表为空')
    }
  } catch (e) {
    console.error('获取近期文章失败', e)
    recentArticles.value = []
  } finally {
    articlesLoading.value = false
  }
})
</script>

<template>
  <div>
    <div class="page-header">
      <h2>仪表盘</h2>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid" v-loading="statsLoading">
      <el-card class="stat-card" shadow="never">
        <div class="stat-value" style="color:#409eff">{{ stats.totalArticles }}</div>
        <div class="stat-label">文章总数</div>
      </el-card>
      <el-card class="stat-card" shadow="never">
        <div class="stat-value" style="color:#67c23a">{{ stats.totalCategories }}</div>
        <div class="stat-label">分类总数</div>
      </el-card>
      <el-card class="stat-card" shadow="never">
        <div class="stat-value" style="color:#e6a23c">{{ stats.totalTags }}</div>
        <div class="stat-label">标签总数</div>
      </el-card>
      <el-card class="stat-card" shadow="never">
        <div class="stat-value" style="color:#f56c6c">{{ stats.totalComments }}</div>
        <div class="stat-label">评论总数</div>
      </el-card>
    </div>

    <!-- 近期文章 + 快捷操作 -->
    <el-row :gutter="16">
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>
            <span>近期文章</span>
          </template>
          <div v-loading="articlesLoading">
            <el-empty v-if="!articlesLoading && recentArticles.length === 0" description="暂无文章" />
            <div v-for="(item, i) in recentArticles" :key="item.id" class="recent-item">
              <span class="recent-index">{{ i + 1 }}</span>
              <nuxt-link :to="'/articles/edit/' + item.id" class="recent-title">{{ item.title }}</nuxt-link>
              <span class="recent-status">
                <el-tag
                  :type="item.status === 'PUBLISHED' ? 'success' : 'warning'"
                  size="small"
                  effect="dark"
                >
                  {{ item.status === 'PUBLISHED' ? '已发布' : '草稿' }}
                </el-tag>
              </span>
              <span class="recent-date">{{ item.createdAt?.slice(0, 10) }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <template #header>
            <span>快捷操作</span>
          </template>
          <div class="quick-actions">
            <div class="quick-action-item" @click="goCreate">
              <div class="qa-icon">✍️</div>
              <div class="qa-label">写文章</div>
            </div>
            <div class="quick-action-item" @click="goArticleList">
              <div class="qa-icon">📋</div>
              <div class="qa-label">文章管理</div>
            </div>
            <div class="quick-action-item" @click="goComments">
              <div class="qa-icon">💬</div>
              <div class="qa-label">评论管理</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}
.stat-card { text-align: center; padding: 20px 0; }
.stat-value { font-size: 32px; font-weight: 700; }
.stat-label { font-size: 14px; color: #909399; margin-top: 8px; }
.recent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
.recent-item:last-child { border-bottom: none; }
.recent-index {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
  flex-shrink: 0;
}
.recent-title {
  flex: 1;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recent-title:hover { color: #409eff; }
.recent-status { flex-shrink: 0; }
.recent-date {
  font-size: 12px;
  color: #999;
  flex-shrink: 0;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.quick-action-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  transition: all 0.25s ease;
  user-select: none;
}

.quick-action-item:hover {
  background: #409eff;
  border-color: #409eff;
}

.quick-action-item:hover .qa-icon,
.quick-action-item:hover .qa-label {
  color: #fff;
}

.qa-icon {
  font-size: 20px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #f0f7ff;
  flex-shrink: 0;
  transition: background 0.25s ease;
}

.quick-action-item:hover .qa-icon {
  background: rgba(255,255,255,0.2);
}

.qa-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  transition: color 0.25s ease;
}
</style>
