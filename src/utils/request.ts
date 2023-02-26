/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 统一设置用户身份 Token
    return config
  },
  async error => {
    return await Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 统一处理响应错误，例如 token 无效、服务端异常等
    if (response.data.status && response.data.status !== 200) {
      ElMessage({
        type: 'error',
        message: response.data.msg,
        duration: 5 * 1000
      })
      return Promise.reject(response.data)
    }
    return response
  },
  async err => {
    return await Promise.reject(err)
  }
)

export default async <T>(config: AxiosRequestConfig) => {
  const res = await request(config)
  return (res.data.data || res.data) as T
}
