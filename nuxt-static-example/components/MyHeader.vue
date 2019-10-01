<template>
  <nav class="header">
    <ul>
      <li><nuxt-link to="/">ホーム</nuxt-link></li>
      <li><nuxt-link to="/company">企業情報</nuxt-link></li>
      <li><nuxt-link to="/product">プロダクト</nuxt-link></li>
      <li><nuxt-link to="/job">採用</nuxt-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.header ul {
  margin: 0 0 0 0.2em;
  padding: 0;
  list-style-type: none;
}
.header ul li {
  display: inline-block;
  margin: 0 0.6em 0 0;
}
.header a {
  text-decoration: none;
}
.header a.nuxt-link-exact-active {
  text-decoration: underline;
}
</style>
