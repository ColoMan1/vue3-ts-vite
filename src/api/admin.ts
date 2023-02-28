import request from '../utils/request'
import { Admin, IListParmas } from './types/admin'

export const getAdmins = (data: IListParmas) => {
  return request<Admin>({
    method: 'GET',
    url: '/login/info'
  })
}
