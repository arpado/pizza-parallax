<template>
  <div class="body">
    <TransitionGroup name="content" mode="in-out" appear>
      <LoaderElement
        class="loader"
        v-if="!pageLoaded || !loaderDone"
        @slices-done="this.loaderDone = true"
        key="loader"
      />
      <div class="main-content" v-else>
        <NuxtLayout name="default" key="page" appear>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </TransitionGroup>

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

<script>
import gsap from "gsap";
import { useModalStore } from "~/stores/modalStore";
import { useUserStore } from "@/stores/userStore";

export default {
  data() {
    return {
      pageLoaded: false,
      loaderDone: false,
    };
  },
  setup() {
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:finish", () => {
      window.scrollTo(0, 0);
    });
    const modalStore = useModalStore();
    const userStore = useUserStore();
    return { modalStore, userStore };
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
  async mounted() {
    await this.userStore.checkActiveUser();
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
  /* font-size: 100%; */
  scroll-behavior: smooth;
  font-family: Roboto Slab;
}
/* ez lehet, h nem kell */
.body {
  /* background-color: var(--main-black); */
  background: repeating-linear-gradient(
    45deg,
    #606dbc,
    #606dbc 10px,
    #465298 10px,
    #465298 20px
  );
  height: 100%;
  font-size: 100%;
  scroll-behavior: smooth;
  /* position: relative; */
}
:root {
  --main-red: #fd1d01;
  --main-brown: #ba8475;
  --main-white: #fff6f2;
  --main-black: rgb(40, 23, 19);
  --main-black-opaque: rgba(40, 23, 19, 0.8);
}
h2 {
  /* font-size: 2rem; */
}
p,
label,
input,
h3,
h4,
button,
.btn-font {
  /* font-size: 1rem; */
}
@media (min-width: 800px) {
  h2 {
    /* font-size: 2rem; */
  }
  p,
  label,
  input,
  h3,
  h4,
  button,
  .btn-font {
    /* font-size: 1.5rem; */
  }
}

/* new */
p + p {
  margin-top: 10px;
}
::-webkit-scrollbar {
  width: 5px;
  /* height: 5px; */
}
::-webkit-scrollbar-track {
  background-color: black;
  /* margin: 1rem; */
}
::-webkit-scrollbar-thumb {
  background: var(--main-red);
  border-radius: 5px;
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

/* EZ A PAGE ITT A FO ANIMACIO */
.page-enter-from {
  opacity: 0;
  transform: translateY(100px);
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

.modalanimation-enter-active,
.modalanimation-leave-active {
  transition: opacity 0.5s linear;
}
.modalanimation-enter-from,
.modalanimation-leave-to {
  opacity: 0;
}
/* .background-stripes {
  background: repeating-linear-gradient(
    45deg,
    var(--main-red),
    var(--main-red) 10px,
    var(--main-white) 10px,
    var(--main-white) 20px,
    var(--main-brown) 20px,
    var(--main-brown) 30px,
    var(--main-black) 30px,
    var(--main-black) 40px
  );
} */
/* .background-stripes {
  background: repeating-linear-gradient(
    45deg,
    #606dbc,
    #606dbc 10px,
    #465298 10px,
    #465298 20px
  );
} */

/* PARALLAX  at a later point in time*/
.parallax-wrapper {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  perspective: 10px;
}

.parallax-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transform-style: preserve-3d;
  z-index: -1;
}

.parallax-background {
  transform: translateZ(-10px) scale(2);
}

.parallax-foreground {
  transform: translateZ(-5px) scale(1.5);
}

.parallax-background,
.parallax-foreground {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>