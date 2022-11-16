<template>
  <div>
    <div class="collapsible-header flex justify-between">
      <h3>{{ text }}</h3>
      <button @click="toggleVisibility">Toggle</button>
    </div>
    <div class="collapsible-container" v-show="isVisible">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  props: ["text"],
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>

<style>
.collapsible-header {
  margin-top: 10px;
}
</style>