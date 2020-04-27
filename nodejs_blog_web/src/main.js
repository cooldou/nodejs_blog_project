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

// use
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let token = '1afsfsdfsdfsdf'
  if (token) {
    store.commit('changIsSigin', 1)
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')