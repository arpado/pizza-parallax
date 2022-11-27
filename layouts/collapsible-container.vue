<template>
  <div class="collapsible-container">
    <div class="collapsible-header flex justify-between">
      <!-- <h3>{{ text }}</h3> -->
      <button @click="toggleVisibility">Toggle</button>
    </div>
    <div class="collapsible-menu" v-show="isVisible">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
      // text: this.text,
    };
  },
  // props: {
  //   text: String,
  // },
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