<template>
  <span
    class="size-selector btn-font"
    :class="{ 'size-selected': selectedPizzaSize === `${size}` }"
    @click="$emit('emitChangeSize', `${size}`)"
    >{{size}}</span
  >
</template>

<script>
export default {
  props: ["size", "selectedPizzaSize"],
  emits: ["emitChangeSize"]
};
</script>

<style scoped>
.size-selector {
  padding: 0.5rem 1rem;
  background-color: var(--main-black);
  color: var(--main-white);
  border: 1px solid var(--main-white);
}
.size-selector:hover {
  cursor: pointer;
}
.size-selected {
  background-color: var(--main-white);
  color: var(--main-black);
  border: 1px solid var(--main-black);
}
</style>