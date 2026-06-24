/**
 * 初始化检查中间件（全局）
 * 检查系统是否已初始化（是否有超级管理员），未初始化则跳转登录页进行初始化
 * 检查成功后会缓存结果，避免每次路由切换都调用 API
 */
let _initialized: boolean | null = null

export default defineNuxtRouteMiddleware(async (to) => {
  // 登录页本身不需要检查（初始化表单就在登录页）
  if (to.path === '/login') return

  // 已缓存为已初始化，直接放行
  if (_initialized === true) return

  try {
    const res = await $fetch("/api/users/check")
    if (res?.exists) {
      _initialized = true
      return
    }
    // 未初始化，跳转登录页
    return navigateTo("/login")
  } catch {
    // 后端不可用时，放行
    _initialized = true
  }
})
