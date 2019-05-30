var MyButton = {
  props: ['href', 'tag'],
  render: function (createElement) {
    var tag = this.tag || (this.href ? 'a' : 'button')
    return createElement(tag, {
      attrs: {
        href: this.href || '#'
      }
    }, this.$slots.default)
  }
}

new Vue({
  el: '#app',
  components: {
    MyButton: MyButton
  }
})