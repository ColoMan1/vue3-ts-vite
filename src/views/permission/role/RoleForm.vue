<template>
  <admin-dialog
    :title="props.roleId ? '编辑角色' : '添加角色'"
    @confirm="handleSubmit"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item
        label="角色名称"
        prop="role_name"
      >
        <el-input
          v-model="formData.role_name"
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">
            开启
          </el-radio>
          <el-radio :label="0">
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          ref="tree"
          node-key="id"
          show-checkbox
          :data="menus"
          :props="{
            label: 'title'
          }"
        />
      </el-form-item>
    </el-form>
  </admin-dialog>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import type { PropType } from 'vue'
import { ElMessage, ElForm, ElTree, FormItemRule } from 'element-plus'
import { getMenus, getRole, saveRole } from '@/api/role'
import type { Menu } from '@/api/types/role'

const props = defineProps({
  roleId: { // 编辑的管理员 ID
    type: Number as PropType<number | null>,
    default: null
  }
})

interface EmitsType {
    (e: 'update:role-id', value: number | null): void
    (e: 'success'): void
}

const emit = defineEmits<EmitsType>()

const form = ref<InstanceType<typeof ElForm> | null>(null)
const formLoading = ref(false)
const formData = ref({
  role_name: '',
  status: 0 as 0 | 1,
  checked_menus: [] as number[]
})
const menus = ref<Menu[]>([]) // 菜单列表

const formRules: Record<string, FormItemRule[]> = {
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
}

const tree = ref<InstanceType<typeof ElTree> | null>(null)

const handleDialogOpen = async () => {
  formLoading.value = true
  props.roleId
    ? await loadRole().finally(() => { formLoading.value = false })
    : await loadMenus().finally(() => { formLoading.value = false })
}

const loadMenus = async () => {
  const data = await getMenus()
  menus.value = data.menus
}

const loadRole = async () => {
  if (!props.roleId) return
  const { menus: menusData, role } = await getRole(props.roleId)
  menus.value = menusData
  await nextTick() // 菜单树渲染完成后处理后面的操作
  formData.value.role_name = role.role_name
  formData.value.status = role.status
  role.rules.split(',').forEach(item => {
    if (tree.value?.getNode(Number(item)).isLeaf) {
      tree.value?.setChecked(Number(item), true, true)
    }
  })
}

const handleDialogClosed = () => {
  emit('update:role-id', null)
  form.value?.clearValidate() // 清除验证结果
  form.value?.resetFields() // 清除表单数据
}

const handleSubmit = async () => {
  const valid = await form.value?.validate()
  if (!valid) {
    return
  }
  // 添加 / 更新角色
  formData.value.checked_menus = [
    ...tree.value?.getHalfCheckedKeys() as any,
    ...tree.value?.getCheckedKeys() as any
  ]
  await saveRole(props.roleId || 0, formData.value)
  emit('success')
  ElMessage.success('保存成功')
}

</script>

<style lang="scss" scoped>
.el-select {
    width: 100%;
}

.el-tree {
    height: 250px;
    overflow: auto;
}
</style>
