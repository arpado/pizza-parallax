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
          {{item.order_unit_id}} -- {{ item.item_id }} -- {{ item.item_option }} --
          {{ item.item_quantity }}
        </p>
      </div>

      <ButtonElement text="Get All Orders" @click="userStore.getAllOrderHistory"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userStore"],
};
</script>

<style scoped>
</style>