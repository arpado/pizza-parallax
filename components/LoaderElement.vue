<template>
    <div class="loader container flex center-both" ref="loader">
      Loading ....
    </div>
</template>

<script>
import gsap from "gsap";

export default {
  // methods: {
  //   loaderLeave(el) {
  //     console.log(el);
  //     gsap.to(el, {
  //       opacity: 0,
  //       duration: 1,
  //       // done: this.setPageLoad,
  //     });
  //   },
  // },
  // mounted() {
  //   console.log(this.$refs.loader);
  // },
  // unmounted() {
  //   this.loaderLeave(this.$refs.loader)
  // },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: red;
  color: white;
  font-size: 3rem;
}
</style>