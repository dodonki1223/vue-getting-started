var MyButton = {
  props: ['href', 'tag'],
  template: `
    <a v-if="(!tag && href) || tag === 'a'" :href="href || '#'">
      <slot></slot>
    </a>
    <span v-else-if="tag === 'span'">
      <slot></slot>
    </span>
    <button v-else>
      <slot></slot>
    </button>
  `
}

new Vue({
  el: '#app',
  components: {
    MyButton: MyButton
  }
})