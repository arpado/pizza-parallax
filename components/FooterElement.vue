<template>
  <div class="container">
    <div class="sitemap flex column center-both gap-1">
      <h3>Sitemap</h3>
      <div class="flex center-both wrap gap-2">
        <NuxtLink class="nuxt-link" to="/">Home</NuxtLink>
        <NuxtLink class="nuxt-link" to="menu">Our Menu</NuxtLink>
        <NuxtLink class="nuxt-link" to="user-registration">Register</NuxtLink>
        <NuxtLink class="nuxt-link" to="admin">Administration</NuxtLink>
      </div>
    </div>
    <div class="contacts flex column center-both gap-2">
      <h3>Find Us On:</h3>
      <div class="social-links flex center-both wrap">
        <a href="https://twitter.com/" target="_blank">
          <Icon class="icon" name="mdi:twitter" size="50px" />
        </a>
        <a href="https://facebook.com/" target="_blank">
          <Icon class="icon" name="gg:facebook" size="50px" />
        </a>
        <a href="https://instagram.com" target="_blank">
          <Icon class="icon" name="bx:bxl-instagram" size="50px" />
        </a>
        <a href="https://pinterest.com" target="_blank">
          <Icon class="icon" name="mdi:pinterest" size="50px" />
        </a>
      </div>
    </div>
    <div class="copyright flex column center-both">
      <p>Copyright 2022</p>
      <p>Made by ArpadO</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  width: 100%;
  height: fit-content;
  min-height: fit-content;
  padding: 1rem;
  background-color: var(--main-black);
  color: var(--main-white);
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: none;
}
.sitemap {
  grid-row: 2/3;
  grid-column: unset;
  display: flex;
  flex-direction: column;
}
.nuxt-link {
  color: White;
}
.contacts {
  grid-row: 1/2;
  grid-column: unset;
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
.copyright {
  grid-column: unset;
  grid-row: 3/4;
}
@media (min-width: 500px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: none;
  }
  .sitemap {
    grid-row: unset;
    grid-column: 1/2;
  }
  .contacts {
    grid-row: unset;
    grid-column: 2/3;
  }
  .copyright {
    grid-row: unset;
    grid-column: 3/4;
  }
}
</style>