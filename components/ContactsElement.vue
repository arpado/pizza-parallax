<template>
  <NuxtLayout name="card">
    <div class="container flex gap-1" id="contacts-section">
      <div class="image card-subsection">
        <img :src="`images/${content.map}`" alt="" />
      </div>
      <div class="text card-subsection">
        <h3>{{ content.title }}</h3>
        <div class="contents-container flex justify-around">
          <div class="text">
            <h4 class="contacts-subtitle flex center-both">Address:</h4>
            <ul>
              <li v-for="(para, index) in content.text" :key="index">
                {{ para }}
              </li>
            </ul>
          </div>
          <div class="text">
            <h4 class="contacts-subtitle flex center-both">Open Hours:</h4>
            <ul>
              <li>Monday: {{ content.hours.closed }}</li>
              <li>Tuesday: {{ content.hours.regular }}</li>
              <li>Wednesday: {{ content.hours.regular }}</li>
              <li>Thursday: {{ content.hours.regular }}</li>
              <li>Friday: {{ content.hours.extended }}</li>
              <li>Staruday: {{ content.hours.extended }}</li>
              <li>Sunday: {{ content.hours.extended }}</li>
            </ul>
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
.contents-container {
  flex-direction: column;
}
h3 {
  text-align: center;
  padding: 1rem;
}
.contacts-subtitle {
  margin: 10px;
}
ul {
  list-style: none;
  text-align: center;
}
@media (min-width: 560px) {
  .container {
    flex-direction: row;
  }
  .card-subsection {
    width: 50%;
  }
}
@media (min-width: 800px) {
  .contents-container {
    flex-direction: row;
  }
}
</style>
