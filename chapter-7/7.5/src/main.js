import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  el: '#app',
  // コンポーネントからストアを利用できるようにする
  store,
  render: h => h(App)
})
