<template>
  <div class="container">
    <div class="inner-container flex align-center column gap-2">
      <div class="menu-title flex center-both">
        <h2>Menu:</h2>
      </div>
      <div
        class="menu-section-buttons flex justify-evenly align-center wrap gap-1"
      >
        <ButtonElement
          class="menu-selector-btn"
          @click="setMenu('pizzas', null, [{size: 1}], 'name')"
          
          text="Pizzas"
        />
        <ButtonElement
          class="menu-selector-btn"
          @click="setMenu('drinks', null, [{size: 7}, {size: 8}], 'name')"
          text="Drinks"
        />
        <ButtonElement
          class="menu-selector-btn"
          @click="setMenu('desserts', null, [{size: 1}], 'name')"
          text="Desserts"
        />
      </div>
      <div
        class="menu-list flex wrap justify-center gap-1"
        v-if="itemArray.length"
      >
        <MenuElement
          v-for="item in itemArray"
          :key="item.name"
          :item="item"
          :activeTable="activeTable"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getItemData } from "@/composables/serverRequests";
import { useUserStore } from "@/stores/userStore";
import { useCartStore } from "@/stores/cartStore";

export default {
  setup() {
    const userStore = useUserStore();
    const cartStore = useCartStore();
    
    return { userStore, cartStore };
  },
  data() {
    return {
      itemArray: [],
      activeTable: "pizzas",
    };
  },
  methods: {
    async setMenu(table, selectedParams, matchParams, orderByParam) {
      let result = await getItemData(table, selectedParams, matchParams, orderByParam);
      this.itemArray = result.data;
      this.activeTable = table;
    },
  },
  mounted() {
    this.setMenu('pizzas', null, [{size: 1}], 'name');
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  min-height: calc(100vh - 70px);
  background-image: url("/images/pizza4.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  /* parallax - fixed; no-parallax - scroll*/
  background-attachment: fixed;
}
.inner-container {
  width: 100%;
  height: 100%;
  padding: 130px 0 50px 0;
  overflow-y: hidden;
}
.menu-title {
  width: 100%;
  margin-top: 20px;
}
.menu-list {
  width: 100%;
}
h2 {
  padding: 2rem;
  background-color: var(--main-black);
  color: var(--main-white);
}
.menu-selector-btn {
  background-color: var(--main-black);
  color: var(--main-white);
  font-weight: bold;
  height: 60px;
  width: 180px;
}
</style>