<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      mode="default"
      :default-config="toolbarConfig"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="valueHtml"
      mode="default"
      :default-config="editorConfig"
      @on-created="handleCreated"
      @on-change="editorChange"
    />
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const props = defineProps({
  editorValue: {
    type: String,
    default: '这个真没有'
  }
})
const emit = defineEmits(['update:editorValue'])
const editorConfig: Partial<IEditorConfig> = {}

const editorChange = (editor: IDomEditor) => {
  console.log('content', editor.getHtml())
  emit('update:editorValue', editor.getHtml())
}
// 内容 HTML
const valueHtml = ref(props.editorValue)

const toolbarConfig = {}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
// 监听父组件初始化编辑器内容
const stopHandle = watch(() => props.editorValue, (newV, oldV) => {
  console.log(newV, oldV)
  valueHtml.value = newV
  stopHandle()
})

onMounted(() => {
  console.log('onmounted----------children')
})
</script>

<style lang='stylus' scoped></style>
