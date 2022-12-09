<template>
  <div class="wrapper flex center-both column">
    <NuxtLayout name="card">
      <div class="flex center-both column">
        <h3>Sorry, the page you're looking for isn't here...</h3>
        <p>{{ error.statusCode }}</p>
        <p>{{ error.message }}</p>
        <p><NuxtLink to="/">Return to homepage</NuxtLink></p>
      </div>
    </NuxtLayout>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>

<style scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-image: url("/assets/pizza3.jpg");
  background-size: cover;
  background-position: center;
}
</style>