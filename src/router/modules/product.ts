import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw =
  {
    path: 'product',
    name: 'product',
    meta: {
      title: '商品'
    },
    component: RouterView,
    children: [
      {
        path: 'attr',
        name: 'product_attr',
        meta: {
          title: '商品规格'
        },
        component: async () => await import('../../views/product/attr/index.vue')
      },
      {
        path: 'classify',
        name: 'product_classify',
        meta: {
          title: '商品分类'
        },
        component: async () => await import('../../views/product/classify/index.vue')
      },
      {
        path: 'list',
        name: 'product_list',
        meta: {
          title: '商品列表'
        },
        component: async () => await import('../../views/product/list/index.vue')
      },
      {
        path: 'reply',
        name: 'product_reply',
        meta: {
          title: '商品评论'
        },
        component: async () => await import('../../views/product/reply/index.vue')
      },
      {
        path: 'add',
        name: 'product-add',
        component: async () => await import('../../views/product/add/index.vue'),
        meta: {
          title: '添加商品'
        }
      }
    ]
  }
export default routes
