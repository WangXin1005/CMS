<!-- default 布局 — 管理后台标准布局：Header + Menu + 内容区 -->
<template>
  <div class="admin-layout">
    <Header />
    <div class="admin-body">
      <Menu />
      <main class="admin-content">
        <div class="content-inner">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="less" scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f2f5;
}

.admin-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.admin-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: #f0f2f5;
}

.content-inner {
  max-width: 1200px;
  margin: 0 auto;
}
</style>

<style lang="less">
/* 全局页头样式（用于后台管理页面） */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

/* 全局卡片样式（用于后台管理页面） */
.page-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

/* 分页容器 */
.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

/* 筛选栏 */
.filter-bar {
  margin-bottom: 16px;
}
</style>
