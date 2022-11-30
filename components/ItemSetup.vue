<template>
  <NuxtLayout name="modal" v-if="modalStore.modalList.showItemSetup">
    <div class="container">
      <h3>Modify</h3>
      <h3 v-if="itemModStore.itemOnMod">{{ itemModStore.itemOnMod.name }}</h3>
      <p v-if="itemModStore.itemOnMod">
        {{ itemModStore.itemOnMod.description }}
      </p>
      <div class="pizza-buttons">
        <NuxtLayout name="collapsible-container">
          <template #title>
            <h3>Select Size</h3>
          </template>
          <template #content>
            <div
              class="size-selector"
              v-for="size in sizeList"
              :key="size.name"
            >
              <input
                type="radio"
                name="size"
                :value="size.name"
                :id="size.name"
                v-model="selectedPizzaSize"
              />
              <label :for="size.name"
                >{{ size.name }} -- ${{ size.price }}</label
              >
            </div>
          </template>
        </NuxtLayout>
        <NuxtLayout name="collapsible-container">
          <template #title>
            <h3>Select Crust</h3>
          </template>
          <template #content>
            <div
              class="crust-selector"
              v-for="crust in crustList"
              :key="crust.name"
            >
              <input
                type="radio"
                name="crust"
                :value="crust.name"
                :id="crust.name"
                v-model="selectedCrust"
              />
              <label :for="crust.name"
                >{{ crust.name }} -- +${{ crust.price }}</label
              >
            </div>
          </template>
        </NuxtLayout>
        <NuxtLayout name="collapsible-container">
          <template #title>
            <h3>Select Additional Toppings</h3>
          </template>
          <template #content>
            <div
              class="additional-topping"
              v-for="top in toppingsList"
              :key="top.name"
            >
              <input
                type="checkbox"
                :name="top.name"
                :id="top.name"
                v-model="selectedToppings"
                :value="top.name"
              />
              <label :for="top.name">{{ top.name }} -- +${{ top.price }}</label>
            </div>
          </template>
        </NuxtLayout>
        <NuxtLayout name="collapsible-container">
          <template #title>
            <h3>Additional Request</h3>
          </template>
          <template #content>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </template>
        </NuxtLayout>
      </div>
      <div class="price-container">
        <p>Total price:</p>
        <p>{{ getSumPizzaPrice }}</p>
      </div>
      <div class="flex justify-evenly">
        <div class="pizza-quantity">
          <button @click="fewerPizza">-</button>
          <input
            type="number"
            name=""
            min="1"
            id="pizza-quantity"
            class="pizza-quantity-input"
            v-model="selectedPizzaQuantity"
          />
        </div>
        <button @click="morePizza">+</button>
        <button
          @click="
            sendToCart(
              itemModStore.itemOnMod.name,
              selectedPizzaSize,
              selectedPizzaQuantity,
              selectedCrust,
              selectedToppings,
              getSinglePizzaPrice
            )
          "
        >
          Order
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import { useModalStore } from "../stores/modalStore";
import { useCartStore } from "../stores/cartStore";
import { useItemModificationStore } from "../stores/itemModificationStore";

export default {
  setup() {
    const modalStore = useModalStore();
    const cartStore = useCartStore();
    const itemModStore = useItemModificationStore();
    return { modalStore, cartStore, itemModStore };
  },
  data() {
    return {
      selectedPizzaQuantity: 1,
      selectedPizzaSize: "medium",
      selectedCrust: "thin",
      selectedToppings: [],
      sizeList: [
        { name: "small", price: 0.99, isSelected: false },
        { name: "medium", price: 1.49, isSelected: true },
        { name: "large", price: 1.99, isSelected: false },
        { name: "extra large", price: 2.49, isSelected: false },
      ],
      crustList: [
        { name: "thin", price: 0.0, isSelected: true },
        { name: "thick", price: 0.49, isSelected: false },
        { name: "cheese", price: 0.99, isSelected: false },
      ],
      toppingsList: [
        { name: "cheese", price: 0.99, isSelected: false },
        { name: "ham", price: 1.49, isSelected: false },
        { name: "mushroom", price: 1.49, isSelected: false },
        { name: "salami", price: 1.99, isSelected: false },
      ],
    };
  },
  methods: {
    fewerPizza() {
      if (this.selectedPizzaQuantity > 1) {
        this.selectedPizzaQuantity--;
      }
    },
    morePizza() {
      this.selectedPizzaQuantity++;
    },
    sendToCart(name, size, quantity, crust, toppings, price) {
      this.cartStore.addToOrder(name, size, quantity, crust, toppings, price);
    },
  },
  computed: {
    getSinglePizzaPrice() {
      let selectedSize = this.sizeList.filter(
        (elem) => elem.name === this.selectedPizzaSize
      )[0].price;
      let selectedCrust = this.crustList.filter(
        (elem) => elem.name === this.selectedCrust
      )[0].price;
      let selectedTopPriceList = [];
      this.selectedToppings.forEach((top) => {
        let elem = this.toppingsList.filter((elem) => elem.name === top)[0]
          .price;
        selectedTopPriceList.push(elem);
      });
      let topPrice = selectedTopPriceList.reduce(
        (accum, curr) => accum + curr,
        0
      );
      return (selectedSize + selectedCrust + topPrice).toFixed(2);
    },
    getSumPizzaPrice() {
      return (this.getSinglePizzaPrice * this.selectedPizzaQuantity).toFixed(2);
    },
  },
};
</script>

<style scoped>
.container {
  width: fit-content;
  max-width: 500px;
  height: fit-content;
  max-height: 80vh;
  overflow: auto;
}
.container > * {
  margin-top: 30px;
}
.pizza-quantity-input {
  width: 50px;
  text-align: center;
  -moz-appearance: textfield;
}
.pizza-quantity-input::-webkit-outer-spin-button,
.pizza-quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>