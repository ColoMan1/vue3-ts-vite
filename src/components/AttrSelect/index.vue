import { PropType } from 'vue';
<template>
  <el-space direction="vertical">
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
      <el-button>添加规格模板</el-button>
    </el-space>
    <el-space
      direction="vertical"
    >
      <template
        v-for="details in ruleData"
        :key="details.id"
      >
        <div>{{ details.value }}</div>
        <el-space
          direction="horizontal"
        >
          <el-tag
            v-for="single in details.detail"
            :key="single"
          >
            {{ single }}
          </el-tag>
        </el-space>
      </template>
    </el-space>
    <el-space>
      <el-button>添加新规格</el-button>
      <el-button @click="immediateGeneration">
        立即生成
      </el-button>
    </el-space>
  </el-space>
</template>

<script lang='ts' setup>
import { generateAttr } from '@/api/product'
import { AttrRuleValue, ProductAttrTpl } from '@/api/types/product'
import { PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array as PropType<ProductAttrTpl[]>,
    default: () => []
  }
})
// 选择规格
const selectValue = ref<number>()
// 规格数据
const ruleData = ref<AttrRuleValue[] | undefined>([])
// 点击确认按钮
const confrim = () => {
  if (typeof selectValue.value === 'undefined') return
  ruleData.value = props.modelValue.find(item => item.id === selectValue.value)?.rule_value
}
// 点击立即生成
const immediateGeneration = async () => {
  await generateAttr(0, 1, {
    attrs: ruleData.value as AttrRuleValue[]
  })
}
</script>

<style lang='stylus' scoped></style>
