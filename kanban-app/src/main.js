// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'es6-promise/auto' // プロミスをポリフィルする
import App from './App'
import ErrorBoundary from './ErrorBoundary.vue' // エラーを補足するコンポーネント
import router from './router'
import store from './store' // Vuexのストアインスタンスをインポート

Vue.config.productionTip = false
Vue.config.perfomance = true // NODE_ENV == 'development'で測定有効化

// ErrorBoundaryコンポーネントのインストール
Vue.component(ErrorBoundary.name, ErrorBoundary)

Vue.config.errorHandler = (err, vm, info) => {
  console.error('errorHnadler err:', err)
  console.error('errorHnadler vm:', vm)
  console.error('errorHnadler info:', info)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // インポートしたストアインスタンスを`store`オプションとして指定
  render: h => h(App)
})
