/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '../store/index'
import router from '../router/index'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})
// 请求锁，防止重复请求
let isRefresh = false

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 统一设置用户身份 Token
    const user = store.state.user
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
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
    // 正常情况
    const status = response.data.status
    if (!status || status === 200) {
      return response
    }
    // token过期单独处理
    if (status === 410000) {
      if (isRefresh) return Promise.reject(response)
      isRefresh = true
      ElMessageBox.confirm('登录验证过期请重新登录', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确认'
      }).then(() => {
        // 清除当前登录状态
        store.commit('setUser', null)
        router.push({
          path: '/login',
          query: {
            redirect: router.currentRoute.value.fullPath
          }
        })
      }).finally(() => {
        isRefresh = false
      })
      return Promise.reject(response)
    }
    // 错误情况
    ElMessage({
      type: 'error',
      message: response.data.msg,
      duration: 5 * 1000
    })
    return Promise.reject(response)

    // if (response.data.status && response.data.status !== 200) {
    //   ElMessage({
    //     type: 'error',
    //     message: response.data.msg,
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(response)
    // }
    // return response
  },
  async err => {
    return await Promise.reject(err)
  }
)

export default async <T>(config: AxiosRequestConfig) => {
  const res = await request(config)
  return (res.data.data || res.data) as T
}
