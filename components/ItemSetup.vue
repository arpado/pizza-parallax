<template>
  <NuxtLayout name="modal" v-if="modalStore.modalList.showItemSetup">
    <div class="container">
      <h3 v-if="itemModStore.orderItem">{{ itemModStore.orderItem.name }}</h3>
      <p v-if="itemModStore.orderItem">
        {{ itemModStore.orderItem.description }}
      </p>
      <div class="item-buttons">
        <NuxtLayout
          name="collapsible-container"
          v-for="(itemProp, index) in itemModStore.itemProps"
          :key="index"
        >
          <template #title>
            <h3>{{ itemProp.description }}</h3>
          </template>
          <template #content>
            <div
              class="radio-selector flex"
              v-for="data in itemProp.data"
              :key="data.name"
            >
              <input
                type="radio"
                :name="index"
                :value="data.name"
                :id="data.name"
                v-model="itemModStore.propSelectors[itemProp.name]"
              />
              <label :for="data.name"
                class="radio-label flex justify-between"
                ><span>{{ data.name }}</span><span>${{ data.price }}</span></label
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
              class="checkbox-container flex"
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
                class="checkbox-label flex justify-between"
                ><span>{{ data.name }}</span><span>+${{ data.price }}</span></label
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
        <button @click="sendToCart()">Order</button>
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
  methods: {
    sendToCart() {
      this.cartStore.addToOrder(this.itemModStore.createItem());
    },
  },
};
</script>

<style scoped>
.container {
  min-width: 200px;
  width: 70vw;
  max-width: 500px;
  height: fit-content;
  max-height: 80vh;
  overflow: auto;
  scroll-margin-block-start: 1rem;
  padding-right: 0.5rem;
}
.container > * {
  margin-top: 30px;
}
.radio-label,
.checkbox-label {
  display: inline-flex;
  width: 100%;

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
@media (min-width: 650px) {
  .container {
    width: 60vw;
  }
}
</style>