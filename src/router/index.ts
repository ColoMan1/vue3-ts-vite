import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import AppContainerVue from '../layout/AppContainer.vue'
import productRoute from './modules/product'
import orderRoute from './modules/order'
import permissionRoute from './modules/permission'
import mediatRoute from './modules/media'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppContainerVue,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: async () => await import('../views/home/index.vue')
      },
      productRoute,
      mediatRoute,
      permissionRoute,
      orderRoute
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: async () => await import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
