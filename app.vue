<template>
<div class="body">
  <Transition name="loader" mode="in-out">
    <LoaderElement class="loader" v-if="!pageLoaded" />
  </Transition>
  <!-- <Transition name="content" mode="out-in"> -->
    <NuxtLayout name="default" >
      <NuxtPage />
    </NuxtLayout>
  <!-- </Transition> -->

  <ItemSetup />
  <!-- v-show="useModalStore.showItemSetup" -->
  </div>
</template>

<script setup>
import { useUser } from "~/composables/useAuth";
const user = await useUser();

const nuxtApp = useNuxtApp();
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});
</script>

<script>
import gsap from "gsap";
import { useModalStore } from '~/stores/modalStore'

export default {
  data() {
    return {
      pageLoaded: false,
    };
  },
  setup() {
    const modalStore = useModalStore();
    return { modalStore };
  },
  methods: {
    // loaderLeave(el) {
    //   console.log(el);
    //   gsap.to(el, done, {
    //     opacity: 0,
    //     // duration: 1,
    //     done: this.setPageLoad,
    //   });
    // },
    setPageLoad() {
      this.pageLoaded = true;
    },
  },
  mounted() {
    this.pageLoaded = true;
  },
};
</script>

<style>
@import "/node_modules/augmented-ui/augmented-ui.min.css";
@import "/assets/flex-setup.css";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body,
html {
  height: 100%;
  font-size: 100%;
  scroll-behavior: smooth;
}
.body {
  background-color: var(--main-red);
    height: 100%;
  font-size: 100%;
  scroll-behavior: smooth;
}
:root {
  --main-red: #fd1d01;
  --main-brown: #ba8475;
  --main-white: #fff6f2;
  --main-black: #281713;
}
h2 {
  font-size: 2rem;
}
p,
label,
input,
h3,
h4,
button,
.btn-font {
  font-size: 1rem;
}
@media (min-width: 800px) {
  h2 {
    font-size: 2rem;
  }
  p,
  label,
  input,
  h3,
  h4,
  button,
  .btn-font {
    font-size: 1.5rem;
  }
}

/* animation */


.loader-leave-active {
  transition: opacity 1s ease;
}
.loader-leave-to {
  opacity: 0;
}
.loader-enter-from {
  opacity: 0;
}
.loader-enter-to {
  opacity: 1;
}
.content-enter-active {
  transition: opacity 1s ease;
}
.content-enter-from {
  opacity: 0;
}
.content-enter-to {
  opacity: 1;
}
</style>