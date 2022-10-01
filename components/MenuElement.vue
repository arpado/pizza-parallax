<template>
  <!-- <div class="section"> -->
    <div class="card">
      <!-- <div class="image card-subsection"> -->
        <img :src="`assets/${pizza.image}`" alt="" />
      <!-- </div> -->
      <!-- <div class="text-section card-subsection"> -->
        <h3 class="pizza-name">{{ pizza.name }}</h3>
        <div class="pizza-description">
          <h4>Toppings:</h4>
          <p>{{ pizza.description }}</p>
        </div>
        <div class="pizza-price">
          <p>Price:</p>
          <p>${{ pizza.price }}</p>
        </div>
        <div class="btn-bar">
          <div class="size-selector-bar">
            <span class="size-selector btn-font" :class="{'size-selected': selectedPizzaSize === 'S'}" @click="changeSize('S')">S</span>
            <span class="size-selector btn-font" :class="{'size-selected': selectedPizzaSize === 'M'}" @click="changeSize('M')">M</span>
            <span class="size-selector btn-font" :class="{'size-selected': selectedPizzaSize === 'L'}" @click="changeSize('L')">L</span>
            <span class="size-selector btn-font" :class="{'size-selected': selectedPizzaSize === 'XL'}" @click="changeSize('XL')">XL</span>
          </div>
          <div class="order-btn btn-font">Add to cart</div>
        </div>
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "SectionElement",
  props: ["pizza"],
  data() {
    return {
      selectedPizzaSize: 'L'
    }
  },
  methods: {
    changeSize(value) {
      this.selectedPizzaSize = value
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
.card {
  /* height: 100%;
  width: 100%; */
  height: 1px;
  min-height: 60vh;
  min-width: 380px;
  width: 80vw;
  max-width: 600px;
  border: 15px solid var(--main-brown);

  background-color: var(--main-white);
  padding: 2%;
  /* display: flex; */
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(12, 1fr);;
}
/* .card-subsection {
  width: 50%;
} */
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-column: 1/2;
  grid-row: 1/13;
}
.pizza-name {
  text-align: center;
  padding: 2rem;
  grid-column: 2/3;
  grid-row: 1/2;
}
.pizza-description {
  text-align: center;
  grid-column: 2/3;
  grid-row: 2/4;
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
  grid-column: 2/3;
  grid-row: 8/10;
}
.btn-bar {
    width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  height: 200px;
  grid-column: 2/3;
  grid-row: 11/13;
}
.size-selector {
  padding: 0.5rem 1rem;
  background-color: var(--main-black);
  color: var(--main-white);
  border: 1px solid var(--main-white);
}
.order-btn {
  padding: 1rem 2rem;
  background-color: var(--main-red);
  color: var(--main-black);
  border: 1px solid var(--main-black);
}
.size-selector:hover,
.order-btn {
  cursor: pointer;
}
.size-selected {
  background-color: var(--main-white);
  color: var(--main-black);
  border: 1px solid var(--main-black);
  
}
</style>
