<template>
  <div class="loader container flex center-both" ref="loader">
    <div class="plate">
      <div
        class="pizza-slice"
        :style="{ transform: `rotate(${slice.rotationValue}deg)` }"
        v-for="slice in sliceArray"
        :key="slice.name"
        ref="pizzaslice"
      >
        <img src="images/pizza-slice.png" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  data() {
    return {
      sliceArray: [
        {
          name: "pizza-slice-1",
          rotationValue: 270,
        },
        {
          name: "pizza-slice-2",
          rotationValue: 315,
        },
        {
          name: "pizza-slice-3",
          rotationValue: 360,
        },
        {
          name: "pizza-slice-4",
          rotationValue: 45,
        },
        {
          name: "pizza-slice-5",
          rotationValue: 90,
        },
        {
          name: "pizza-slice-6",
          rotationValue: 135,
        },
        {
          name: "pizza-slice-7",
          rotationValue: 180,
        },
        {
          name: "pizza-slice-8",
          rotationValue: 225,
        },
      ],
    };
  },
  methods: {
    loaderLeave(el) {
      console.log(el);
      gsap.to(el, {
        opacity: 0,
        duration: 1,
        // done: this.setPageLoad,
      });
    },
    showSlices() {
      gsap.to(this.$refs.pizzaslice, {
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        // onComplete: this.hideSlices,
      })
    },
      hideSlices() {
      gsap.to(this.$refs.pizzaslice, {
        opacity: 0,
        duration: 0.3,
        stagger: 0.3,
        // onComplete: this.showSlices,
      })
    },
  },
  mounted() {
    // console.log(this.$refs.loader);
    this.showSlices(this.$refs.pizzaslice)
  },
  unmounted() {
    this.loaderLeave(this.$refs.loader);
  },
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
.plate {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  box-shadow: 0px 10px 30px 0px black;
  background-image: url("images/plate.png");
  background-position: center;
  position: relative;
}
.pizza-slice {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: top left;
  opacity: 0;
}
.pizza-slice > img {
  width: 100%;
}
</style>