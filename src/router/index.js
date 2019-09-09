import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import compAdmin from './modules/compAdmin'
import sysAdmin from './modules/sysAdmin'
import shopsAdmin from './modules/shopsAdmin'

Vue.use(Router)
const defaultRouter = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {},
    redirect: '/login',
    children: [
      {
        path: 'login',
        component: () => import('@/views/login')
      },
      shopsAdmin,
      compAdmin,
      sysAdmin
    ]
  }
]

// const asyncRouter = []

export default new Router({
  routes: defaultRouter
})
