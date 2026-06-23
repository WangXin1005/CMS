/**
 * Axios HTTP 请求工具
 * 封装基础配置和响应拦截器，统一处理 API 请求
 */
import axios from "axios"

const request = axios.create({
    baseURL: "/api",
    timeout: 5000,
    withCredentials: true
})

request.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const url = error.config?.url || ''
            // 避免在登录页上因 check/init 接口 401 导致死循环
            if (!url.includes('/users/check') && !url.includes('/users/init') && !url.includes('/auth/register')) {
                window.location.href = "/login"
            }
        }
        return Promise.reject(error)
    }
)

export default request