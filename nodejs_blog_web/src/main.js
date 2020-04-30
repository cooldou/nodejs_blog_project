import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/scss/reset.scss"
import "@/assets/scss/common.scss"
import "@/assets/font/iconfont.css"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Cookie from 'js-cookie'
// import base from './store/base'

import {
  Service
} from './modules/request'
// use
Vue.use(mavonEditor)
Vue.use(ElementUI)
// Vue.prototype.$axios = axios
Vue.prototype.$axios = Service
Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to, from, next) => {
  store.commit('setToken', Cookie.get('token'))
  // base.setToken(Cookie.get('token'))
  // let cookie = Cookie.get('token')
  // base.mutations.setToken(cookie)
  if (store.state.token) {
    store.commit('changIsSigin', 1)
  }
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')