<template>
  <div :class="[classConfig, 'pimg']" :style="applyStyle">
    <slot />
  </div>
</template>

<script>
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
      if(!this.imageName) {
        return {
          // "background-image": `url("/images/${this.imageName}")`,
          height: this.imgHeight,
          // "background-image": 'unset',
        }
      }

      return {
        /* eslint-disable */
        "background-image": `url("/images/${this.imageName}")`,
        // "background-image": "url(" + require("~/assets/" + this.imageName) + ")",
        height: this.imgHeight,
      };
    },
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
  /* padding = problem */
  /* padding: 4em; */
  /* parallax - fixed; no-parallax - scroll*/
  background-attachment: scroll;
  /* background-image: url("assets/bg-hero.jpg");
  height: 100vh; */
}
.main-parallax {
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
}
@media (min-width: 560px) {
  .pimg {
    background-attachment: fixed;
  }
  .main-parallax {
    justify-content: right;
    align-items: center;
  }
}

</style>
