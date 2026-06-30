// Vitest 测试配置 — Nuxt 4 项目
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 使用 happy-dom 模拟浏览器环境
    environment: 'happy-dom',
    // 全局测试 API（无需手动 import describe/it/expect）
    globals: true,
    // 测试文件匹配规则
    include: ['app/**/*.{test,spec}.{js,ts,vue}', 'tests/**/*.{test,spec}.{js,ts,vue}'],
    // 排除目录
    exclude: ['node_modules', '.nuxt', '.output', 'dist'],
    // 覆盖率配置
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['app/**/*.{vue,ts,js}'],
      exclude: ['app/**/*.d.ts'],
    },
  },
})
