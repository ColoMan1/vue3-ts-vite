import { default } from '../../plugins/element-plus';
<template>
  <AdminDialog
    :title="props.adminId == null ? '新增' : '编辑'"
    @closed="emit('update:admin-id', null)"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item
        label="管理员账号"
        prop="account"
      >
        <el-input
          v-model="formData.account"
          placeholder="请输入管理员账号"
        />
      </el-form-item>
      <el-form-item
        label="管理员密码"
        prop="pwd"
      >
        <el-input
          v-model="formData.pwd"
          type="password"
          placeholder="请输入管理员密码"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="conf_pwd"
      >
        <el-input
          v-model="formData.conf_pwd"
          type="password"
          placeholder="请输入确认密码"
        />
      </el-form-item>
      <el-form-item
        label="管理员姓名"
        prop="real_name"
      >
        <el-input
          v-model="formData.real_name"
          placeholder="请输入管理员姓名"
        />
      </el-form-item>
      <el-form-item
        label="管理员身份"
        prop="roles"
      >
        <el-select
          v-model="formData.roles"
          multiple
          placeholder="请选择管理员身份"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.status">
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </AdminDialog>
</template>

<script setup lang='ts'>
import { ISelectOptions } from '@/api/types/admin'
import { PropType } from 'vue'
import { getAdminIdentity } from '../../../api/admin'

const props = defineProps({
  adminId: { // 编辑的管理员id
    type: Number as PropType<number | null>,
    default: null
  }
})
interface IEmit {
    (e: 'update:admin-id', val: number | null): void
}
const emit = defineEmits<IEmit>()
// 表单loading
const formLoading = ref(false)
// 初始化表单数据
let roles = reactive<ISelectOptions[]>([])
interface IFormData {
  account: string
  pwd: string
  conf_pwd: string
  roles: ISelectOptions[]
  real_name: string
  status: number
}
const formData = reactive<IFormData>({
  account: '',
  pwd: '',
  conf_pwd: '',
  roles: [],
  real_name: '',
  status: 0
})
const formRules = {
  account: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入管理员密码', trigger: 'blur' }
  ],
  conf_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' }
  ],
  roles: [
    { required: true, message: '请选择管理员角色', trigger: 'blur' }
  ],
  real_name: [
    { required: true, message: '请输入管理员姓名', trigger: 'blur' }
  ]
}
// 生命周期
onMounted(() => {
  formLoading.value = true
  getAdminIdentity().then(response => {
    roles = response
  })
  formLoading.value = false
})
</script>

<style lang='stylus' scoped></style>
