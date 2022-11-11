<template>
    <Transition name="slide-fade">
      <NuxtLayout name="modal" modalName="Login" v-if="modalStore.showBooking">
        <h3>Book Your Table</h3>
      </NuxtLayout>
  </Transition>
</template>

<script>
import { useModalStore } from "../stores/modalStore";

export default {
  setup() {
    const modalStore = useModalStore();
    return { modalStore };
  },
};
</script>

<style>
.modalanimation-enter-active,
.modalanimation-leave-active {
  transition: opacity 0.5s linear;
}
.modalanimation-enter-from,
.modalanimation-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>