// https://nuxt.com/docs/api/configuration/nuxt-config
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@element-plus/nuxt'],

  app: {
    head: {
      title: 'CodeBlog',
        link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  routeRules: {
    '/api/**': { proxy: process.env.NUXT_API_PROXY_TARGET || 'http://localhost:8080' },
  },

  // 路由滚动行为：返回首页时恢复位置，其他情况滚到顶部
  router: {
    options: {
      scrollBehavior(_to: any, _from: any, savedPosition: any) {
        if (savedPosition) return savedPosition
        // 导航到首页时不强制滚动（由页面自行控制）
        if (_to.path === '/') return false
        return { top: 0, behavior: 'instant' as const }
      },
    },
  },

  elementPlus: {
    locale: zhCn,
  },
  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api',
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        'axios',
        'dayjs',
        'dayjs/plugin/*.js',
        'isomorphic-dompurify',
        'lodash-unified',
        'sortablejs',
      ],
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.NUXT_API_PROXY_TARGET || 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  },
})
