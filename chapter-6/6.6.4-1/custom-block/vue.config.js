const loader = require.resolve('./loader.js') // カレントディレクトリに作成したカスタムローダーを読み込む

module.exports = {
  chainWebpack: config => {
    // Vue Loaderの設定をカスタマイズする
    config.module
      .rule('docs')
      .resourceQuery(/blockType=docs/)
      .use('docs')
      .loader(loader)
  }
}