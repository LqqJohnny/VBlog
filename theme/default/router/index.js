import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('../components/pages/home')
const article = () => import('../components/pages/article')
const notFound = () => import('../components/pages/notFound.vue')

Vue.use(Router)

var router = [
  {
    path: '/',
    name: 'home',
    component: home
  },{
    path: '/article/:id',
    name: 'article',
    component: article
  },{ //  配置 所有 错误路由 404 页面
    path: '/*',
    name: 'notFound',
    component: notFound
  }
];

export default new Router({
  routes: router
})
