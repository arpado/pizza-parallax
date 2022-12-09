<template>
  <div class="button" tabindex="0">
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

<style>
.button {
  height: 100px;
  width: 200px;
  border: 1px solid var(--main-white);
  display: flex;
  justify-content: center;
  align-items: center;
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