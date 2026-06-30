<!--
  ArticleCard — 文章卡片组件
  用于博客首页文章列表网格展示。
  包含封面图、分类标签、标题、摘要、作者和阅读量。
  点击卡片时 emit 'click' 事件，由父组件处理路由跳转。
-->
<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = defineProps<{
  article: {
    id: number
    title: string
    slug: string
    summary: string | null
    content?: string | null
    coverImage: string | null
    category: { id: number; name: string } | null
    tags: Array<{ id: number; name: string }>
    author: { id: number; username: string }
    viewCount: number
    createdAt: string
  }
}>()

const emit = defineEmits<{ click: [] }>()
const imageError = ref(false)
const formattedDate = computed(
  () => (props.article.createdAt || '').replace('T', ' ').slice(0, 16) ?? '',
)
const displaySummary = computed(() => {
  if (props.article.summary) return props.article.summary
  if (props.article.content) {
    const text = props.article.content.replace(/<[^>]*>/g, '').trim()
    return text.length > 120 ? text.slice(0, 120) + '...' : text
  }
  return ''
})
const coverUrl = computed(() => props.article.coverImage ?? '')
</script>

<template>
  <div class="article-card" @click="emit('click')">
    <div class="card-cover">
      <img
        v-if="coverUrl && !imageError"
        :src="coverUrl"
        :alt="article.title"
        class="cover-image"
        @error="imageError = true"
      />
      <div
        v-else
        class="cover-placeholder"
        :style="{
          background: `linear-gradient(135deg, hsl(${(article.id * 137) % 360}, 70%, 60%), hsl(${(article.id * 137 + 60) % 360}, 70%, 40%))`,
        }"
      >
        <span class="placeholder-text">{{ article.title.charAt(0) }}</span>
      </div>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <el-tag v-if="article.category" size="small" effect="dark" class="category-tag">
          {{ article.category.name }}
        </el-tag>
        <span class="date">{{ formattedDate }}</span>
      </div>
      <h3 class="card-title">{{ article.title }}</h3>
      <p class="card-summary">{{ displaySummary }}</p>
      <div class="card-footer">
        <span class="author">👤 {{ article.author.username }}</span>
        <span class="views">👁 {{ article.viewCount }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.article-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
}

.card-cover {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  .article-card:hover & {
    transform: scale(1.08);
  }
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-size: 64px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.category-tag {
  flex-shrink: 0;
}

.date {
  font-size: 12px;
  color: #aaa;
  margin-left: auto;
}

.card-title {
  font-size: 17px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.45;
  margin: 0 0 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-summary {
  font-size: 14px;
  color: #7a7a7a;
  line-height: 1.6;
  margin: 0 0 16px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #aaa;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}
</style>
