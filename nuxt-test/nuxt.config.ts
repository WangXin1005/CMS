// https://nuxt.com/docs/api/configuration/nuxt-config
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
