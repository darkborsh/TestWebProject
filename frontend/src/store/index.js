import Vue from 'vue'
import Vuex from 'vuex'
import currentEmployee from "./modules/currentEmployee"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    currentEmployee
  }
})
