import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import AppContainerVue from '../layout/AppContainer.vue'
import productRoute from './modules/product'
import orderRoute from './modules/order'
import permissionRoute from './modules/permission'
import mediatRoute from './modules/media'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '../store/index'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppContainerVue,
    meta: {
      requiresAuth: true
    },
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
router.beforeEach((to, from) => {
  NProgress.start()

  if (to.meta.requiresAuth && !store.state.user) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
