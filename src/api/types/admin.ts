import { FormItemRule } from 'element-plus/packages/form/src/form.type'

export interface IListParmas {
    page: number
    limit: number
    name: string
    roles: string
    status: 0 | 1 | ''
}

export interface Admin {
    id: number
    account: string
    head_pic: string
    pwd: string
    real_name: string
    roles: string
    last_ip: string
    last_time: number
    add_time: number
    login_count: number
    level: number
    status: number
    is_del: number
    _add_time: string
    _last_time: string
    statusLoading?: boolean
}

export interface ICreateAdmin {
    account: string
    conf_pwd: string
    pwd: string
    roles: string
    status: number
    real_name: string
}
// admin-form
export interface ISelectOptions {
    label: string
    value: number
}

export interface IFormRule {
    title: string
    field: string
    props?: Record<string, any>
    type: string
    validate?: FormItemRule[]
    value: string
    options?: ISelectOptions[]
}

export interface IFormData {
    action: string
    info: string
    method: string
    status: boolean
    title: string
    rules: IFormRule[]
}
