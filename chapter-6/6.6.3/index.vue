<template>
  <p :class="$style.message">こんにちは！</p>
</template>
<script>
export default {
  created() {
    // eslint-disable-next-line no-console
    console.log('css modules: $style', this.$style)
  }
}
</script>

<style module>
.message { color: #42b983 }
</style>