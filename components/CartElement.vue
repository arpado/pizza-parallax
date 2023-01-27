<template>
  <div class="cart-container" v-show="modalStore.modalList.showCart">
    <NuxtLayout name="modal">
    <h3 class="cart-title">In Cart:</h3>
    <ul class="item-on-order-container">
      <li
        v-for="(item, index) in cartStore.itemOnOrder"
        :key="index"
        class="item-on-order flex column"
      >
        <div class="title">
          <h4>{{ item.name }}</h4>
        </div>
        <div class="item-body flex row justify-between align-center">
          <div class="item-info">
            <p v-for="prop in item.props" :key="prop">{{prop.description}}</p>
            <p>Additional toppings: <span v-for="item in item.selectedOptions" :key="item"> {{ item }},</span></p>
            <p>Quantity: {{ item.quantity }}</p>
            <p>Price: {{ item.sumPrice.toFixed(2) }}</p>
          </div>
          <div class="item-buttons">
            <button
              class="order-manipulation-btn"
              @click="cartStore.lessItem(index)"
            >
              -
            </button>
            <button
              class="order-manipulation-btn"
              @click="cartStore.moreItem(index)"
            >
              +
            </button>
            <button
              class="order-manipulation-btn"
              @click="cartStore.deleteItem(item.name, item.size)"
            >
              X
            </button>
          </div>
        </div>
      </li>
    </ul>
    <div class="order-total">
      <p>total: {{ cartStore.totalPrice }}</p>
    </div>
    <div class="send-order">
      <button @click="sendOrder">SEND ORDER</button>
    </div>
    </NuxtLayout>
  </div>
</template>

<script>
import { useCartStore } from "../stores/cartStore";
import { useModalStore } from "../stores/modalStore"

export default {
  setup() {
    const cartStore = useCartStore();
    const modalStore = useModalStore();
    return { cartStore, modalStore };
  },
  methods: {
    sendOrder() {
      this.modalStore.closeModal()
      this.$router.push('/OrderForm')
    }
  },
};
</script>

<style scoped>
.cart-title {
  grid-row: 2/3;
}
.item-on-order-container {
  grid-row: 3/10;
  border: 1px solid black;
  overflow: auto;
  list-style: none;
  font-size: initial;
}
.item-on-order {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-body {
  width: 100%;
}
.order-total {
  grid-row: 10/11;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.send-order {
  grid-row: 12/13;
}
.order-manipulation-btn {
  width: 50px;
  height: 50px;
  margin: 10px;
  background-color: var(--main-red);
}
</style>