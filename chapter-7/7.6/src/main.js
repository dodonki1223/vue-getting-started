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

// カウンターモジュールを定義
const counter = {
  // ステート
  state: {
    count: 10
  },
  // ゲッター
  getters: {
    squared: state => state.count * state.count
  },
  // ミューテーション
  mutations: {
    increment(state, amount) {
      state.count += amount
    }
  },
  // アクション
  actions: {
    incrementAsync ({ commit }, payload) {
      return getCountNum(payload.type)
        .then(data => {
          commit('increment', {
            amount: data.amount
          })
        })
    }
  },
  // モジュールは入れ子に定義することができます
  modules: {
    childModule: {
      // 入れ子モジュールの定義
    }
  }
}

const store = new Vuex.Store({
  // counterモジュールをストアに登録
  modules: {
    counter
  }
})

// ステートはモジュール名の下に登録される
// `counter`モジュールであれば`store.state.counter`
console.log(store.state.counter.count) // -> 10

// ゲッター、ミューテーション、アクションは
// モジュールを使用しないときと同様に登録される
console.log(store.getters.squared) // -> 100
store.commit('increment', 5)
store.dispatch('incrementAsync', { type: 'two' })

console.log(store.state.counter.count)
console.log(store.getters.squared)