<template>
  <div class="container">
    <div class="background">
      <span>P</span>
      <span>I</span>
      <span>Z</span>
      <span>Z</span>
      <span>A</span>
    </div>
    <div class="foreground">
      <span>P</span>
      <span>a</span>
      <span>r</span>
      <span>a</span>
      <span>l</span>
      <span>l</span>
      <span>a</span>
      <span>x</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  min-height: 70px;
  height: 70%;
  max-height: 100px;
  width: 200px;
  position: relative;
  background-color: var(--main-black);
}
.background {
  width: 100%;
  height: 70px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: 0;
  font-size: 4rem;
  color: var(--main-white);
  /* background-color: yellow; */
}
.foreground {
  width: 100%;
  height: 30px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  font-size: 2rem;
  z-index: 1;
  background-color: var(--main-red);
}
</style>