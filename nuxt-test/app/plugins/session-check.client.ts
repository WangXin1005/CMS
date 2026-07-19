/**
 * 客户端会话检查插件
 * 浏览器重启后 sessionStorage 清空但 cookie 可能残留，
 * 在每次路由切换后检查一致性，不一致则清除 cookie 跳转登录。
 */
export default defineNuxtPlugin(() => {
  const router = useRouter()
  const token = useCookie('auth_token')
  const username = useCookie('username')
  const role = useCookie('user_role')

  router.afterEach((to) => {
    // 跳过登录页和公开首页
    if (to.path === '/login' || to.path === '/' || to.path.startsWith('/article/')) return

    // cookie 有 token 但 sessionStorage 无标记 → 浏览器重启 → 清 cookie 跳登录
    if (token.value && !sessionStorage.getItem('auth_session')) {
      token.value = ''
      username.value = ''
      role.value = ''
      router.push('/login')
    }
  })
})