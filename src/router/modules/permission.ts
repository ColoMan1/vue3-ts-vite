import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'permission',
  name: 'permission',
  meta: {
    title: '权限管理'
  },
  component: RouterView,
  children: [
    {
      path: 'role',
      name: 'permission-role',
      meta: {
        title: '角色管理'
      },
      component: () => import('../../views/permission/role/index.vue')
    },
    {
      path: 'admin',
      name: 'permission-admin',
      meta: {
        title: '系统管理'
      },
      component: () => import('../../views/permission/admin/index.vue')
    },
    {
      path: 'rule',
      name: 'permission-rule',
      meta: {
        title: '规则管理'
      },
      component: () => import('../../views/permission/rule/index.vue')
    }
  ]
}

export default routes
