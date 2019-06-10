import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 例示用に非同期処理を行う関数
// 実際のアプリではサーバーからデータを取得する
function getCountNum (type) {
  return new Promise(resolve => {
    // 1秒後にtypeに応じたデータを返す
    setTimeout(() => {
      let amount
      switch (type) {
        case 'one':
          amount = 1
          break
        case 'two':
          amount = 2
          break
        case 'ten':
          amount = 10
          break
        default:
          amount = 0
      }
      resolve({ amount })
    }, 1000)
  })
}

const store = new Vuex.Store({
  state: {
    count: 10
  },
  mutations: {
    increment (state, payload) {
      state.count += payload.amount
    }
  },
  // actionオプションでアクションを定義する
  actions: {
    incrementAsync ({ commit }, payload) {
      return getCountNum(payload.type)

        .then(data => {
          // レスポンスをログに表示
          console.log(data)

          // レスポンスをペイロードとして渡したミューテーションを実行する
          commit('increment', {
            amount: data.amount
          })
        })
    }
  }
})

console.log(store.state.count) // -> 10
store.dispatch('incrementAsync', { type: 'one' }).then(() => {
  // アクションの処理が完了した後に実行される
  console.log(store.state.count) // -> 11
})