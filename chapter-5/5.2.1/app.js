var MyButton = {
  template: `
    <button>
      <!-- 親コンポーネントで渡されたコンテンツに差し替えられる -->
      <slot>OK</slot>
    </button>
  `
}

new Vue({
  el:'#app',
  components: {
    MyButton: MyButton
  }
})