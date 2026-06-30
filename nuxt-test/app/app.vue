<!--
  app — 应用根组件
  使用 NuxtLayout + NuxtPage 渲染页面。
  全局 CSS 包含：字体栈、滚动条美化、管理后台通用样式（page-header / page-card / filter-bar / stats-grid）。
-->
<!-- 应用根组件 -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<!-- 全局样式 -->
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: #f0f2f5;
}

// ===== 页面标题栏（管理后台页面通用） =====
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
  }
}

// ===== 内容卡片 =====
.page-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  padding: 24px;
}

// ===== 筛选栏 =====
.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
}

// ===== 表格优化 =====
.el-table {
  border-radius: 8px;
  overflow: hidden;
}

.el-table th.el-table__cell {
  background: #f7f8fa !important;
  font-weight: 600;
  color: #555;
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #fafbfc;
}

// ===== 卡片组件 =====
.el-card {
  border-radius: 10px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

// ===== 分页 =====
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

// ===== 滚动条美化 =====
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}

// ===== 统计卡片网格 =====
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  text-align: center;
  padding: 24px 16px;

  .stat-value {
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
  }

  .stat-label {
    font-size: 14px;
    color: #999;
    margin-top: 10px;
  }
}

// ===== 文章内容渲染样式（v-html 输出） =====
.article-content-render {
  font-size: 15px;
  line-height: 1.8;
  color: #333;
  word-wrap: break-word;
}

.article-content-render p {
  margin: 0 0 12px;
}

.article-content-render h1,
.article-content-render h2,
.article-content-render h3,
.article-content-render h4,
.article-content-render h5 {
  margin: 20px 0 10px;
  font-weight: 600;
  color: #1a1a1a;
}

.article-content-render h1 {
  font-size: 24px;
}
.article-content-render h2 {
  font-size: 20px;
}
.article-content-render h3 {
  font-size: 17px;
}
.article-content-render h4 {
  font-size: 15px;
}
.article-content-render h5 {
  font-size: 14px;
}

.article-content-render ul,
.article-content-render ol {
  padding-left: 24px;
  margin: 8px 0;
}
.article-content-render li {
  margin: 4px 0;
}

.article-content-render blockquote {
  border-left: 3px solid var(--el-color-primary, #409eff);
  margin: 12px 0;
  padding: 8px 16px;
  background: #f5f7fa;
  color: #666;
  border-radius: 0 4px 4px 0;
}

.article-content-render pre {
  background: #282c34;
  color: #abb2bf;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
  margin: 12px 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

.article-content-render code {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
  color: #d63384;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

.article-content-render pre code {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: inherit;
  font-size: inherit;
}

.article-content-render img {
  max-width: 100%;
  border-radius: 6px;
  margin: 12px 0;
  display: block;
}

.article-content-render a {
  color: var(--el-color-primary, #409eff);
  text-decoration: underline;
}

.article-content-render hr {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #dcdfe6;
}

.article-content-render table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
}

.article-content-render th,
.article-content-render td {
  border: 1px solid #dcdfe6;
  padding: 8px 12px;
  text-align: left;
}

.article-content-render th {
  background: #f7f8fa;
  font-weight: 600;
}
</style>
