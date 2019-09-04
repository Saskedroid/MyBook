// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'normalize.css/normalize.css'
import './icons' // svg

import App from './App'
import router from './router'

import { fetch } from './api/fetch'
import { util } from './api/util'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$fetch = fetch
Vue.prototype.$util = util

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  render: h => h(App)
})
