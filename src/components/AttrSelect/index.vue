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
        <Draggable v-model="ruleData">
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
                  <Draggable v-model="details.detail">
                    <el-tag
                      closable
                      v-for="(single, idx) in details.detail"
                      :key="single"
                      @close="details.detail.splice(idx, 1)"
                    >
                      {{ single }}
                    </el-tag>
                  </Draggable>
                  <el-input
                    v-if="details.inputVisible"
                    ref="InputRef"
                    v-model="details.inputValue"
                    class="ml-1 w-20"
                    size="small"
                    @keyup.enter="handleInputConfirm(details)"
                    @blur="handleInputConfirm(details)"
                  />
                  <el-button
                    v-else
                    class="button-new-tag ml-1"
                    size="small"
                    @click="showInput(details)"
                  >
                    + New Tag
                  </el-button>
                </el-space>
              </div>
            </div>
          </el-form-item>
        </Draggable>
      </el-form>
    </el-form-item>
    <el-form-item v-if="!isAdd">
      <el-space direction="horizontal">
        <el-button @click="isAdd = true">
          添加新规格
        </el-button>
        <el-button @click="immediateGeneration">
          立即生成
        </el-button>
      </el-space>
    </el-form-item>
    <el-form-item v-else>
      <el-form
        :model="attrForm"
        ref="form"
        inline
      >
        <el-form-item
          label="规格名称"
          prop="value"
        >
          <el-input v-model="attrForm.value" />
        </el-form-item>
        <el-form-item
          label="规格值"
          prop="detail"
        >
          <el-input v-model="attrForm.detail[0]" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleAddAttr"
          >
            确认
          </el-button>
          <el-button @click="isAdd = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { generateAttr } from '@/api/product'
import { AttrRuleValue, ProductAttrTpl } from '@/api/types/product'
import { PropType, nextTick, ref } from 'vue'
import { ElInput } from 'element-plus'

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
type RuleValueType = { inputValue: string, inputVisible: boolean} & AttrRuleValue
const ruleData = ref<RuleValueType[]>([])
// 点击确认按钮
const confrim = () => {
  if (typeof selectValue.value === 'undefined') return
  ruleData.value = props.modelValue.find(item => item.id === selectValue.value)!.rule_value as RuleValueType[]
  ruleData.value.forEach(item => {
    item.inputValue = ''
    item.inputVisible = false
  })
}
// 点击立即生成
const immediateGeneration = async () => {
  const generateData = await generateAttr(0, 1, {
    attrs: ruleData.value as AttrRuleValue[]
  })
  emit('generateHandle', generateData.info)
}
// 动态tag
const InputRef = ref<InstanceType<typeof ElInput>[]>([])

const showInput = async (item: RuleValueType) => {
  item.inputVisible = true
  await nextTick()
  InputRef.value.forEach((item: any) => item.focus())
}

const handleInputConfirm = (item: RuleValueType) => {
  item.inputVisible = false
  if (item.inputValue) item.detail.push(item.inputValue)
  item.inputValue = ''
}

// 新增规格数据
const attrForm = ref({
  value: '',
  detail: ['']
})

// 确认新增规格事件
const handleAddAttr = () => {
  ruleData.value.push({
    inputValue: '',
    inputVisible: false,
    value: attrForm.value.value,
    detail: attrForm.value.detail
  })
  isAdd.value = false
}
// 控制添加规格显示隐藏
const isAdd = ref(false)
</script>

<style lang='stylus' scoped></style>
