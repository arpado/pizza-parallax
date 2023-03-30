<template>
  <div class="wrapper flex column justify-between">
    <HeaderElement />
    <slot />
    <FooterElement />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
}
</style>