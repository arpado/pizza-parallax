<template>
  <div class="flex column center-both">
    <h3>User History</h3>
    <div class="flex column" v-if="userStore.orderHistory">
      <div
        class="order-history"
        v-for="(item, index) in userStore.orderHistory"
        :key="index"
      >
        <!-- {{ item }} -->
        <p>
          {{ item.item_id }} -- {{ item.item_option }} --
          {{ item.item_quantity }}
        </p>
      </div>
    </div>
    <ButtonElement text="Get History" @click="userStore.getUserOrderHistory" />
  </div>
</template>

<script>
// import { useUserStore } from "@/stores/userStore";

export default {
//   setup() {
//     const userStore = useUserStore();
//     return { userStore };
//   },
  props: ['userStore']
};
</script>

<style scoped>
/* .menu-container {
  width: 100%;
  min-height: 40vh;
    min-width: 400px;
  max-width: 90vw;
} */
</style>