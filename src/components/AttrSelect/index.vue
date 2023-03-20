import { PropType } from 'vue';
<template>
  <el-space
    direction="horizontal"
  >
    <el-select
      v-model="selectValue"
      class="m-2"
      placeholder="Select"
      size="large"
    >
      <el-option
        v-for="item in props.modelValue"
        :key="item.id"
        :label="item.rule_name"
        :value="item.id"
      />
    </el-select>
    <el-button type="primary">
      确认
    </el-button>
  </el-space>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
interface IAttrModelVariable {
    id: number
    rule_name: string
}
const props = defineProps({
  modelValue: {
    type: Array as PropType<IAttrModelVariable[]>,
    default: () => []
  }
})
const selectValue = ref()
</script>

<style lang='stylus' scoped></style>
