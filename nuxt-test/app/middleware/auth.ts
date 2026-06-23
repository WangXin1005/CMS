/**
 * 认证路由中间件
 * 检查是否存在 auth_token Cookie，不存在则重定向到登录页
 */
export default defineNuxtRouteMiddleware(() => {
    const token = useCookie("auth_token")
    if (!token.value) {
        return navigateTo('/login')
    }
})