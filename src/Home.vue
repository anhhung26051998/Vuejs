<template>
  <div id="app">
    
<div class="row">
    <div class="col-12">
<Navbar />
    </div>
    </div>
    <div class="row">
    <div class="col-12">
    <router-view class="container"></router-view>
    </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue'
export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
