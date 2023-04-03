<template>
  <NuxtLayout name="modal" v-if="modalStore.modalList.showItemSetup">
    <div class="container">
      <h2 v-if="itemModStore.itemOnMod">{{ itemModStore.itemOnMod.name }}</h2>
      <p v-if="itemModStore.itemOnMod">
        {{ itemModStore.itemOnMod.description }}.
      </p>
      <div class="item-buttons">
        <NuxtLayout
          name="collapsible-container"
          v-for="(itemProp, index) in itemModStore.aggregatedProps.propOptions"
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
                v-model="
                  itemModStore.aggregatedProps.selectedProps[itemProp.name]
                "
              />
              <label :for="data.name" class="radio-label flex justify-between"
                ><span>{{ data.name }}</span
                ><span>${{ data.price }}</span></label
              >
            </div>
          </template>
        </NuxtLayout>
        <NuxtLayout
          name="collapsible-container"
          v-for="(additionalOption, index) in itemModStore.aggregatedProps
            .additionalOptions"
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
                v-model="itemModStore.aggregatedProps.selectedOptions"
                :value="data.name"
              />
              <label
                :for="data.name"
                class="checkbox-label flex justify-between"
                ><span>{{ data.name }}</span
                ><span>+${{ data.price }}</span></label
              >
            </div>
          </template>
        </NuxtLayout>
        <!-- <NuxtLayout name="collapsible-container">
          <template #title>
            <h3>Additional Request</h3>
          </template>
          <template #content>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </template>
        </NuxtLayout> -->
      </div>
      <div class="price-container flex justify-between">
        <h3>Total price:</h3>
        <h3>{{ total }}</h3>
      </div>
      <div class="item-quantity flex justify-evenly align-center wrap">
        <div class="flex justify-evenly align-center">
          <ButtonElementSmall text="-" @click="itemModStore.fewerItem" />
          <input
            type="number"
            name=""
            min="1"
            id="item-quantity"
            class="item-quantity-input"
            v-model="itemModStore.selectedItemQuantity"
          />
          <ButtonElementSmall text="+" @click="itemModStore.moreItem" />
        </div>
        <ButtonElement text="Order" @click="addToCart" />
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
    addToCart() {
      // this.cartStore.addToCart(this.itemModStore.createItem());
      // this.modalStore.closeModal();
      // useNuxtApp().$toast.success(`Added to cart!`);
      // useNuxtApp().$toast.error(`Something went wrong!`)  
      this.cartStore.addToCart();
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
/* .container > * {
  margin-top: 30px;
} */
h2,
.item-buttons {
  margin-top: 30px;
}
.radio-label,
.checkbox-label {
  display: inline-flex;
  width: 100%;
}
input[type="radio"],
input[type="checkbox"] {
  margin-right: 10px;
}
.price-container {
  margin: 20px;
}
.item-quantity-input {
  /* width: 50px; */
  text-align: center;
  -moz-appearance: textfield;

  height: 50px;
  width: 60px;
  /* min-width: -moz-fit-content;
    min-width: fit-content; */
  /* margin: 10px; */
  padding: 1rem;
  border: 1px solid var(--main-white);
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
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