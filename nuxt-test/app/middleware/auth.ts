/**
 * 认证路由中间件
 * 检查 auth_token Cookie 是否存在且未过期，不满足则重定向到登录页
 */
export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('auth_token')
  if (!token.value) {
    return navigateTo('/login')
  }

  // 浏览器关闭后 sessionStorage 自动清空，检测到不一致则清除 token 要求重新登录（仅客户端）
  if (typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('auth_session')) {
    token.value = ''
    return navigateTo('/login')
  }

  // 客户端解析 JWT 载荷，检查是否过期（防御过期 Token 绕过）
  try {
    const parts = token.value.split('.')
    if (parts.length !== 3) {
      // 非标准 JWT 格式，清除并跳转登录
      token.value = ''
      return navigateTo('/login')
    }
    const payload = JSON.parse(atob(parts[1]))
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      // Token 已过期，清除并跳转登录
      token.value = ''
      return navigateTo('/login')
    }
  } catch {
    // Token 格式异常，清除并跳转登录
    token.value = ''
    return navigateTo('/login')
  }

})