/**
 * 初始化检查中间件（全局）
 * 首次访问时阻塞等待检查结果，之后使用缓存。
 */
let _initialized: boolean | null = null
let _pending: Promise<void> | null = null

export default defineNuxtRouteMiddleware(async (to) => {
  // 进入 /login 时重置缓存，确保初始化后能正确识别
  if (to.path === '/login') {
    _initialized = null;
    _pending = null;
    return;
  }

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
        // API 不可达时不缓存结果，下次请求重试
        _pending = null
      })
  }

  await _pending

  // API 调用失败时 _pending 被重置，跳过后续判断
  if (_initialized === false && to.path !== '/login') {
    return navigateTo('/login')
  }
})