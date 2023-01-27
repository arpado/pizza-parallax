<template>
      <NuxtLayout name="modal" modalName="Login" v-if="modalStore.modalList.showBooking">
        <h3>Book Your Table</h3>
        <p>Section under construction...</p>
      </NuxtLayout>
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
</style>