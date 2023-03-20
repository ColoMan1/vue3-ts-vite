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
    <el-button
      type="primary"
      @click="confrim"
    >
      确认
    </el-button>
  </el-space>
  <el-space
    direction="vertical"
  >
    <template
      v-for="details in rule"
      :key="details.id"
    >
      <div>
        {{ details }}
      </div>
    </template>
  </el-space>
</template>

<script lang='ts' setup>
import { ProductAttrTpl } from '@/api/types/product'
import { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<ProductAttrTpl[]>,
    default: () => []
  }
})
const selectValue = ref()

const rule = computed(() => {
  return props.modelValue.map(item => item.rule_value)
})
// 点击确认按钮
const confrim = () => {

}
</script>

<style lang='stylus' scoped></style>
