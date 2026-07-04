/**
 * 初始化检查中间件（全局）
 * 首次访问时阻塞等待检查结果，之后使用缓存。
 */
let _initialized: boolean | null = null
let _pending: Promise<void> | null = null

export default defineNuxtRouteMiddleware(async (to) => {
  // 已缓存结果
  if (_initialized !== null) {
    if (_initialized === false && to.path !== '/login') {
      return navigateTo('/login')
    }
    return
  }

  // 首次检查：复用同一个 Promise 避免并发请求
  if (!_pending) {
    _pending = $fetch('/api/users/check')
      .then((res: { exists?: boolean }) => {
        _initialized = res?.exists === true
      })
      .catch(() => {
        _initialized = true
      })
  }

  await _pending

  if (_initialized === false && to.path !== '/login') {
    return navigateTo('/login')
  }
})