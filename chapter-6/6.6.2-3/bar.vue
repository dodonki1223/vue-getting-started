<template>
  <div class="bar">
    <h1 class="header">Barコンポーネント</h1>
    <p>これはBarコンポーネントです。</p>
    <foo class="header" /> <!-- Fooコンポーネントの利用。scriptブロックも要注意 -->
  </div>
</template>

<script>
import Foo from './foo'
export default { //FooコンポーネントをBarコンポーネントに登録
  components: {
    Foo
  }
}
</script>

<style scoped>
.bar {
  border: 1px solid red;
  margin: 4px;
  padding: 4px;
}
.header { font-size: 125%; }
</style>