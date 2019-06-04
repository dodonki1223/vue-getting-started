<template>
  <div class="foo">
    <h1 class="header">Fooコンポーネント</h1>
    <p>これはFooコンポーネントです。</p>
  </div>
</template>

<!-- 先の例でRootコンポーネントのスタイル定義されていたp要素のスタイルをFooコンポーネントに移動 -->
<style>
p { text-decoration: underline; }
</style>

<style scoped>
.foo {
  border: solid 1px green;
  margin: 4px;
  padding: 4px;
}
.header { font-size: 150%; }
</style>
