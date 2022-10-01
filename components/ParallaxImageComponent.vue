<template>
  <div :class="[classConfig, 'pimg']" :style="applyStyle">
    <slot />
  </div>
</template>

<script>
//
// csak a file nevet kell beirni ha egybol az assets mappaban van a kep
export default {
  name: "ParallaxImageComponent",
  props: {
    imageName: {
      type: String,
    },
    imgHeight: {
      type: String,
      default: "100vh",
    },
    classConfig: {
      type: String,
    },
  },
  computed: {
    applyStyle() {
      return {
        /* eslint-disable */
        "background-image": `url("assets/${this.imageName}")`,
        // "url(" + require("assets/" + this.imageName) + ")",
        height: this.imgHeight,
      };
    },
    // applyClass() {
    //   return
    // },
  },
};
</script>

<style scoped>
.pimg {
  position: relative;
  /* opacity: 0.8; */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  padding: 4em;
  /* parallax - fixed; no-parallax - scroll*/
  background-attachment: fixed;
  /* background-image: url("assets/bg-hero.jpg");
  height: 100vh; */
}
.main-parallax {
  justify-content: right;
  align-items: center;
}
@media (max-width: 560px) {
  .pimg {
    background-attachment: scroll;
  }
  .main-parallax {
    justify-content: center;
    align-items: center;
  }
}

</style>
