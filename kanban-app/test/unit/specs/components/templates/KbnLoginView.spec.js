import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'

// ローカルなVueコンストラクタを作成
const localVue = createLocalVue()

// ローカルなVueコンストラクタにVuexをインストール
localVue.use(Vuex)

describe('KbnLoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  // `KbnLoginForm`コンポーネントのログインボタンのクリックをトリガーするヘルパー関数
  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onlogin('foo@domain.com', '12345678')
  }

  beforeEach(() => {
    // KbnLoginFormコンポーネントのスタブの設定
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    }

    // Vue Routerのモック設定
    $router = {
      push: sinon.spy()
    }

    // loginアクションの動作確認のためのVuex周りの設定
    actions = {
      login: sinon.stub() // loginアクションのモック
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('ログイン', () => {
    let loginView
    describe('成功', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: { $router },
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
      })

      it('ボードページのルートにリダイレクトすること', done => {
        // loginアクションを成功とする
        actions.login.resolves()

        triggerLogin(loginView, LoginFormComponentStub)

        // プロミスのフラッシュ
        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].path).to.equal('/')
          done()
        })
      })
    })

    describe('失敗', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
        sinon.spy(loginView.vm, 'throwReject') // spyでラップ
      })

      afterEach(() => {
        loginView.vm.throwReject.restore() // spyのラップ解除
      })

      it('エラー処理が呼び出されること', done => {
        // loginアクションを失敗とする
        const message = 'login failed'
        actions.login.rejects(new Error(message))

        triggerLogin(loginView, LoginFormComponentStub)

        // プロミスのフラッシュ
        loginView.vm.$nextTick(() => {
          const callInfo = loginView.vm.throwReject
          expect(callInfo.called).to.equal(true)
          expect(callInfo.args[0][0].message).to.equal(message)
          done()
        })
      })
    })
  })
})
