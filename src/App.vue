<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Footer,
    Header
  }
}
</script>

<style lang="scss">
@import './scss/main.scss';

body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.4;
}
</style>
