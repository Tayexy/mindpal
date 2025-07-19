<template>
  <header class="site-header">
    <marquee behavior="scroll" direction="left" scrollamount="5">
      Your all-in-one companion designed to streamline your day to day activities 
    </marquee>
  </header>
  
</template>

<script setup>
// no script needed for now
</script>

<style scoped>
.site-header {
  background-color: #000000;
  color: #fff;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
}

.nav a {
  margin-left: 20px;
  text-decoration: none;
  color: #ddd;
  font-weight: 500;
}

.nav a:hover {
  text-decoration: underline;
}
.contact {
  background-color: purple;
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.search {
  margin-left: 20px;
  padding: 8px;
  border-radius: 5px;
  border: none;
  height: 50px;
}
.search input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: #333;
  outline: none;
}
.search:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
