<template>
  <div class="cart-container" v-show="cartStore.showCart">
      <h3>In Cart:</h3>
      <p>{{ cartStore.pizzaOnOrder }}</p>
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
    width: 200px;
    height: 400px;
    background-color: white;
    position: absolute;
    top: 150px;
    right: 0;
    z-index: 999;
}
</style>