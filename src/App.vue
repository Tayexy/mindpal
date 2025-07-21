<template>
  <div class="app">
    
    <router-view /> <!-- Home or other pages will render here -->
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f4f4;
  color: #333;
}
</style>
