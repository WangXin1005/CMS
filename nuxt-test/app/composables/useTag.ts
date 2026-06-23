/**
 * useTag — 标签操作组合式函数
 *
 * 公开接口：getList / getBySlug
 * 管理接口（需 ADMIN/SUPERADMIN）：create / update / remove
 */
/**
 * 标签操作组合式函数 - 封装文章标签的 API 请求
 * 公开：getList, getBySlug | 管理：create, update, remove
 */
import request from '~/utils/request'

export const useTag = () => {
  const getList = async () => {
    const res = await request.get('/tags')
    return res.data
  }
  const getBySlug = async (slug: string) => {
    const res = await request.get(`/tags/${slug}`)
    return res.data
  }
  const create = async (data: { name: string; slug: string }) => {
    const res = await request.post('/admin/tags', data)
    return res.data
  }
  const update = async (id: number, data: { name?: string; slug?: string }) => {
    const res = await request.put(`/admin/tags/${id}`, data)
    return res.data
  }
  const remove = async (id: number) => {
    const res = await request.delete(`/admin/tags/${id}`)
    return res.data
  }
  return { getList, getBySlug, create, update, remove }
}
