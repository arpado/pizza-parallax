<template>
  <div class="container">
      <div class="sitemap">
        <NuxtLink class="nuxt-link" to="/">Home</NuxtLink>
        <NuxtLink class="nuxt-link" to="menu">Our Menu</NuxtLink>
        <NuxtLink class="nuxt-link" to="user-registration">Register</NuxtLink>
      </div>
      <div class="contacts">
        <p>Some contacts here</p>
      </div>
      <div class="copyright">
        <p>Copyright 2022 by ArpadO</p>
      </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.container {
width: 100%;
height: fit-content;
background-color: var(--main-black);
color: var(--main-white);
display: flex;
justify-content: space-around;
align-items: center;
}
.sitemap {
  display: flex;
  flex-direction: column;
}
.nuxt-link {
  color: White;
}
</style>