const sysAdminRouter = {
  path: 'sysAdmin',
  name: 'sysAdmin',
  meta: {},
  redirect: 'sysAdmin/approve',
  component: () => import('@/views/sysAdmin'),
  children: [
    {
      path: 'approve',
      name: 'approve',
      meta: {},
      component: () => import('@/views/sysAdmin/main/approve')
    },
    {
      path: 'user',
      name: 'user',
      meta: {},
      component: () => import('@/views/sysAdmin/main/user')
    },
    {
      path: 'compCentre',
      name: 'compCentre',
      meta: {},
      component: () => import('@/views/sysAdmin/main/compCentre')
    },
    {
      path: 'topUp',
      name: 'topUp',
      meta: {},
      component: () => import('@/views/sysAdmin/main/topUp')
    },
    {
      path: 'report',
      name: 'report',
      meta: {},
      component: () => import('@/views/sysAdmin/main/report')
    }
  ]
}
export default sysAdminRouter
