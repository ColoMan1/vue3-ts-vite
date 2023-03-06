import { default } from '../../plugins/element-plus';
<template>
  <el-dialog
    ref="dialog"
    :title="props.adminId == null ? '新增' : '编辑'"
    width="30%"
    @closed="emit('update:admin-id', null)"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ElDialog } from 'element-plus'
import { PropType } from 'vue'

const props = defineProps({
  adminId: { // 编辑的管理员id
    type: Number as PropType<number | null>,
    default: null
  }
})
type IDialog = InstanceType<typeof ElDialog>
const dialog = ref<IDialog | null>(null)
interface IEmit {
    (e: 'update:admin-id', val: number | null): void
}
const emit = defineEmits<IEmit>()

const handleCancel = () => {
  if (dialog.value?.visible) {
    dialog.value.visible = false
  }
}
</script>

<style lang='stylus' scoped></style>
