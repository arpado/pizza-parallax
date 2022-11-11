<template>
    <NuxtLayout name="card" class="additional-dimensions">
      <div class="pizza-title">
        <h3 class="pizza-name">{{ pizza.name }}</h3>
      </div>
      <div class="pizza-body">
        <div class="image-section card-subsection">
          <img :src="`images/${pizza.image}`" alt="" />
        </div>
        <div class="text-section card-subsection">
          <div class="pizza-description">
            <h4>Toppings:</h4>
            <p>{{ pizza.description }}</p>
          </div>
          <div class="pizza-price">
            <p>Price:</p>
            <p>${{ getSumPizzaPrice }}</p>
          </div>
        </div>
      </div>
      <div class="pizza-buttons">
        <div class="btn-bar">
          <div class="size-selector-bar">
            <PizzaSizeSelector size="S" :selectedPizzaSize="selectedPizzaSize" @emitChangeSize="changeSize"/>
            <PizzaSizeSelector size="M" :selectedPizzaSize="selectedPizzaSize" @emitChangeSize="changeSize"/>
            <PizzaSizeSelector size="L" :selectedPizzaSize="selectedPizzaSize" @emitChangeSize="changeSize"/>
            <PizzaSizeSelector size="XL" :selectedPizzaSize="selectedPizzaSize" @emitChangeSize="changeSize"/>
          </div>
        </div>
        <div class="pizza-quantity">
          <input type="number" name="" min="1" id="pizza-quantity" class="pizza-quantity-input" v-model="selectedPizzaQuantity"/>
        </div>
      </div>
      <div class="order-btn btn-font" @click="resetAndSend(pizza.name, selectedPizzaSize ,selectedPizzaQuantity, pizza.price)">
        Add to cart
      </div>
    </NuxtLayout>
</template>

<script>
// @click="addToOrder(pizza.name, selectedPizzaSize ,selectedPizzaQuantity, pizza.price)"
import { useCartStore } from "../stores/cartStore";

export default {
  name: "SectionElement",
  props: ["pizza"],
  setup() {
        const cartStore = useCartStore()
        return { cartStore }
  },
  data() {
    return {
      selectedPizzaSize: "L",
      selectedPizzaQuantity: 1,
    };
  },
  methods: {
    changeSize(value) {
      this.selectedPizzaSize = value;
    },
    test(pizza) {
      console.log(pizza);
    },
    resetAndSend(name, size, quantity, price) {
      const store = useCartStore()
      store.addToOrder(name, size, quantity, price)
      this.selectedPizzaQuantity = 1
    },
  },
  computed: {
    getSumPizzaPrice() {
      return this.selectedPizzaQuantity * this.pizza.price 
    }
  }
};
</script>

<style scoped>
.additional-dimensions {
  min-height: 60vh;
  min-width: 380px;
  width: 80vw;
  max-width: 500px;
}
.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 100%;
  object-fit: cover;
}
.pizza-name {
  text-align: center;
  padding: 2rem;
}
.pizza-description {
  text-align: center;
  min-height: 8rem;
}
.pizza-price {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.pizza-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.pizza-quantity {

}
.pizza-quantity-input {
  width: 100px;
}
.order-btn {
  padding: 1rem 2rem;
  background-color: var(--main-red);
  color: var(--main-black);
  border: 1px solid var(--main-black);
}
.order-btn {
  cursor: pointer;
}
.size-selected {
  background-color: var(--main-white);
  color: var(--main-black);
  border: 1px solid var(--main-black);
}
</style>
