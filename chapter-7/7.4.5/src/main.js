import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 10
  },
  mutations: {
    increment (state) {
      state.count = state.count + 1
    }
  },
  // actionオプションでアクションを定義する
  actions: {
    incrementAction (ctx) {
      // `increment`ミューテーションを実行する
      ctx.commit('increment')
    }
  }
})

// store.dispatchでアクションを呼び出す
console.log(store.state.count)    // -> 10
store.dispatch('incrementAction') // `incrementAction` アクションを呼び出す
console.log(store.state.count)    // -> 11