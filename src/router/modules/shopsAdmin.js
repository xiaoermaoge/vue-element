const shopsAdminRouter = {
  path: 'shopsAdmin',
  name: 'shopsAdmin',
  meta: {},
  redirect: 'shopsAdmin/expense',
  component: () => import('@/views/shopsAdmin'),
  children: [
    {
      path: 'expense',
      name: 'expense',
      component: () => import('@/views/shopsAdmin/main/expense')
    }
  ]
}
export default shopsAdminRouter
