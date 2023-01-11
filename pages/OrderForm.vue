<template>
  <div class="container flex center-both">
    <NuxtLayout name="card-full-page">
      <div class="card flex column align-center">
        <div class="oreder-header-section">
          <h3>Please, confirm your order:</h3>
        </div>
        <div class="order-body-section flex">
          <div class="user-info-container">
            <h3>USER INFO WILL BE HERE</h3>
          </div>
          <div class="order-info-container">
            <div v-if="cartStore.itemOnOrder.length">
              <div
                class="order-item"
                v-for="item in cartStore.itemOnOrder"
                :key="item.name"
              >
                <h4>{{ item.name }}</h4>
                <p v-for="prop in item.props" :key="prop">
                  {{ prop.description }}
                </p>
                <p>{{ item.selectedOptions }}</p>
                <p>{{ item.quantity }}</p>
                <p>{{ item.price.toFixed(2) }}</p>
                <p>{{ item.sumPrice.toFixed(2) }}</p>
                <hr />
              </div>
            </div>
            <div v-else>
              <h4>Your cart is empty!</h4>
            </div>
          </div>
        </div>
        <div class="order-button-container">
          <button>Go Back</button>
          <button @click="sendOrder(cartStore.itemOnOrder)">Send Order</button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { sendOrder } from "@/composables/serverRequests"

export default {
  setup() {
    const cartStore = useCartStore();
    const userStore = useUserStore();
    return { cartStore, userStore };
  },
};
</script>

<style scoped>
.container {
  /* justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-image: url("/assets/pizza3.jpg");
  background-size: cover;
  background-position: center; */
  min-height: calc(100vh - 4rem);
  overflow-x: hidden;
  /* width: 100vw; */
}
.card {
  width: calc(100vw - 6rem);
  min-height: calc(70vh - 6rem);
  height: fit-content;
}
.order-body-section {
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.order-info-container,
.user-info-container {
  width: 100%;
  height: fit-content;
  text-align: center;
}
@media (min-width: 800px) {
  .order-body-section {
    flex-direction: row-reverse;
  }
}
</style>