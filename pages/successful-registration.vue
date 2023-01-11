<template>
  <div class="wrapper flex center-both">
    <div class="container flex column center-both">
      <h3>Congratulations, you have registered!</h3>
      <NuxtLink to="/">Go back to frontpage</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-image: url("/assets/pizza3.jpg");
  background-size: cover;
  background-position: center;
}
.container {
  width: fit-content;
  padding: 2rem;
  background-color: var(--main-red);
  color: var(--main-white);
  border: 1px solid var(--main-black);
  box-shadow: 2px 2px 2px 2px var(--main-black);
  margin-top: 150px;
}
</style>