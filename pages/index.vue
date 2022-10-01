<template>
  <div class="main-container">
    <!-- <NuxtLayout name="default"> -->
      <ParallaxImageComponent
        imageName="bg-hero.jpg"
        :classConfig="'main-parallax'"
      >
        <TitleElement />
      </ParallaxImageComponent>
      <SectionElement :content="sectionContent[0]"/>
      <ParallaxImageComponent
        imageName="pizza2.jpg"
        :imgHeight="'400px'"
      >
      </ParallaxImageComponent>
      <SectionElement :content="sectionContent[1]"/>
      <ParallaxImageComponent
        imageName="pizza3.jpg"
        :imgHeight="'400px'"
      >
      </ParallaxImageComponent>
      <ContactsElement :content="contacts"/>
    <!-- </NuxtLayout> -->
  </div>
</template>

<script setup>
    import sectionContent from '../content/hero-section-content.json'
    import contacts from '../content/contacts.json'

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
</style>