<template>
  <div class="modal-container" @click="modalStore.closeOnOutsideClick">
    <div class="modal-card flex column align-end">
      <div class="modal-close flex center-both" @click="modalStore.closeModal">
        <Icon name="mdi:close-thick" size="48px" class="close-thick"/>
      </div>
      <!-- ref="card" -->
      <NuxtLayout name="card" >
          <slot />
      </NuxtLayout>
    </div>
  </div>
</template>

<script>
import { useModalStore } from "../stores/modalStore";

export default {
  setup() {
    const modalStore = useModalStore();
    return { modalStore };
  },
  //   props: ["modalName"],
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
.modal-card {
  padding-bottom: 50px;
}
.modal-close {
  width: 50px;
  height: 50px;
  font-weight: bold;
  transform: translate(35px, 15px);
  z-index: 999;
  border: 2px solid white;
  border-radius: 50%;
  transition: transform 0.15s ease-in-out;
}
.modal-close:hover {
  cursor: pointer;
}
.modal-close:active {
  transform: translate(35px, 18px) scale(0.95);
}

.close-thick {
  color: white;
}

</style>