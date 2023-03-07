import request from '../utils/request'
import { Admin, IListParmas, ICreateAdmin, IFormData } from './types/admin'

// 管理员列表
export const getAdmins = (params: IListParmas) => {
  return request<{
    count: number,
    list: Admin[]
  }>({
    method: 'GET',
    url: '/setting/admin',
    params
  })
}
// 管理员添加
export const createAdmin = (data: ICreateAdmin) => {
  return request<{
    count: number,
    list: Admin[]
  }>({
    method: 'POST',
    url: '/setting/admin',
    data
  })
}
// 修改管理员
export const updateAdmin = (id: number, data: ICreateAdmin) => {
  return request({
    method: 'PUT',
    url: `/setting/admin/${id}`,
    data
  })
}
// 删除管理员
export const deleteAdmin = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/setting/admin/${id}`
  })
}
// 更新管理员状态
export const updateAdminStatus = (id: number, status: number) => {
  return request({
    method: 'PUT',
    url: `/setting/set_status/${id}/${status}`
  })
}
// 过去管理员身份数据
export const getAdminIdentity = () => {
  return request<IFormData>({
    method: 'GET',
    url: '/setting/admin/create'
  }).then(res => {
    const data = res.rules.find(item => item.field === 'roles')
    if (data && data.options?.length) {
      return data?.options
    }
    return []
  })
}
