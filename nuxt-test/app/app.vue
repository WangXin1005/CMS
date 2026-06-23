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

<script setup lang="ts">
</script>

<!-- 全局样式 -->
<style lang="less">
* { margin: 0; padding: 0; box-sizing: border-box; }

html, body { height: 100%; }

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans SC', sans-serif;
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

// ===== 分页 =====
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

// ===== 滚动条美化 =====
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #bbb; }

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
</style>
