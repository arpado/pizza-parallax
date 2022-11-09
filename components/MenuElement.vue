<template>
  <div class="card-background">
    <div
      data-augmented-ui="tl-scoop tr-scoop br-scoop bl-scoop both"
      class="card"
    >
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
    </div>
  </div>
</template>

<script>
// @click="addToOrder(pizza.name, selectedPizzaSize ,selectedPizzaQuantity, pizza.price)"
// import { mapActions } from "pinia";
import { useCartStore } from "../stores/cartStore";

export default {
  name: "SectionElement",
  props: ["pizza"],
  // try
  setup() {
        const cartStore = useCartStore()
        return { cartStore }
  },
  data() {
    return {
      // pizzaName: this.pizza.name,
      selectedPizzaSize: "L",
      selectedPizzaQuantity: 1,
      // sumPizzaPrice: getSumPizzaPrice,
    };
  },
  methods: {
    // ...mapActions(useCartStore, ["addToOrder"]),
    changeSize(value) {
      this.selectedPizzaSize = value;
    },
    test(pizza) {
      // console.log('poop')
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
/* .section {
  height: 1px;
  
  min-height: 50vh;
  min-width: 380px;
  width: 80vw;
  max-width: 600px;
  padding: 15px;
  background-color: var(--main-brown);
} */
.card-background {
  height: fit-content;
  /* width: 100%; */
  padding: 1rem;
  background-color: var(--main-brown);
}
.card {
  /* height: 100%;
  width: 100%; */
  height: fit-content;
  min-height: 60vh;
  min-width: 380px;
  width: 80vw;
  max-width: 500px;
  /* border: 15px solid var(--main-brown); */

  background-color: var(--main-white);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(12, 1fr); */
}
/* .card-subsection {
  width: 50%;
} */
.image-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 100%;
  /* height: 100%; */
  object-fit: cover;
  /* grid-column: 1/2;
  grid-row: 1/13; */
}
.pizza-name {
  text-align: center;
  padding: 2rem;
  /* grid-column: 2/3;
  grid-row: 1/2; */
}
.pizza-description {
  text-align: center;
  min-height: 8rem;
  /* mi a line-height? */
  /* grid-column: 2/3;
  grid-row: 2/4; */
}

/* .text-section {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
} */
.pizza-price {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* grid-column: 2/3;
  grid-row: 8/10; */
}
.pizza-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn-bar {
  /* width: 100%; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  /* height: 200px; */
  /* grid-column: 2/3;
  grid-row: 11/13; */
}
/* .size-selector {
  padding: 0.5rem 1rem;
  background-color: var(--main-black);
  color: var(--main-white);
  border: 1px solid var(--main-white);
} */
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
/* .size-selector:hover, */
.order-btn {
  cursor: pointer;
}
.size-selected {
  background-color: var(--main-white);
  color: var(--main-black);
  border: 1px solid var(--main-black);
}
</style>
