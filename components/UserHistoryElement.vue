<template>
  <div class="flex column center-both">
    <h3>User History</h3>
    <div class="flex column" v-if="userStore.orderHistory">
      <div
        class="orders-container"
        v-for="(order, index) in userStore.orderHistory"
        :key="index"
      >
        <p class="order-id">Order ID: {{ order.orderId }}</p>
        <div
          class="item-container flex column justify-between align-start"
          v-for="(item, index) in order.items"
          :key="index"
        >
          <div class="name-container flex justify-between align-center">
            <p class="item-name">Item Name: {{ item.name }}</p>
            <div class="flex justify-center align-end column">
              <p>Item Quantity: {{ item.quantity }}</p>
              <p>Item Price: $0</p>
            </div>
          </div>
          <div>Item Size: {{ item.size }}</div>
          <div v-for="(prop, index) in item.props" :key="index">
            <p v-for="(value, key, index) in prop" :key="index">
              Item {{ key }}: {{ value }}
            </p>
          </div>
          <div>
            <span>Additional Options Selected: </span>
            <span v-for="(option, index) in item.options" :key="index"
              >{{ option }},
            </span>
          </div>
        </div>
        <p class="order-total">Order Total: ${{ order.orderTotal }}</p>
        <hr />
      </div>
    </div>
    <ButtonElement text="Get History" @click="userStore.getUserOrderHistory" />
  </div>
</template>

<script>
export default {
  props: ["userStore"],
};
</script>

<style scoped>
/* .menu-container {
  width: 100%;
  min-height: 40vh;
    min-width: 400px;
  max-width: 90vw;
} */
.orders-container {
  padding: 1rem;
  /* margin: 1rem; */
}
.item-container {
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px 5px;
  padding: 1rem;
}
.name-container {
  width: 100%;
}
.order-total {
  text-align: right;
}
</style>