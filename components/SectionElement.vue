<template>
  <div class="section">
    <!-- <h3>{{ sectionContent.title }}</h3>
    <p>
      {{ sectionContent.text }}
    </p> -->
    <div
      data-augmented-ui="tl-scoop tr-scoop br-scoop bl-scoop both"
      class="card"
    >
      <div class="image card-subsection">
        <img :src="`/images/${content.image}`" alt="" />
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
  /* width: 1px; */
  /* min-height: 50vh; */
  width: 100%;
  padding: 2rem;
  background-color: var(--main-brown);
}
.card {
  height: fit-content;
  width: 100%;
  background-color: var(--main-white);
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
}
.card-subsection {
  width: 100%;
}
.image {
  max-height: 500px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
}
h3 {
  text-align: center;
  padding: 1rem;
}
@media (min-width: 800px) {
  .section {
    /* height: 1px; */
  }
  .card {
    flex-direction: row;
  }
  .card-subsection {
    width: 50%;
  }
}
</style>
