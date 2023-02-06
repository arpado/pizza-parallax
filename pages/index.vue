<template>
  <div class="main-container">
    <ParallaxImageComponent
      :classConfig="'main-parallax background-stripes'"
      :imgHeight="'fit-content'"
    >
      <MainImageElement />
      <MainTextElement />
    </ParallaxImageComponent>
    <SectionElement :content="sectionContent[0]" />
    <ParallaxImageComponent imageName="pizza2.jpg" :imgHeight="'400px'" />
    <SectionElement :content="sectionContent[1]" />
    <ParallaxImageComponent imageName="pizza3.jpg" :imgHeight="'400px'" />
    <ContactsElement :content="contacts" />
  </div>
</template>

<script setup>
      // imageName="bg-hero.jpg"
import sectionContent from "../content/hero-section-content.json";
import contacts from "../content/contacts.json";
</script>

<style scoped>
.main-container {
  height: 100%;
  width: 100%;
}
/* .content-enter-active,
.content-leave-active {
  transition: opacity 1s ease;
  z-index: 999;
}
.content-enter-from,
.content-leave-to {
  opacity: 0;
}
.content-enter-to,
.content-leave-from {
  opacity: 1;
} */
</style>