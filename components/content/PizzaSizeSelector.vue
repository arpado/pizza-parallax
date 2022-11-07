<template>
  <span
    class="size-selector btn-font"
    :class="{ 'size-selected': selectedPizzaSize === 'S' }"
    @click="changeSize('S')"
    >S</span
  >
</template>

<script>
export default {};
</script>

<style>
</style>