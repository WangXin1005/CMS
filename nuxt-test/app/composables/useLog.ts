/**
 * useLog — 操作日志查询组合式函数
 */
import request from '~/utils/request'

export const useLog = () => {
  const getLogs = async (
    page: number = 1,
    size: number = 20,
    filters?: { username?: string; action?: string; entity?: string },
  ) => {
    const params: Record<string, string | number | undefined> = { page, size }
    if (filters?.username) params.username = filters.username
    if (filters?.action) params.action = filters.action
    if (filters?.entity) params.entity = filters.entity
    const res = await request.get('/admin/logs', { params })
    return res.data
  }
  return { getLogs }
}
