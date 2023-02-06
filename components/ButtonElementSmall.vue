<template>
  <div class="button flex center-both" tabindex="0">
    <p>{{ text }}</p>
  </div>
</template>

<script>
// @click="doThis"
export default {
  props: ["text"],
  // methods: {
  //   doThis(func, arg) {

  //   }
  // }
};
</script>

<style scoped>
.button {
  height: 50px;
  width: 50px;
  min-width: fit-content;
  margin: 10px;
  padding: 1rem;
  border: 1px solid var(--main-white);
  border-radius: 10px;
  background-color: var(--main-red);
  font-weight: bold;
  font-size: 1.3rem;
  transition: background-color 0.5s, color 0.5s, box-shadow 0.025s,
    border 0.025s;
}
.button:hover {
  cursor: pointer;
  background-color: var(--main-white);
  color: var(--main-black);
}
.button:active {
  box-shadow: 0 0 10px 1px var(--main-white);
  border: 5px inset black;
}
</style>