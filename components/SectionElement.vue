<template>
  <div class="section">
    <!-- <h3>{{ sectionContent.title }}</h3>
    <p>
      {{ sectionContent.text }}
    </p> -->
    <div class="card">
      <div class="image card-subsection">
        <img :src="`assets/${content.image}`" alt="" />
      </div>
      <div class="text card-subsection">
        <h3>{{ content.title }}</h3>
        <div class="text" v-for="(para, index) in content.text" :key="index">
          <p>{{ para }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionElement",
  props: ["content"],
};
</script>

<style scoped>
.section {
  height: fit-content;
  width: 1px;
  min-height: 50vh;
  min-width: 100%;
  padding: 2rem;
  background-color: var(--main-brown);
}
.card {
  height: 100%;
  width: 100%;
  background-color: var(--main-white);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.card-subsection {
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
h3 {
  text-align: center;
  padding: 1rem;
}
@media (min-width: 560px) {
  .section {
  height: 1px;
  }
  .card {
    flex-direction: row;
  }
  .card-subsection {
    width: 50%;
  }
}
</style>
