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

  // 路由滚动行为：切换路由时回到页面顶部
  router: {
    options: {
      scrollBehavior() {
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
        'dayjs',
        'dayjs/plugin/*.js',
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
