<template>
  <page-container>
    <app-card>
      <template #header>
        <el-button
          icon="el-icon-back"
          @click="$router.back()"
        >
          返回
        </el-button>
      </template>
      <el-form
        ref="form"
        :model="product"
        label-width="100px"
      >
        <el-form-item
          label="商品名称"
          prop="store_name"
        >
          <el-input v-model="product.store_name" />
        </el-form-item>
        <el-form-item
          label="商品分类"
          prop="cate_id"
        >
          <el-select
            v-model="product.cate_id"
            multiple
            style="width: 50%;"
          >
            <el-option
              v-for="item in productCates"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
              :disabled="item.pid === 0"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品关键字"
          prop="keyword"
        >
          <el-input v-model="product.keyword" />
        </el-form-item>
        <el-form-item
          label="单位"
          prop="unit_name"
        >
          <el-input v-model="product.unit_name" />
        </el-form-item>
        <el-form-item
          label="商品简介"
          prop="store_info"
        >
          <el-input
            type="textarea"
            v-model="product.store_info"
            autosize
          />
        </el-form-item>
        <el-form-item
          label="商品封面图(最多1张)"
          prop="image"
        >
          xxx
        </el-form-item>
        <el-form-item
          label="商品推荐图(最多1张)"
          prop="recommend_image"
        >
          xxx
        </el-form-item>
        <el-form-item
          label="商品轮播图(最多10张)"
          prop="slider_image"
        >
          xxx
        </el-form-item>
        <el-form-item
          label="商品规格"
          prop="spec_type"
          class="auto-scroll"
        >
          <el-radio-group v-model="product.spec_type">
            <el-radio :label="0">
              单规格
            </el-radio>
            <el-radio :label="1">
              多规格
            </el-radio>
          </el-radio-group>
          <!-- 单规格 -->
          <AttrTable
            v-if="product.spec_type === 0"
            v-model="singleAttrData"
          />
        </el-form-item>
        <el-form-item
          v-if="product.spec_type === 1"
          class="multi-attr-form_item"
          label="规格模板"
        >
          <el-space
            direction="vertical"
            fill
            style="width: 100%;"
            alignment="flex-start"
          />
        </el-form-item>
        <el-form-item
          label="商品详情"
          prop="description"
        >
          <Editor
            ref="editor"
            v-model:editorValue="product.description"
          />
        </el-form-item>
        <el-form-item
          label="虚拟销量"
          prop="ficti"
        >
          <el-input-number
            v-model="product.ficti"
            :min="0"
            label="请输入虚拟销量"
          />
        </el-form-item>
        <el-form-item
          label="额外赠送积分"
          prop="give_integral"
        >
          <el-input-number
            v-model="product.give_integral"
            :min="0"
            label="请输入额外赠送积分"
          />
        </el-form-item>
        <el-form-item
          label="排序"
          prop="sort"
        >
          <el-input-number
            v-model="product.sort"
            :min="0"
            label="请输入排序"
          />
        </el-form-item>
        <el-form-item
          label="商品状态"
          prop="is_show"
        >
          <el-radio-group v-model="product.is_show">
            <el-radio :label="1">
              上架
            </el-radio>
            <el-radio :label="0">
              下架
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="热卖单品"
          prop="is_hot"
        >
          <el-radio-group v-model="product.is_hot">
            <el-radio :label="1">
              开启
            </el-radio>
            <el-radio :label="0">
              关闭
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="促销单品"
          prop="is_benefit"
        >
          <el-radio-group v-model="product.is_benefit">
            <el-radio :label="1">
              开启
            </el-radio>
            <el-radio :label="0">
              关闭
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="精品推荐"
          prop="is_best"
        >
          <el-radio-group v-model="product.is_best">
            <el-radio :label="1">
              开启
            </el-radio>
            <el-radio :label="0">
              关闭
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="首发新品"
          prop="is_new"
        >
          <el-radio-group v-model="product.is_new">
            <el-radio :label="1">
              开启
            </el-radio>
            <el-radio :label="0">
              关闭
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="优品推荐"
          prop="is_good"
        >
          <el-radio-group v-model="product.is_good">
            <el-radio :label="1">
              开启
            </el-radio>
            <el-radio :label="0">
              关闭
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="活动优先级"
          prop="activity"
        >
          <Draggable v-model="activities">
            <el-space
              :size="10"
              v-for="item in activities"
              :key="item.name"
            >
              <el-tag
                :type="item.type as typeof item.type"
              >
                {{ item.name }}
              </el-tag>
            </el-space>
          </Draggable>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
          >
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </app-card>
  </page-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import type { ProductAttr, ProductCategory, AttrRuleValue, AttrTableHeader } from '@/api/types/product'
import Editor from '@/components/Editor/index.vue'

const activities = ref([
  { type: 'danger', name: '秒杀' },
  { type: 'info', name: '默认' },
  { type: 'warning', name: '砍价' },
  { type: 'success', name: '拼团' }
])

const productCates = ref<ProductCategory[]>([]) // 商品分类
const singleAttrData = ref([{
  pic: '',
  vip_price: 0,
  price: 0,
  cost: 0,
  ot_price: 0,
  stock: 0,
  bar_code: '',
  weight: 0,
  volume: 0,
  brokerage: 0,
  brokerage_two: 0
}])
const computedActivity = computed(() => {
  return activities.value.map(item => item.name)
})
const product = ref({
  attrs: [] as ProductAttr[], // 商品规格
  cate_id: [] as number[],
  command_word: '',
  couponName: [],
  coupon_ids: [],
  description: '<p>hello1</p>',
  ficti: 0,
  give_integral: 0,
  header: [] as AttrTableHeader[],
  id: 0,
  image: 'https://shop.fed.lagou.com/uploads/attach/2021/07/20210727/82b80d1996848be8294c6aaa609c4f0b.jpg',
  is_benefit: 0,
  is_best: 0,
  is_good: 0,
  is_hot: 0,
  is_new: 0,
  is_postage: 0,
  is_show: 1,
  is_sub: [],
  items: [] as AttrRuleValue[],
  keyword: '',
  label_id: [],
  recommend_image: 'https://shop.fed.lagou.com/uploads/attach/2021/07/20210727/82b80d1996848be8294c6aaa609c4f0b.jpg',
  selectRule: '',
  slider_image: [
    'https://shop.fed.lagou.com/uploads/attach/2021/07/20210719/512f2ee75f883f46e718bd9496edcc22.jpg',
    'https://shop.fed.lagou.com/uploads/attach/2021/07/20210719/512f2ee75f883f46e718bd9496edcc22.jpg',
    'https://shop.fed.lagou.com/uploads/attach/2021/07/20210719/512f2ee75f883f46e718bd9496edcc22.jpg',
    'https://shop.fed.lagou.com/uploads/attach/2021/07/20210719/512f2ee75f883f46e718bd9496edcc22.jpg',
    'https://shop.fed.lagou.com/uploads/attach/2021/07/20210719/512f2ee75f883f46e718bd9496edcc22.jpg'
  ],
  sort: 0,
  spec_type: 0 as 0 | 1, // 0 单规格、1 多规格
  store_info: '',
  store_name: '',
  temp_id: '',
  unit_name: '',
  video_link: '',
  activity: computedActivity
})

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    product.value.description = '<p>这是测内容</p>'
  }, 1500)
})
// 富文本编辑器实例
const editor = ref<InstanceType<typeof Editor>>()
</script>
<style lang="scss" scoped>
:deep(.el-form-item__content) {
    overflow: hidden;
}

:deep(.el-space) {
    max-width: 100%;

    .el-space__item {
        max-width: 100%;
    }
}
</style>
