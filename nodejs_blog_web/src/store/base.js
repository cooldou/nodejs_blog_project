export default {
  namespaced: true,

  state: {
    token: '1',
  },
  mutations: {
    setToken(state, val) {
      state.token = val
    }
  },
}