<template>
  <div class="container">
    <!-- <img src="@/public/images/pizza-tray.png" alt=""> -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  /* width: 795px; */
  /* height: 595px; */
  height: 80vh;
  aspect-ratio: 4/3;
  margin-top: 100px;
  border-radius: 40px;
  box-shadow: 10px 10px 25px 2px;
  right: calc(75% - 280px);
  top: calc(50% - 50vh);
  position: absolute;
  /* bg image */
  background-size: auto 102%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/images/pizza-tray.png");
  /* transform: translateZ(-5px) scale(1.5); */
}
</style>