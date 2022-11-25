<template>
<div class="additional-dimensions">
   <NuxtLayout name="card" >
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
          <p>Price starts from:</p>
          <p>${{ pizza.price }}</p>
        </div>
      </div>
    </div>
    <button
      class="order-btn btn-font flex center-both"
      @click="modifyPizza(pizza)"
    >
      Select Item
    </button>
  </NuxtLayout>
  </div> 
</template>

<script>
import { useModalStore } from "~/stores/modalStore";
import { useItemModificationStore } from "~/stores/itemModificationStore";

export default {
  name: "SectionElement",
  props: ["pizza"],
  setup() {
    const modalStore = useModalStore();
    const itemModStore = useItemModificationStore();
    return { modalStore, itemModStore };
  },
  methods: {
    modifyPizza(pizza) {
      this.modalStore.toggleItemSetup(pizza);
      this.itemModStore.loadItem(pizza);
    },
  },
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
  margin: 0 auto;
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
