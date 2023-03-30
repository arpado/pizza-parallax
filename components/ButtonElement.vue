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
  position: relative;
  padding: 6px 24px;
  border: 1px solid #d83526;
  border-radius: 6px;
  background: linear-gradient(to bottom, #fe1a00 5%, #ce0100 100%);
  background-color: var(--main-red);
  box-shadow: inset 0px 2px 0px 0px #f29c93, 0 0 0px 0px var(--main-white);
  color: var(--main-white);
  font-weight: bold;
  font-size: 1.3rem;
  text-decoration: none;
  text-shadow: 0px 1px 0px #b23e35;
  cursor: pointer;
  transition: box-shadow 0.15s;
  z-index: 1;
}
.button > span {
  transition: transform 0.15s;
}
.button::before {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 6px;
  box-shadow: inset 0px -1px 0px 0px #f29c93, 0 0 0px 0px var(--main-white);
  background: linear-gradient(to bottom, #ce0100 5%, #fe1a00 100%);
  z-index: -1;
  transition: opacity 0.15s linear;
  opacity: 0;
}
.button:hover > span {
  transform: translateY(-1px);
}
.button:hover::before {
  opacity: 1;
}
.button:active {
  box-shadow: inset 0px -1px 0px 0px #99635d, 0 0 10px 1px var(--main-white);
}
span {
  text-align: center;
}
/* .myButton {
  box-shadow: inset 0px 1px 0px 0px #f29c93;
  background: linear-gradient(to bottom, #fe1a00 5%, #ce0100 100%);
  background-color:#fe1a00;
  background-color: var(--main-red);
  border-radius: 6px;
  border: 1px solid #d83526;
  display: inline-block;
  cursor: pointer;
  color: var(--main-white);
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #b23e35;
}
.myButton:hover {
  background: linear-gradient(to bottom, #ce0100 5%, #fe1a00 100%);
  background-color: #ce0100;
}
.myButton:active {
  position: relative;
  top: 1px;
} */
</style>