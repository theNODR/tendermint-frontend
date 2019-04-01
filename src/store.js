import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    background: '#fff',
  },
  mutations: {
    backgroundChange(state, color) {
      state.background = color
    },
  },
  actions: {
    backgroundChange({commit}, color) {
      commit('backgroundChange', color)
    },
  },
})