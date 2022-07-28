<template>
  <div class="flex min-h-screen flex-col justify-start">
    <NavBar />
    <CardLayout />
    <AppFooter />
  </div>
</template>

<script setup>
import CardLayout from './components/CardLayout'
import NavBar from './components/NavBar'
import AppFooter from './components/AppFooter.vue'

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
