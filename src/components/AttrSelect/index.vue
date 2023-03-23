import { PropType } from 'vue';
<template>
  <el-form>
    <el-form-item>
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
    </el-form-item>
    <el-form-item>
      <el-form label-position="left">
        <el-form-item
          v-for="(details, index) in ruleData"
          :key="details.value"
        >
          <template #label>
            <el-icon>
              <Edit />
            </el-icon>
          </template>
          <div>
            <div>
              <el-tag
                closable
                effect="dark"
                @close="ruleData?.splice(index, 1)"
              >
                {{ details.value }}
              </el-tag>
            </div>
            <div>
              <el-space
                direction="horizontal"
              >
                <el-tag
                  closable
                  v-for="(single, idx) in details.detail"
                  :key="single"
                  @close="details.detail.splice(idx, 1)"
                >
                  {{ single }}
                </el-tag>
              </el-space>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item v-if="ruleData?.length">
      <el-space direction="horizontal">
        <el-button>添加新规格</el-button>
        <el-button @click="immediateGeneration">
          立即生成
        </el-button>
      </el-space>
    </el-form-item>
  </el-form>
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
const emit = defineEmits(['generateHandle'])

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
  const generateData = await generateAttr(0, 1, {
    attrs: ruleData.value as AttrRuleValue[]
  })
  emit('generateHandle', generateData.info)
}
</script>

<style lang='stylus' scoped></style>
