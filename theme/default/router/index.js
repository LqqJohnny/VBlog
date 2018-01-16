import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('../components/pages/home')
const article = () => import('../components/pages/article')

const categories = () => import('../components/pages/categories')
const tags = () => import('../components/pages/tags')

const notFound = () => import('../components/pages/notFound.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
      path: '/article/:id',
      name: 'article',
      component: article
    },
    {
      path: '/categories',
      name: 'categories',
      component: categories
    },
    {
      path: '/tags',
      name: 'tags',
      component: tags
    },{ //  配置 所有 错误路由 404 页面
      path: '/*',
      name: 'notFound',
      component: notFound
    }
  ]
})
