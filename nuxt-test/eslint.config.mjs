// ESLint 扁平配置 — Nuxt 4 + Vue 3 项目代码规范检查
import nuxtConfig from '@nuxt/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'

export default nuxtConfig(
  // Nuxt 选项
  {},
  // Prettier 兼容
  eslintConfigPrettier,
  // 项目自定义规则
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      // v-html 已通过 sanitizeHtml 消毒，无需警告
      'vue/no-v-html': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
)
