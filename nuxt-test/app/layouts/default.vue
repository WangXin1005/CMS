<!-- default 甯冨眬 鈥?绠＄悊鍚庡彴鏍囧噯甯冨眬锛欻eader + Menu + 鍐呭鍖?-->
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
  padding-bottom: 24px;
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
}

/* 鍒嗛〉瀹瑰櫒 */
.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 绛涢€夋爮 */
.filter-bar {
  margin-bottom: 16px;
  flex-shrink: 0;
}
</style>
