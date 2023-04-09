import toast from './toast.vue'
import { h, render } from 'vue'

export function showToast (duration: number, message: string, showToast: boolean) {
  // 虚拟DOM由虚拟节点组成
  // h() 创建虚拟节点 (vnode) 相当于createVnode()，官方文档:https://cn.vuejs.org/guide/extras/render-function.html
  // 此处将toast组件转换成虚拟节点
  const vnode = h(toast, { duration, message, showToast })
  // render函数的作用就是将toast组件的虚拟节点转换成真实节点
  render(vnode, document.body)
  // 根据传入的duration定时古关闭弹窗
  const timer = setTimeout(() => {
    document.getElementsByClassName('notice')[0].remove()
    clearTimeout(timer)
  }, duration)
}
