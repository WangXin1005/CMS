/**
 * useComment — 评论操作组合式函数
 *
 * 公开接口：getArticleComments / submit（提交需登录）
 * 管理接口（需 ADMIN/SUPERADMIN）：getAdminList / approve / reject / remove / getStats
 */
/**
 * 评论操作组合式函数
 * 公开：submit, getArticleComments
 * 管理：getAdminList, approve, reject, remove, getStats
 */
import request from '~/utils/request'

export const useComment = () => {
  /** 获取文章已审核评论（公开） */
  const getArticleComments = async (articleId: number) => {
    const res = await request.get(`/comments/article/${articleId}`)
    return res.data
  }

  /** 提交评论（公开，需登录） */
  const submit = async (data: { content: string; articleId: number; parentId?: number }) => {
    const res = await request.post('/comments', data)
    return res.data
  }

  /** 管理后台：评论列表 */
  const getAdminList = async (page: number = 1, size: number = 20, status?: string) => {
    const params: Record<string, string | number | undefined> = { page, size }
    if (status) params.status = status
    const res = await request.get('/admin/comments', { params })
    return res.data
  }

  /** 审核通过 */
  const approve = async (id: number) => {
    const res = await request.put(`/admin/comments/${id}/approve`)
    return res.data
  }

  /** 驳回 */
  const reject = async (id: number) => {
    const res = await request.put(`/admin/comments/${id}/reject`)
    return res.data
  }

  /** 删除 */
  const remove = async (id: number) => {
    const res = await request.delete(`/admin/comments/${id}`)
    return res.data
  }

  /** 评论统计 */
  const getStats = async () => {
    const res = await request.get('/admin/comments/stats')
    return res.data
  }

  return { getArticleComments, submit, getAdminList, approve, reject, remove, getStats }
}
