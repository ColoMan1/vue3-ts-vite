<template>
  <div ref="drag">
    <slot />
  </div>
</template>

<script lang='ts' setup>
import Sortable from 'sortablejs'
import { PropType } from 'vue'

const porps = defineProps({
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => []
  }
})
const emit = defineEmits<{(e: 'update:modelValue', val: any[]): void
}>()
const drag = ref<HTMLDivElement | null>(null)

onMounted(() => {
  initCreate()
})
const initCreate = () => {
  if (!drag.value) {
    throw new Error('容器不能为空')
  }
  const sortable = Sortable.create(drag.value, {
    animation: 500,
    onUpdate: function (evt) {
      const oldIdx = evt.oldIndex
      const newIdx = evt.newIndex
      if (typeof oldIdx !== 'number' || typeof newIdx !== 'number') return
      const arr = [...porps.modelValue]
      const temporary = arr.splice(oldIdx, 1)[0]
      arr.splice(newIdx, 0, temporary)
      emit('update:modelValue', arr)
    }
  })
  console.log(sortable)
}
</script>
