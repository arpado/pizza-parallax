<template>
  <div class="cart-container" v-show="cartStore.showCart">
      <h3>In Cart:</h3>
      <ul>
          <li v-for="(pizza, index) in cartStore.pizzaOnOrder" :key="index">
              {{pizza.name}} - {{pizza.size}} - {{pizza.quantity}} - {{pizza.price}} - {{pizza.sumPrice.toFixed(2)}}
            <button @click="cartStore.lessPizza(index)">--</button>
            <button @click="cartStore.morePizza(index)">+</button>
            <button @click="cartStore.deletePizza(pizza.name, pizza.size)">X</button>
          </li>
      </ul>
      <p>total: {{ cartStore.totalPrice }}</p>
  </div>
</template>

<script>
import { useCartStore } from "../stores/cartStore";

export default {
    setup() {
        const cartStore = useCartStore()
        return { cartStore }
    }
}
</script>

<style>
.cart-container {
    width: 400px;
    height: fit-content;
    padding: 2rem;
    background-color: white;
    position: fixed;
    top: 150px;
    right: 0;
    z-index: 999;
}
</style>