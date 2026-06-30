/**
 * useArticle — 文章操作组合式函数
 *
 * 封装文章相关的所有 API 请求，按接口类型分为两组：
 * - 公开接口（无需登录）：getPublished / getBySlug / getStats
 * - 管理接口（需 ADMIN/SUPERADMIN）：getAdminList / getById / create / update / remove
 *
 * 所有方法均返回 Promise，数据为后端响应的 data 字段（axios 拦截层自动解包）。
 */
/**
 * 文章操作组合式函数
 * 封装文章相关的所有 API 请求
 *
 * 公开接口（无需登录）：
 *   getPublished  - GET /api/articles       已发布文章列表
 *   getBySlug     - GET /api/articles/{slug} 文章详情
 *   getStats      - GET /api/articles/stats  文章统计
 *
 * 管理接口（需 ADMIN/SUPERADMIN）：
 *   getAdminList  - GET  /api/admin/articles      文章管理列表
 *   getById       - GET  /api/admin/articles/{id}  文章详情(管理)
 *   create        - POST /api/admin/articles       创建文章
 *   update        - PUT  /api/admin/articles/{id}  更新文章
 *   remove        - DELETE /api/admin/articles/{id} 删除文章
 */
import request from '~/utils/request'

export const useArticle = () => {
  // ===== 公开接口 =====

  const getPublished = async (
    page: number = 1,
    size: number = 10,
    filters?: { categoryId?: number; tagId?: number; keyword?: string },
  ) => {
    const params: Record<string, string | number | undefined> = { page, size }
    if (filters?.categoryId) params.categoryId = filters.categoryId
    if (filters?.tagId) params.tagId = filters.tagId
    if (filters?.keyword) params.keyword = filters.keyword
    const res = await request.get('/articles', { params })
    return res.data
  }

  const getBySlug = async (slug: string) => {
    const res = await request.get(`/articles/${slug}`)
    return res.data
  }

  const getStats = async () => {
    const res = await request.get('/articles/stats')
    return res.data
  }

  /** 获取最近文章（登录用户可用，无需 ADMIN 权限，含草稿） */
  const getRecent = async (page: number = 1, size: number = 5) => {
    const res = await request.get('/articles/recent', { params: { page, size } })
    return res.data
  }

  // ===== 个人文章接口（USER 角色可用） =====

  /** 获取我的文章列表（所有已登录用户可用） */
  const getMyArticles = async (
    page: number = 1,
    size: number = 20,
    status?: string,
    keyword?: string,
    categoryId?: number,
    tagId?: number,
  ) => {
    const params: Record<string, string | number | undefined> = { page, size }
    if (status) params.status = status
    if (keyword) params.keyword = keyword
    if (categoryId) params.categoryId = categoryId
    if (tagId) params.tagId = tagId
    const res = await request.get('/articles/my', { params })
    return res.data
  }

  /** 获取我的文章详情 */
  const getMyArticleById = async (id: number) => {
    const res = await request.get(`/articles/my/${id}`)
    return res.data
  }
  /** 创建我的文章 */
  const createMyArticle = async (data: {
    title: string
    slug: string
    content?: string
    summary?: string
    coverImage?: string
    status?: string
    categoryId?: number
    tagIds?: number[]
  }) => {
    const res = await request.post('/articles/my', data)
    return res.data
  }

  /** 更新我的文章 */
  const updateMyArticle = async (
    id: number,
    data: {
      title?: string
      slug?: string
      content?: string
      summary?: string
      coverImage?: string
      status?: string
      visibility?: string
      categoryId?: number
      tagIds?: number[]
    },
  ) => {
    const res = await request.put(`/articles/my/${id}`, data)
    return res.data
  }

  /** 删除我的文章 */
  const removeMyArticle = async (id: number) => {
    const res = await request.delete(`/articles/my/${id}`)
    return res.data
  }
  // ===== 管理接口 =====

  const getAdminList = async (
    page: number = 1,
    size: number = 20,
    status?: string,
    keyword?: string,
    categoryId?: number,
    tagId?: number,
    authorId?: number,
  ) => {
    const params: Record<string, string | number | undefined> = { page, size }
    if (status) params.status = status
    if (keyword) params.keyword = keyword
    if (categoryId) params.categoryId = categoryId
    if (tagId) params.tagId = tagId
    if (authorId) params.authorId = authorId
    const res = await request.get('/admin/articles', { params })
    return res.data
  }

  const getById = async (id: number) => {
    const res = await request.get(`/admin/articles/${id}`)
    return res.data
  }

  const create = async (data: {
    title: string
    slug: string
    content?: string
    summary?: string
    coverImage?: string
    status?: string
    categoryId?: number
    tagIds?: number[]
  }) => {
    const res = await request.post('/admin/articles', data)
    return res.data
  }

  const update = async (
    id: number,
    data: {
      title?: string
      slug?: string
      content?: string
      summary?: string
      coverImage?: string
      status?: string
      visibility?: string
      categoryId?: number
      tagIds?: number[]
    },
  ) => {
    const res = await request.put(`/admin/articles/${id}`, data)
    return res.data
  }

  const remove = async (id: number) => {
    const res = await request.delete(`/admin/articles/${id}`)
    return res.data
  }

  return {
    getPublished,
    getBySlug,
    getStats,
    getRecent,
    getMyArticles,
    getMyArticleById,
    createMyArticle,
    updateMyArticle,
    removeMyArticle,
    getAdminList,
    getById,
    create,
    update,
    remove,
  }
}
