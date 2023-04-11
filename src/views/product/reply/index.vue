<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const vLazy = {
  mounted (el: HTMLImageElement) {
    const src = el.src
    el.src = ''
    const observe = new IntersectionObserver(([{ isIntersecting }]) => {
      // 当绑定元素进入可视区域后isIntersecting则为true
      if (isIntersecting) {
        el.src = src
        // 终止对所有目标元素可见性变化的观察，也可用unobserve()方法终止特定元素的观察
        observe.disconnect()
      }
    })
    // 开启对自定义指令绑定对象的观察
    observe.observe(el)
  }
}
</script>

<template>
  <p>这是一段很长的文字</p>
  <img
    v-lazy
    src="@/assets/1.jpg"
    alt=""
  >
  <img
    v-lazy
    src="@/assets/2.jpg"
    alt=""
  >
  <img
    v-lazy
    src="@/assets/3.jpg"
    alt=""
  >
</template>

<style scoped>

</style>
