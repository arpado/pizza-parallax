<template>
  <div class="main-container">
    <!-- <NuxtLayout name="default"> -->
      <ParallaxImageComponent
        :imageName="this.content.images.imageMain"
        :classConfig="'main-parallax'"
      >
        <TitleElement />
      </ParallaxImageComponent>
      <!-- <SectionElement :content="sectionContent[0]"/> -->
      <ParallaxImageComponent
        :imageName="this.content.images.image1"
        :imgHeight="'400px'"
      >
      </ParallaxImageComponent>
      <!-- <SectionElement :content="sectionContent[1]"/> -->
      <ParallaxImageComponent
        :imageName="this.content.images.image2"
        :imgHeight="'400px'"
      >
      </ParallaxImageComponent>
      <!-- <ContactsElement :content="contacts"/> -->
    <!-- </NuxtLayout> -->
  </div>
</template>

<script >
import sectionContent from '~/content/hero-section-content.json'
import contacts from '~/content/contacts.json'


export default {
  data() {
    return {
      content: {
        images: {
          imageMain: "bg-hero.jpg",
          image1: "pizza2.jpg",
          image2: "pizza3.jpg",
        },
      },
    };
  },
  created() {
    console.log(sectionContent[0]);
  },
};
</script>

<style>

.main-container {
  height: 100%;
  width: 100%;
}
</style>