/* eslint-disable no-unused-vars */
import { Store } from 'vuex'
import { State } from './store/index'
import 'vue-router'

declare module '@vue/runtime-core' {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
// 为router中meta属性提供类型声明
declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}
// 为element提供类型声明
declare module 'element-plus/dist/locale/zh-cn.mjs';
