import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // stateオプションでステートの初期値を指定する
  state: {
    count: 10
  }
})

// store.stateでステートを参照する
console.log(store.state.count) // -> 10
console.log(store.state.count)