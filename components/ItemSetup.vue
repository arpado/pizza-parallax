<template>
  <NuxtLayout name="modal" v-if="modalStore.modalList.showItemSetup">
    <div class="container">
      <h3>Modify</h3>
      <h3 v-if="itemModStore.itemOnMod">{{ itemModStore.itemOnMod.name }}</h3>
      <p v-if="itemModStore.itemOnMod">
        {{ itemModStore.itemOnMod.description }}
      </p>
      <div class="item-buttons">
        <NuxtLayout
          name="collapsible-container"
          v-for="(prop, index) in itemModStore.itemOnMod.props"
          :key="index"
        >
          <template #title>
            <h3>{{ prop.description }}</h3>
          </template>
          <template #content>
            <div
              class="radio-selector"
              v-for="data in prop.data"
              :key="data.name"
            >
              <input
                type="radio"
                :name="index"
                :value="data.name"
                :id="data.name"
                v-model="itemModStore[prop.selector]"
              />
              <label :for="data.name"
                >{{ data.name }} -- ${{ data.price }}</label
              >
            </div>
          </template>
        </NuxtLayout>
        <NuxtLayout
          name="collapsible-container"
          v-for="(additionalOption, index) in itemModStore.additionalOptions"
          :key="index"
        >
          <template #title>
            <h3>{{ additionalOption.title }}</h3>
          </template>
          <template #content>
            <div
              class="additional-topping"
              v-for="data in additionalOption.data"
              :key="data.name"
            >
              <input
                type="checkbox"
                :name="data.name"
                :id="data.name"
                v-model="itemModStore.selectedOptions"
                :value="data.name"
              />
              <label :for="data.name"
                >{{ data.name }} -- +${{ data.price }}</label
              >
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
        <p>{{ total }}</p>
      </div>
      <div class="flex justify-evenly">
        <div class="item-quantity">
          <button @click="itemModStore.fewerItem">-</button>
          <input
            type="number"
            name=""
            min="1"
            id="item-quantity"
            class="item-quantity-input"
            v-model="itemModStore.selectedItemQuantity"
          />
        </div>
        <button @click="itemModStore.moreItem">+</button>
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
    const total = computed(() => itemModStore.getSumItemPrice);
    return { modalStore, cartStore, itemModStore, total };
  },
  data() {
    return {
      // itemProps: {
      //   sizeList: this.getSize,
      //   crustList: this.getCrust,
      // },
    };
  },
  // methods: {
  //   sendToCart(name, size, quantity, crust, toppings, price) {
  //     this.cartStore.addToOrder(name, size, quantity, crust, toppings, price);
  //   },
  // },
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
.item-quantity-input {
  width: 50px;
  text-align: center;
  -moz-appearance: textfield;
}
.item-quantity-input::-webkit-outer-spin-button,
.item-quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>