<template>
  <div id="app">
    <h1 class="c-grammon__title">
      五子棋
    </h1>
    <BackGrammon />
  </div>
</template>

<script>
import BackGrammon from './components/BackGrammon.vue'

export default {
  name: 'App',
  components: {
    BackGrammon
  },
  mounted() {
    
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100vh;
  font-size: 10vw;
}
#app {
  font-family: -apple-system,BlinkMacSystemFont,PingFang SC,Helvetica Neue,STHeiti,Microsoft Yahei,Tahoma,Simsun,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  font-size: 28px;
  padding-top: 40px;
}
.c-grammon__title {
  flex: none;
}
</style>
