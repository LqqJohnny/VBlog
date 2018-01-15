import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('../components/pages/home')
const article = () => import('../components/pages/article')
const categories = () => import('../components/pages/categories')
const tags = () => import('../components/pages/tags')
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
    }
  ]
})
