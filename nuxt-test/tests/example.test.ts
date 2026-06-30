// 示例测试 — 验证 Vitest 配置是否正常
import { describe, it, expect } from 'vitest'

describe('项目基础测试', () => {
  it('应能正常运行基础断言', () => {
    expect(1 + 1).toBe(2)
  })

  it('应支持异步测试', async () => {
    const result = await Promise.resolve(42)
    expect(result).toBe(42)
  })
})
