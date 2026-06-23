// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@element-plus/nuxt'],

  routeRules: {
    // '/': { redirect: '/home' },
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

  // nitro: {
  //   devProxy: {
  //     '/api': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true,
  //     },
  //   },
  // }

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
