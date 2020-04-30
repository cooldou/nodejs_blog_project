import Vue from 'vue'
import Vuex from 'vuex'
import Base from './base'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    isSignIn: 0,
    token: '1',
  },
  mutations: {
    changIsSigin(state, n) {
      state.isSignIn = n
    },
    setToken(state, val) {
      state.token = val
    }
  },
  actions: {},
  modules: {
    Base
  }
})