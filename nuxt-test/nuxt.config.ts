// https://nuxt.com/docs/api/configuration/nuxt-config
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@element-plus/nuxt'],

  app: {
    head: {
      title: 'CMS',
    },
  },

  routeRules: {
    '/api/**': { proxy: 'http://localhost:8080' },
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
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  },
})
