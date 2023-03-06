import { default } from '../../plugins/element-plus';
<template>
  <AdminDialog
    :title="props.adminId == null ? '新增' : '编辑'"
    @closed="emit('update:admin-id', null)"
  >
    <span>这是内容</span>
  </AdminDialog>
</template>

<script setup lang='ts'>
import { PropType } from 'vue'

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
</script>

<style lang='stylus' scoped></style>
