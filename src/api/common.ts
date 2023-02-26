/* eslint-disable @typescript-eslint/explicit-function-return-type */
import request from '../utils/request'
import { ILoginInfo, ILoginResponse } from './types/common'
// interface ResponseData<T = any> {
//     status: string,
//     msg: String,
//     data: T
// }

// export const loginInfo = () => {
//     return request.get<ResponseData<{
//         logo_square: string
//         logo_rectangle: string
//         login_logo: string
//         slide: string[]
//     }>>('/login/info')
// }

export const loginInfo = () => {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/login/info'
  })
}
export const loadCaptcha = () => {
  return request<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    params: { // 给接口加一个时间戳
      stamp: Date.now()
    },
    responseType: 'blob'
  })
}
export const Login = (data: {
  account: string
  pwd: string
  imgcode: string
}) => {
  return request<ILoginResponse>({
    method: 'post',
    url: '/login',
    data
  })
}
