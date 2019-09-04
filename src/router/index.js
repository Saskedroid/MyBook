import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/Login'
import Home from '@/pages/Home'

import PageHome from '@/pages/PageHome'
import PageLibrary from '@/pages/PageLibrary'
import PageManager from '@/pages/PageManager'
import PageAdd from '@/pages/PageAdd'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: { title: '登录 - 图书管理系统' },
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/index',
      children: [
        {
          path: 'index',
          name: 'PageHome',
          meta: { title: '首页 - 图书管理系统' },
          component: PageHome
        },
        {
          path: 'library',
          name: 'PageLibrary',
          meta: { title: '书库 - 图书管理系统' },
          component: PageLibrary
        },
        {
          path: 'manager',
          name: 'PageManager',
          meta: { title: '信息维护 - 图书管理系统' },
          component: PageManager
        }
      ]
    },
    {
      path: '/add',
      name: 'PageAdd',
      meta: { title: '书库 - 图书管理系统' },
      component: PageAdd
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 修改页面标题
  document.title = to.meta.title ? to.meta.title : "图书管理系统"

  next()
})

export default router
