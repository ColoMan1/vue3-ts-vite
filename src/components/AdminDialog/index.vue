import { default } from '../../plugins/element-plus';
<template>
  <el-dialog
    ref="dialog"
    width="30%"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          type="primary"
          @click="emit('confirm')"
        >
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ElDialog } from 'element-plus'

type IDialog = InstanceType<typeof ElDialog>
const dialog = ref<IDialog | null>(null)

interface IEmit {
    (e: 'confirm'): void
}
const emit = defineEmits<IEmit>()

const handleCancel = () => {
  if (dialog.value?.visible) {
    dialog.value.visible = false
  }
}
</script>

<style lang='stylus' scoped></style>
