<template>
<div class="additional-dimensions">
   <NuxtLayout name="card" >
    <div class="item-title">
      <h3 class="item-name">{{ item.name }}</h3>
    </div>
    <div class="item-body">
      <div class="image-section card-subsection">
        <img :src="`images/${item.image}`" alt="" />
      </div>
      <div class="text-section card-subsection">
        <div class="item-description">
          <h4>Toppings:</h4>
          <p>{{ item.description }}</p>
        </div>
        <div class="item-price">
          <p>Price starts from:</p>
          <p v-if="item.props">${{ item.props.sizeList.data[0].price }}</p>
        </div>
      </div>
    </div>
    <button
      class="order-btn btn-font flex center-both"
      @click="modifyItem(item)"
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
  props: ["item"],
  setup() {
    const modalStore = useModalStore();
    const itemModStore = useItemModificationStore();
    return { modalStore, itemModStore };
  },
  methods: {
    modifyItem(item) {
      this.itemModStore.loadItem(item);
      this.modalStore.openModal('showItemSetup')
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
.item-name {
  text-align: center;
  padding: 2rem;
}
.item-description {
  text-align: center;
  min-height: 8rem;
}
.item-price {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.item-buttons {
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
.item-quantity {
}
.item-quantity-input {
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
