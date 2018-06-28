// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Highlight from './Highlight.js'
import VueLazyComponent from '@xunlei/vue-lazy-component'
import VueWordCloud from 'vuewordcloud';

Vue.component(VueWordCloud.name, VueWordCloud);
Vue.use(VueLazyComponent);
Vue.use(Highlight)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
