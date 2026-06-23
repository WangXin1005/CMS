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
