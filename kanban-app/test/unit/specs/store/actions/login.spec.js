import Vue from 'vue'
import * as types from '@/store/mutation-types'

// loginアクション内の依存関係をモック化する
const mockLoginAction = login => {
  // inject-loaderを使ってアクション内の依存関係をモック化するための注入関数を取得する
  const actionsInjector = require('inject-loader!@/store/actions')

  // 注入関数でAuth APIモジュールをモック化する
  const actionsMocks = actionsInjector({
    '../api': {
      Auth: { login }
    }
  })

  return actionsMocks.default.login
}

describe('loginアクション', () => {
  const address = 'foo@domain.com'
  const password = '12345678'
  let commit
  let future

  describe('Auth.loginが成功', () => {
    const token = '1234567890abcdef'
    const userId = 1

    beforeEach(done => {
      const login = authInfo => Promise.resolve({ token, userId })
      const action = mockLoginAction(login)
      commit = sinon.spy()

      // loginアクションの実行
      future = action({ commit }, { address, password })
      Vue.nextTick(done)
    })

    it('成功となること', () => {
      // commitが呼ばれているかチェック
      expect(commit.called).to.equal(true)
      expect(commit.args[0][0]).to.equal(types.AUTH_LOGIN)
      expect(commit.args[0][1].token).to.equal(token)
      expect(commit.args[0][1].userId).to.equal(userId)
    })
  })

  describe('Auth.loginが失敗', () => {
    beforeEach(done => {
      const login = authInfo => Promise.reject(new Error('login failed'))
      const action = mockLoginAction(login)
      commit = sinon.spy()

      // loginアクションの実行
      future = action({ commit })
      Vue.nextTick(done)
    })

    it('失敗となること', done => {
      // commitが呼ばれていないかチェック
      expect(commit.called).to.equal(false)

      // エラーが投げられているかチェック
      future.catch(err => {
        expect(err.message).to.equal('login failed')
        done()
      })
    })
  })
})
