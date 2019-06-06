import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// ストアの作成
const store = new Vuex.Store({
  // ステート
  state: {
    count: 0
  },
  // ミューテーション
  mutations: {
    increment (state, amount) {
      state.count += amount
    }
  }
})

// ステートを参照
console.log(store.state.count) // -> 0

// ミューテーションを実行し、ステートを更新
store.commit('increment', 1)

// ステートの更新を確認
console.log(store.state.count) // -> 1