<template>
  <div class="card-background">
    <div
      data-augmented-ui="tl-scoop tr-scoop br-scoop bl-scoop both"
      class="card-foreground"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card-background {
  height: fit-content;
  padding: 1rem;
  background-color: var(--main-brown);
  position: relative;
}
.card-foreground {
  height: fit-content;
  background-color: var(--main-white);
  padding: 2rem;
}
</style>