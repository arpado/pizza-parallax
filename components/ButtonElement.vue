<template>
  <div class="button flex center-both" tabindex="0">
    <span>{{ text }}</span>
  </div>
</template>

<script>
// maybe add a common functionality to the button?
export default {
  props: ["text"],
};
</script>

<style scoped>
.button {
  min-height: 50px;
  height: fit-content;
  /* min-width: 200px; */
  width: fit-content;
  max-width: 100%;
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
  border: 1px inset black;
}
span {
  text-align: center;
}
</style>