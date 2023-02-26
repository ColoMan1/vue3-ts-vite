import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw =
  {
    path: 'order',
    name: 'order',
    meta: {
      title: '订单管理'
    },
    component: RouterView,
    children: [
      {
        path: 'list',
        name: 'order-list',
        meta: {
          title: '订单列表'
        },
        component: async () => await import('../../views/product/list/index.vue')
      },
      {
        path: 'offline',
        name: 'order-offline',
        meta: {
          title: '离线订单'
        },
        component: () => import('../../views/order/offline/index.vue')
      }
    ]
  }
export default routes
