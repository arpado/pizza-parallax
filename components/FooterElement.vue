<template>
  <div class="container">
      <div class="sitemap">
        <NuxtLink class="nuxt-link" to="/">Home</NuxtLink>
        <NuxtLink class="nuxt-link" to="menu">Our Menu</NuxtLink>
        <NuxtLink class="nuxt-link" to="user-registration">Register</NuxtLink>
      </div>
      <div class="contacts flex column center-both">
        <h3>Find Us On:</h3>
        <div class="social-links">
          <a href="https://twitter.com/" target="_blank">
            <Icon class="icon" name="mdi:twitter" size="50px"/>
          </a>
          <a href=""></a>
          <Icon class="icon" name="gg:facebook" size="50px"/>
          <a href=""></a>
          <Icon class="icon" name="bx:bxl-instagram" size="50px"/>
          <a href=""></a>
          <Icon class="icon" name="mdi:pinterest" size="50px"/>
        </div>
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
min-height: 70px;
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
.social-links > a {
  color: unset;
}
.social-links > a:hover {
  color: unset;
}
.social-links > a:active {
  color: unset;
}
.social-links > a:visited {
  color: unset;
}
.icon {
  margin: 10px;
}
.icon:hover {
  cursor: pointer;
}
</style>