<template>
  <NuxtLayout name="card">
    <div class="container flex justify-evenly gap-1">
      <div class="subcontainer image flex center-both">
        <img :src="`/images/${content.image}`" alt="" />
      </div>
      <div class="subcontainer text flex column justify-evenly align-center">
        <h3>{{ content.title }}</h3>
        <div>
          <p v-for="(para, index) in content.text" :key="index">{{ para }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  name: "SectionElement",
  props: ["content"],
};
</script>

<style scoped>
.container {
  flex-direction: column;
}
.subcontainer {
  width: 100%;
}
.image {
  max-width: 500px;
  overflow: hidden;
}
img {
  width: 100%;
  object-fit: cover;
}
.text {
  max-width: 500px;
}
h3 {
  text-align: center;
  padding: 1rem;
}
@media (min-width: 800px) {
  .container {
    flex-direction: row;
  }
  .subcontainer {
    width: 50%;
  }
}
</style>
