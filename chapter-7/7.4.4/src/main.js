import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 10
  },
  // mutationsオプションでミューテーションを定義する
  mutations: {
    // `increment`ミューティーションを定義
    increment (state) {
      state.count = state.count + 1
    }
  }
})

// store.commitでミューテーションを呼び出す
console.log(store.state.count)
store.commit('increment')      // `increment`ミューテーションを呼び出す
console.log(store.state.count)
