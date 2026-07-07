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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #f0f2f5;
}

.content-inner {
  flex: 1;
  min-height: 0;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
}
</style>

<style lang="less">
/* 鍏ㄥ眬椤靛ご鏍峰紡锛堢敤浜庡悗鍙扮鐞嗛〉闈級 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

/* 鍏ㄥ眬鍗＄墖鏍峰紡锛堢敤浜庡悗鍙扮鐞嗛〉闈級 */
.page-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 鍒嗛〉瀹瑰櫒 */
/* 表格+分页外层容器：填充剩余空间 */
.table-with-pagination {
  flex: 1;
  min-height: 0;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 分页器：固定于表格容器右下角 */
.pagination-wrapper {
  position: absolute;
  bottom: -15px;
  right: 0;
  z-index: 10;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
}

/* 绛涢€夋爮 */
.filter-bar {
  margin-bottom: 16px;
  flex-shrink: 0;
}
</style>
