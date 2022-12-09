<template>
  <div class="body">
    <TransitionGroup name="content" mode="in-out" appear>
      <LoaderElement
        class="loader"
        v-if="!pageLoaded || !loaderDone"
        @slices-done="this.loaderDone = true"
        key="loader"
      />
      <div v-else>
        <NuxtLayout name="default" key="page">
          <NuxtPage />
        </NuxtLayout>
      </div>
    </TransitionGroup>

    <!-- <Transition name="content" ></Transition> -->

    <Transition name="content" mode="in-out">
      <LoginElement />
    </Transition>

    <Transition name="content" mode="in-out">
      <CartElement />
    </Transition>

    <Transition name="content" mode="in-out">
      <BookingElement />
    </Transition>

    <Transition name="content" mode="in-out">
      <ItemSetup />
    </Transition>
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
import { useModalStore } from "~/stores/modalStore";

export default {
  data() {
    return {
      pageLoaded: false,
      loaderDone: false,
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
/* ez lehet, h nem kell */
.body {
  background-color: var(--main-black);
  height: 100%;
  font-size: 100%;
  scroll-behavior: smooth;
  /* position: relative; */
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

/* .loader-leave-active {
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
} */

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

/* .slide-fade-enter-active {
  transition: all 1 ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */

.page-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.page-enter-active,
.page-leave-active {
  transition: all 2s;
}
/* .page-enter, */
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: all 2s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>