// ミックスインの定義
var Sharable = {
  data: function() {
    return {
      _isProcessing: false
    }
  },
  created: function() {
    console.log('Sharableミックスインのフックが呼ばれました')
  },
  methods: {
    share: function() {
      if (this._isProcessing) {
        return
      }
      this._isProcessing = true
      // 実際はここでSNSのSDKのAPIを呼び出す
      setTimeout(() => {
        window.alert('シェアしました')
        this._isProcessing = false
      }, 300)
    }
  }
}

var IconShareButton = {
  mixins: [Sharable],
  created: function() {
    console.log('IconShareButtonミックスインのフックが呼ばれました')
  },
  template: `
    <button @click="share"><i class="fas fa-share-square"></i></button>
  `
}

var TextShareButton = {
  mixins: [Sharable],
  created: function() {
    console.log('TextShareButtonミックスインのフックが呼ばれました')
  },
  template: `
    <button @click="share">{{ buttonLabel }}</button>
  `,  
  data: function() {
    return {
      buttonLabel: 'シェアする'
    }
  },
  methods: {
    share() {
      // どちらのメソッドがよばれる？
      window.alert('コンポーネントからシェアしました')
    }
  }
}

new Vue({
  el: '#app',
  components: {
    IconShareButton,
    TextShareButton
  }
})