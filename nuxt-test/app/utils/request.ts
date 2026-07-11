/**
 * Axios HTTP 请求工具
 * 封装基础配置和响应拦截器，统一处理 API 请求
 *
 * 拦截器策略：
 * - 失败：后端返回 message 则自动弹出错误提示
 * - 成功：由页面自行处理（上下文相关，如"创建成功"/"更新成功"）
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  withCredentials: true,
})

request.interceptors.response.use(
  (response) => response,
  (error) => {
    // 后端返回 message 时自动弹出错误提示
    if (error.response?.data?.message) {
      ElMessage.error(error.response.data.message)
    }
    if (error.response?.status === 401) {
      const url = error.config?.url || ''
      if (
        !url.includes('/users/check') &&
        !url.includes('/users/init') &&
        !url.includes('/auth/register') && !url.includes('/auth/login')
      ) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export default request
