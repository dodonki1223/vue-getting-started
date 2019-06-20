import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // exampleモジュールを定義
    example: {
      namespaced: true, // このフラグの有無によってどのように変わるかを見ていきます
      state: {
        value: 'Example'
      },
      getters: {
        upper: state => {
          return state.value.toUpperCase()
        }
      },
      mutations: {
        update(state){
          state.value = 'Updated'
        }
      },
      actions: {
        update(ctx) {
          ctx.commit('update')
        }
      }
    }
  }
})