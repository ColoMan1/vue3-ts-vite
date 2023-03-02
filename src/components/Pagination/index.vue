<template>
  <el-pagination
    :current-page="props.page"
    :page-size="props.limit"
    :page-sizes="[2, 3]"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="props.listCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang='ts' setup>
interface IProp {
    page: number
    limit: number
    listCount: number
    responseList: Function
}
const props = withDefaults(defineProps<IProp>(), {
  page: 1,
  limit: 1,
  listCount: 1,
  responseList: () => {}
})
const emit = defineEmits<
    {(e: 'update:page', page: number): void, (e: 'update:limit', size: number): void, (e: 'change', val: string): void}
>()
const handleSizeChange = (size: number) => {
  emit('update:page', 1)
  emit('update:limit', size)
  emit('change', 'zhshizhishizhshi这是测试')
  props.responseList()
}
const handleCurrentChange = (page: number) => {
  emit('update:page', page)
  props.responseList()
}
</script>

<style lang='stylus' scoped></style>
