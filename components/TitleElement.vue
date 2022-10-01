<template>
  <div class="container">
    <!-- <span :class="[transparent ? 'transparent' : '', 'border']">
      {{ title }}
    </span> -->
    <h1>The Best Pizzeria!</h1>
    <h2>Come and eat at our place! Lorem ipsum, dolor sit amet consectetur adipisicing elit!</h2>
    <div class="btn-container">
      <ButtonElement text="Book a Table!"/>
      <ButtonElement text="Order Pizza"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleElement",
  props: {
    title: {
      type: String,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.container {
  width: 50vw;
  min-width: 400px;
  max-width: 800px;
  height: fit-content;
  /* min-width: fit-content;  
  min-height: fit-content;*/
  margin-top: 15vh;
  padding: 1rem;;
  text-align: center;
  color: var(--main-white);
  font-size: 28px;
  letter-spacing: 8px;
  text-transform: uppercase;
  background-color: var(--main-black);
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.border {
  background-color: #111;
  color: #fff;
  padding: 20px;
}
.transparent {
  background-color: transparent;
}
.container > * {
  margin: 30px 10px;
}
.btn-container {
  display: flex;
  justify-content: space-evenly;
}
</style>
