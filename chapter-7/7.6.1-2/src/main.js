import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // グローバルな名前空間にステート、ゲッター、ミューテーションを定義
  state: {
    count: 1
  },
  getters: {
    // state.countを２倍したものを返す
    double: state => state.count + state.count
  },
  mutations: {
    update(state, payload){
      state.count = payload
    }
  },
  modules: {
    // 名前空間が区切られたexampleモジュールを定義
    example: {
      namespaced: true,
      getters: {
        // 第３引数、第４引数にグローバルな名前空間にアクセスするための
        // rootState、rootGettersが渡される
        // rootState.countを３倍したものを返す
        triple: (state, getters, rootState, rootGetters) => {
          return rootState.count + rootGetters.double
        }
      },
      actions: {
        // rootState.countを５倍にする
        multiplyByFive(ctx) {
          // グローバルなdoubleゲッターとexampleモジュールのtripleゲッターを利用する
          const payload = ctx.rootGetters.double + ctx.getters.triple

          // グローバルな名前空間のupdateを呼び出したいので、
          // root: trueオプションを付与する
          ctx.commit('update', payload, { root: true })
        }
      }
    }
  }
})

console.log(store.state.count)
// exampleモジュールのmultiplyByFiveアクションを呼び出す
store.dispatch('example/multiplyByFive')

console.log(store.state.count)
