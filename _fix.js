const fs = require("fs");
const content = `/**
 * 滚动到顶部插件（仅客户端）
 *
 * 解决问题：
 *  - 浏览器硬刷新（F5）时会恢复之前的滚动位置
 *  - 从文章预览页 router.back() 返回时，异步数据加载后页面变长导致偏离顶部
 *  - 通过禁用 scrollRestoration + 路由切换后延迟滚动解决
 *  - 返回首页时从 sessionStorage 恢复滚动位置
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

  // 每次路由切换完成后处理滚动
  const router = nuxtApp.$router
  router.afterEach((to: any) => {
    // 返回首页时恢复滚动位置
    if (to.path === '/') {
      const saved = sessionStorage.getItem('indexScrollY')
      if (saved) {
        const y = parseInt(saved, 10)
        sessionStorage.removeItem('indexScrollY')
        setTimeout(() => { document.documentElement.scrollTop = y; window.scrollTo(0, y) }, 50)
        setTimeout(() => { document.documentElement.scrollTop = y; window.scrollTo(0, y) }, 150)
        setTimeout(() => { document.documentElement.scrollTop = y; window.scrollTo(0, y) }, 350)
        return
      }
    }
    // 其他页面：滚到顶部
    window.scrollTo(0, 0)
    setTimeout(() => window.scrollTo(0, 0), 100)
    setTimeout(() => window.scrollTo(0, 0), 300)
  })
})
`;
fs.writeFileSync("D:/projects/nuxtProject/nuxt-test/app/plugins/scroll-to-top.client.ts", content);
console.log("written");
