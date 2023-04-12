<template>
  <AdminDialog
    :title="props.adminId == null ? '新增' : '编辑'"
    @closed="closed"
    @open="handleOpen"
    @confirm="handleConfirm"
    ref="dialog"
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
          <el-radio :label="1">
            开启
          </el-radio>
          <el-radio :label="0">
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </AdminDialog>
</template>

<script setup lang='ts'>
import { ICreateAdmin, ISelectOptions } from '@/api/types/admin'
import { PropType } from 'vue'
import { getAdminIdentity, getEditAdminData, createAdmin, updateAdmin } from '../../../api/admin'
import { ElForm, ElDialog, ElMessage } from 'element-plus'
const props = defineProps({
  adminId: { // 编辑的管理员id
    type: Number as PropType<number | null>,
    default: null
  },
  defaultAttrbute: {
    type: Object,
    default (re: any) {
      console.log(re)
    }
  }
})
const aaaa = ref(props.adminId)
console.log(aaaa)
interface IEmit {
  (e: 'update:admin-id', val: number | null): void
  (e: 'success'): void
}
const emit = defineEmits<IEmit>()
// 获取dialog实例
const dialog = ref<InstanceType<typeof ElDialog> | null>(null)
// 获取弹窗实例对象
const form = ref<InstanceType<typeof ElForm> | null>(null)
// 表单loading
const formLoading = ref(false)
// 初始化表单数据
const roles = ref<ISelectOptions[]>([])

const formData = ref<ICreateAdmin>({
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
// dialog打开
const handleOpen = () => {
  formLoading.value = true
  getAdminIdentity().then(response => {
    roles.value = response
  })
  Promise.all([getAdminIdentity(), editData(props.adminId)]).finally(() => {
    formLoading.value = false
  })
}
// 获取编辑数据
const editData = (id: number | null) => {
  if (!id) {
    return
  }
  getEditAdminData(id).then(res => {
    const arr = roles.value.filter(item => {
      const temporary = item.value + ''
      const arrRoles = [...res.roles].filter(single => {
        return !isNaN(parseInt(single))
      })
      return arrRoles.includes(temporary)
    })
    formData.value = res
    const data = formData.value.roles
    data.splice(0, data.length)
    arr.forEach(item => {
      data.push(item.label)
    })
  })
}
// 弹窗关闭
const closed = () => {
  emit('update:admin-id', null)
  form.value?.clearValidate()
  form.value?.resetFields()
}
// 确定提交
const handleConfirm = async () => {
  if (!form.value?.validate()) return
  if (props.adminId) {
    await updateAdmin(props.adminId, formData.value)
  } else {
    await createAdmin(formData.value)
  }
  emit('success')
  ElMessage.success('提交成功')
}
</script>

<style lang='stylus' scoped></style>
