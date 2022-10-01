<template>
  <div class="container">
    <div class="inner-container">
      <div class="menu-title">
        <h2>Menu:</h2>
      </div>
      <div class="menu-list">
        <MenuElement v-for="pizza in pizzaArray" :key="pizza.name" :pizza="pizza" />
      </div>
    </div>
  </div>
</template>

<script setup>
import pizzaArray from "../content/pizza-menu.json";
</script>

<style scoped>
.container {
  width: 100%;
  background-image: url("assets/pizza4.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  /* parallax - fixed; no-parallax - scroll*/
  background-attachment: fixed;
}
.inner-container {
  width: 100%;
  height: 100%;
  /* padding: 1rem; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 2rem;
  overflow-y: hidden;
}
.menu-title {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
h2 {
  padding: 2rem;
  background-color: var(--main-black);
  color: var(--main-white);
}
</style>