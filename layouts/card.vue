<template>
  <div class="card-background">
    <div
      data-augmented-ui="tl-scoop tr-scoop br-scoop bl-scoop both"
      class="card-foreground"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card-background {
  height: fit-content;
  /* width: 100%; */
  padding: 1rem;
  background-color: var(--main-brown);
  position: relative;
}
.card-foreground {
  /* height: 100%;
  width: 100%; */
  height: fit-content;

    /* height: fit-content; */
  /* width: 1px; */
  /* min-height: 50vh; */
  /* width: 100%; */
  /* padding: 1rem;
  background-color: var(--main-brown); */
  /* border: 15px solid var(--main-brown); */

  background-color: var(--main-white);
  padding: 2rem;
  /* display: flex;
  flex-direction: column; 
  gap: 1rem;*/
  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(12, 1fr); */
}
</style>