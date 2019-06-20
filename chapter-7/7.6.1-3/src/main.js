import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    foo: {
      state: {
        value: 123
      },
      actions: {
        log(ctx){
          console.log('モジュールfooのステート', ctx.state)
        }
      }
    },
    bar: {
      state: {
        message: 'Hello!'
      },
      actions: {
        log(ctx){
          console.log('モジュールbarのステート', ctx.state)
        }
      }
    }
  }
})

// logアクションを呼び出す
// fooモジュール内のステートと、barモジュール内のステートが出力される
store.dispatch('log')
