<template>
  <div class="additional-dimensions">
    <NuxtLayout name="card">
      <div class="item-title">
        <h3 class="item-name">{{ item.name }}</h3>
      </div>
      <div class="item-body">
        <div class="flex center-both">
          <img data-test="image" :src="item.image" alt="" />
        </div>
        <div>
          <div class="item-description">
            <h4>Toppings:</h4>
            <p data-test="description">{{ item.description }}</p>
          </div>
          <div class="item-price flex align-center justify-between">
            <span>Price starts from:</span>
            <span data-test="price">${{ item.price }}</span>
          </div>
        </div>
      </div>
      <!-- <button
        class="order-btn btn-font flex center-both"
        @click="modifyItem(item, activeTable)"
      >
        Select Item
      </button> -->
      <ButtonElement  class="order-btn" @click="modifyItem(item, activeTable)" text="Select Item"/>
    </NuxtLayout>
  </div>
</template>

<script>
import { useModalStore } from "@/stores/modalStore";
import { useItemModificationStore } from "@/stores/itemModificationStore";

export default {
  name: "SectionElement",
  props: ["item", "activeTable"],
  setup() {
    const modalStore = useModalStore();
    const itemModStore = useItemModificationStore();
    return { modalStore, itemModStore };
  },
  methods: {
    // should be redone
    async modifyItem(item, table) {
      let itemToBeModified = {
        name: item.name,
        id: item.id,
        table: table,
        image: item.image,
        description: item.description,
      };
      this.itemModStore.loadItem(itemToBeModified, table);
      this.modalStore.openModal("showItemSetup");
    },
  },
};
</script>

<style scoped>
.additional-dimensions {
  min-height: 60vh;
  min-width: 200px;
  width: 80vw;
  max-width: 350px;
  box-shadow: 2px 2px 5px 2px black;
}
img {
  width: 100%;
  object-fit: cover;
}
.item-name {
  text-align: center;
  margin-bottom: 1rem;
}
.item-description {
  min-height: 8rem;
  margin: 1rem 0;
}
.item-description > h4 {
  text-align: center;
  margin-bottom: 0.5rem;
}
.item-price {
  width: 100%;
  margin: 1rem 0;
}
.order-btn {
  /* padding: 1rem 2rem; */
  margin: 1rem auto 0;
  /* background-color: var(--main-red);
  color: var(--main-black);
  border: 1px solid var(--main-black);
  cursor: pointer; */
}
</style>
