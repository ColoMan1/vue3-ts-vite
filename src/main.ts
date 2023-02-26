import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { store, key } from './store/index'
import '@/styles/index.scss'
import elementPlus from './plugins/element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router)
  .use(elementPlus)
  .use(store, key)
  .mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
