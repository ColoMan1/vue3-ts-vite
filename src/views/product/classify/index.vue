<script setup lang="ts">
import { showToast } from './toast'

const showSomething = () => {
  showToast(12000, '这是测试函数调用方式创建组件', true)
}
</script>

<template>
  <div @click="showSomething">
    这是app.vue页面
  </div>
</template>

<style scoped>

</style>
