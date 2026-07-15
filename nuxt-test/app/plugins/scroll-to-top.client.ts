/**
 * 滚动到顶部插件（仅客户端）
 *
 * 解决问题：
 *  - 浏览器硬刷新（F5）时会恢复之前的滚动位置
 *  - 从文章预览页 router.back() 返回时，异步数据加载后页面变长导致偏离顶部
 *  - 通过禁用 scrollRestoration + 路由切换后延迟滚动解决
 */
export default defineNuxtPlugin((nuxtApp) => {
  // 禁用浏览器自带的滚动位置恢复
  if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  // Nuxt 应用首次挂载完成后，滚动到顶部
  nuxtApp.hook('app:mounted', () => {
    window.scrollTo(0, 0)
  })

  // 每次路由切换完成后延迟滚动到顶部（等待异步数据渲染）
  const router = nuxtApp.$router
  router.afterEach(() => {
    // 先立即滚一次，再延迟等待异步数据加载后的 DOM 高度变化
    window.scrollTo(0, 0)
    setTimeout(() => window.scrollTo(0, 0), 100)
    setTimeout(() => window.scrollTo(0, 0), 300)
  })
})
