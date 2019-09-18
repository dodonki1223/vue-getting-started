// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'es6-promise/auto' // プロミスをポリフィルする
import App from './App'
import ErrorBoundary from './ErrorBoundary.vue' // エラーを補足するコンポーネント
import router from './router'
import store from './store' // Vuexのストアインスタンスをインポート

Vue.config.productionTip = false

// ErrorBoundaryコンポーネントのインストール
Vue.component(ErrorBoundary.name, ErrorBoundary)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // インポートしたストアインスタンスを`store`オプションとして指定
  render: h => h(App)
})
