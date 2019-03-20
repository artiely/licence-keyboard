<template>
  <div id="app">
    <licence-keyboard v-model="licence"></licence-keyboard>
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      licence: []
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
