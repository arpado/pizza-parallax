<template>
  <div class="cart-container" v-show="cartStore.showCart">
    <div class="close-cart-arrow" @click="cartStore.toggleCart">close</div>
    <h3 class="cart-title">In Cart:</h3>
    <ul class="item-on-order-container">
      <li v-for="(pizza, index) in cartStore.pizzaOnOrder" :key="index" class="item-on-order">
        <div class="item-info">
          {{ pizza.name }} - {{ pizza.size }} - {{ pizza.quantity }} -
          {{ pizza.price }} - {{ pizza.sumPrice.toFixed(2) }}
        </div>
        <div class="item-buttons">
          <button
            class="order-manipulation-btn"
            @click="cartStore.lessPizza(index)"
          >
            -
          </button>
          <button
            class="order-manipulation-btn"
            @click="cartStore.morePizza(index)"
          >
            +
          </button>
          <button
            class="order-manipulation-btn"
            @click="cartStore.deletePizza(pizza.name, pizza.size)"
          >
            X
          </button>
        </div>
      </li>
    </ul>
    <div class="order-total">
      <p>total: {{ cartStore.totalPrice }}</p>
    </div>
    <div class="send-order">
        <button>SEND ORDER</button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../stores/cartStore";

export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
};
</script>

<style scoped>
.cart-container {
  width: 600px;
  height: 80vh;
  padding: 2rem;
  background-color: white;
  position: fixed;
  top: 18vh;
  right: 10px;
  z-index: 999;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
}
.close-cart-arrow {
    grid-row: 1/2;
}
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
.item-on-order{
    display: flex;
    justify-content: space-between;
    align-items: center;
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