<template>
  <transition name="modalanimation" :duration="300">
    <div
      class="modal-container"
      v-if="modalStore.showLogin"
      @click="modalStore.closeOnOutsideClick"
    >
  <!-- name="LAYOUT_NAME" -->
      <!-- <NuxtLayout
        
        class="layout-style"
      > -->
        <div class="modal-content-box">
          
          <div
            class="modal-close"
            @click="modalStore.toggleLogin"
          >
            <p>+</p>
          </div>
        </div>
      <!-- </NuxtLayout> -->
    </div>
  </transition>
</template>

<script>
import { useModalStore } from "../stores/modalStore";

export default {
  setup() {
    const modalStore = useModalStore();
    return { modalStore };
  },
  mounted() {
    document.addEventListener("keydown", this.modalStore.closeModalOnEscape);
  },
  unmounted() {
    document.removeEventListener("keydown", this.modalStore.closeModalOnEscape);
  },
};
</script>

<style scoped>
.modal-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s linear;
}
.layout-style {
  width: fit-content;
  height: fit-content;
  transition: all 0.3s linear;
  transition-delay: 0.3s;
}
.modal-content-box {
  width: 80%;
  height: 80%;
  background-color: white;
  position: relative;
  /* display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem; */
}

.modal-close {
  width: 50px;
  height: 50px;
  font-size: 4rem;
  font-weight: bold;
  justify-self: end;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: monospace;
}
.modal-close:hover {
  cursor: pointer;
}
.modal-close > p {
  transform: rotateZ(45deg);
}
.modalanimation-enter-active,
.modalanimation-leave-active {
  transition: all 0.3s linear;
}
.modalanimation-enter-from,
.modalanimation-leave-to {
  opacity: 0;
}
</style>