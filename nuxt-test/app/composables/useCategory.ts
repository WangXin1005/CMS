/**
 * useCategory — 分类操作组合式函数
 *
 * 公开接口：getList / getBySlug
 * 管理接口（需 ADMIN/SUPERADMIN）：create / update / remove
 */
/**
 * 分类操作组合式函数 - 封装文章分类的 API 请求
 * 公开：getList, getBySlug | 管理：create, update, remove
 */
import request from '~/utils/request'

export const useCategory = () => {
  const getList = async () => {
    const res = await request.get('/categories')
    return res.data
  }
  const getBySlug = async (slug: string) => {
    const res = await request.get(`/categories/${slug}`)
    return res.data
  }
  const create = async (data: { name: string; slug: string; description?: string; sortOrder?: number }) => {
    const res = await request.post('/admin/categories', data)
    return res.data
  }
  const update = async (id: number, data: { name?: string; slug?: string; description?: string; sortOrder?: number }) => {
    const res = await request.put(`/admin/categories/${id}`, data)
    return res.data
  }
  const remove = async (id: number) => {
    const res = await request.delete(`/admin/categories/${id}`)
    return res.data
  }
  return { getList, getBySlug, create, update, remove }
}
