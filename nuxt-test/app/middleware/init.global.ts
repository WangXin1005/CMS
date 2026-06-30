/**
 * 初始化检查中间件（全局）
 * 后台检查系统是否已初始化（是否有超级管理员），非阻塞，仅缓存结果。
 * 若已知系统未初始化，则跳转登录页；登录页自身通过 useAuth 判断 init/login 模式。
 * 其他路由均直接放行，不阻塞页面渲染。
 */
let _initialized: boolean | null = null

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/login') {
    if (_initialized === null) {
      $fetch('/api/users/check')
        .then((res: { exists?: boolean }) => {
          _initialized = res?.exists === true
        })
        .catch(() => {
          _initialized = true
        })
    }
    return
  }
  if (_initialized === true) return
  if (_initialized === false) return navigateTo('/login')
  $fetch('/api/users/check')
    .then((res: { exists?: boolean }) => {
      _initialized = res?.exists === true
      if (_initialized === false) navigateTo('/login')
    })
    .catch(() => {
      _initialized = true
    })
})
