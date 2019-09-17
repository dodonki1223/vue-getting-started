module.exports = {
  'ログイン': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      // アプリケーションのトップへアクセス
      .url(devServer)
      // アプリケーションがレンダリングされるまで待機
      .waitForElementVisible('#app', 1000)
      // メールアドレスの入力
      .enterValue('input#email', 'foo@domain.com')
      // パスワードの入力
      .enterValue('input#password', '12345678')
      // ログインボタンが有効になるまで待機
      .waitForElementPresent('form > .form-actions > button', 1000)
      // ログイン
      .click('form > .form-actions > button')
      // ログイン成功に伴うリダイレクト後、ボードページが表示されるまで待機
      .waitForElementPresent('#app > p', 1000)
      // ボードページであるかどうか
      .assert.urlEquals('http://localhost:8080/#/')
      // 終了
      .end()
  }
}
