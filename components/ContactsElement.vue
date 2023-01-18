<template>
  <NuxtLayout name="card">
    <div class="container flex gap-1" id="contacts-section">
      <div class="image card-subsection">
        <img :src="`images/${content.map}`" alt="" />
      </div>
      <div class="text card-subsection">
        <h3>{{ content.title }}</h3>
        <div class="flex justify-around">
          <div class="text">
            <h4 class="contacts-subtitle flex center-both">Address:</h4>
            <p v-for="(para, index) in content.text" :key="index">{{ para }}</p>
          </div>
          <div class="text">
            <h4 class="contacts-subtitle flex center-both">Open Hours:</h4>
            <p>Monday: {{ content.hours.closed }}</p>
            <p>Tuesday: {{ content.hours.regular }}</p>
            <p>Wednesday: {{ content.hours.regular }}</p>
            <p>Thursday: {{ content.hours.regular }}</p>
            <p>Friday: {{ content.hours.extended }}</p>
            <p>Staruday: {{ content.hours.extended }}</p>
            <p>Sunday: {{ content.hours.extended }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  name: "ContactsElement",
  props: ["content"],
};
</script>

<style scoped>
.container {
  flex-direction: column;
}
.card-subsection {
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
  max-height: 400px;
  object-fit: cover;
}
h3 {
  text-align: center;
  padding: 1rem;
}
.contacts-subtitle {
  margin: 10px;
}
@media (min-width: 560px) {
  .container {
    flex-direction: row;
  }
  .card-subsection {
    width: 50%;
  }
}
</style>
