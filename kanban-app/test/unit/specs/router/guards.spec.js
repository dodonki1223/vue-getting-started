import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

// Appコンポーネント
const App = {
  name: 'app',
  render: h => h('router-view')
}
// Topコンポーネント
const Top = {
  name: 'top',
  render: h => h('p', ['top'])
}
// Loginコンポーネント
const Login = {
  name: 'login',
  render: h => h('p', ['login'])
}

// ナビゲーションガードを実装するファイル内で依存するVuex Storeをモック化するヘルパー関数
const mockAuthorizeToken = store => {
  const injector = require('inject-loader!@/router/guards')
  const storeMock = injector({
    '../store': store
  })
  return storeMock.authorizeToken
}

// Vueアプリケーションをセットアップするヘルパー関数
const setup = state => {
  // Vuexストアの設定
  const store = new Vuex.Store({ state })

  // Vue Routerの設定
  const router = new VueRouter({
    routes: [{
      path: '/',
      component: Top,
      meta: { requiresAuth: true }
    }, {
      path: '/login',
      component: Login
    }]
  })

  // ナビゲーションガードであるauthorizeTokenをフックをインストール
  router.beforeEach(mockAuthorizeToken(store))

  // Appでマウントしてラッパーを返す
  return mount(App, {
    localVue,
    store,
    router
  })
}

// ローカルなVueコンストラクタを作成
const localVue = createLocalVue()

// ローカルなVueコンストラクタにVue RouterとVuexをインストール
localVue.use(VueRouter)
localVue.use(Vuex)

describe('beforeEachガードフック', () => {
  describe('認証トークンあり', () => {
    it('そのまま解決すること', () => {
      const app = setup({
        auth: {
          token: '1234567890abcdef',
          userId: 1
        }
      })
      expect(app.text()).to.equal('top')
    })
  })

  describe('認証トークンなし', () => {
    it('/loginにリダイレクトして解決すること', () => {
      const app = setup({})
      expect(app.text()).to.equal('login')
    })
  })
})
