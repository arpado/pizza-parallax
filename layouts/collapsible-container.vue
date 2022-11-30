<template>
  <div class="collapsible-container">
    <div class="collapsible-header flex justify-between">
      <slot name="title" />
      <button @click="toggleVisibility">Toggle</button>
    </div>
    <div class="collapsible-menu" v-show="isVisible">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style scoped>
.collapsible-menu {
  margin-top: 10px;
}
</style>