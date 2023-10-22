<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
//import Demon from "./components/Demon.vue";
export default {
  name: "App",
  components: {
    //Demon,
    HelloWorld,
  },
};
</script>

<style>
#app {
  img {
    display: block;
    width: 100px;
    height: 100px;
  }
}
</style>
