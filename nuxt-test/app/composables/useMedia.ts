/**
 * useMedia — 媒体（文件）操作组合式函数
 *
 * 所有接口需登录：
 *   upload  - POST   /api/admin/media/upload  上传文件
 *   getList - GET    /api/admin/media          媒体列表
 *   remove  - DELETE /api/admin/media/{id}     删除媒体
 */
/**
 * 媒体操作组合式函数
 * 管理接口：upload, getList, remove
 */
import request from '~/utils/request'

export const useMedia = () => {
  /** 上传文件 */
  const upload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await request.post('/admin/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
  }

  /** 获取媒体列表 */
  const getList = async () => {
    const res = await request.get('/admin/media')
    return res.data
  }

  /** 删除媒体 */
  const remove = async (id: number) => {
    const res = await request.delete(`/admin/media/${id}`)
    return res.data
  }

  return { upload, getList, remove }
}
