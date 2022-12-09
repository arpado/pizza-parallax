<template>
  <div class="main-container">
    <!-- <Transition name="content"> -->
    <!-- <NuxtLayout name="default"> -->
    <ParallaxImageComponent
      imageName="bg-hero.jpg"
      :classConfig="'main-parallax'"
    >
      <TitleElement />
    </ParallaxImageComponent>
    <SectionElement :content="sectionContent[0]" />
    <ParallaxImageComponent imageName="pizza2.jpg" :imgHeight="'400px'"/>
    <SectionElement :content="sectionContent[1]" />
    <ParallaxImageComponent imageName="pizza3.jpg" :imgHeight="'400px'" />
    <ContactsElement :content="contacts" />
    <!-- </NuxtLayout> -->
    <!-- </Transition> -->
  </div>
</template>

<script setup>
import sectionContent from "../content/hero-section-content.json";
import contacts from "../content/contacts.json";

// const content = {
//     images: {
//       imageMain: "bg-hero.jpg",
//       image1: "pizza2.jpg",
//       image2: "pizza3.jpg",
//     }
// }
// return { content }
// export default {
//   setup() {

//     const sectionContent = require('~/content/hero-section-content.json')
//     const contacts = require('~/content/contacts.json')
//   },
//   data() {
//     return {
//       content: {
//         images: {
//           imageMain: "bg-hero.jpg",
//           image1: "pizza2.jpg",
//           image2: "pizza3.jpg",
//         },
//         // sectionContent: this.sectionContent,
//         // contacts: this.contacts,
//       },
//     };
//   },
//   created() {
//     console.log(sectionContent[0]);
//   },
// };
</script>

<style>
.main-container {
  height: 100%;
  width: 100%;
}
.content-enter-active,
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
}
</style>