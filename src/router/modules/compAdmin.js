const compAdminRouter = {
  path: 'compAdmin',
  name: 'compAdmin',
  meta: {},
  redirect: 'compAdmin/approve',
  component: () => import('@/views/compAdmin'),
  children: [
    {
      path: 'approve',
      name: 'approve',
      meta: {},
      component: () => import('@/views/compAdmin/main/approve')
    },
    {
      path: 'compCentre',
      name: 'compCentre',
      meta: {},
      component: () => import('@/views/compAdmin/main/compCentre')
    },
    {
      path: 'topUp',
      name: 'topUp',
      meta: {},
      component: () => import('@/views/compAdmin/main/topUp')
    },
    {
      path: 'user',
      name: 'user',
      meta: {},
      component: () => import('@/views/compAdmin/main/user')
    }
  ]
}
export default compAdminRouter
