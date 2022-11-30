<template>
  <div class="container">
    <div class="inner-container">
      <div class="menu-title">
        <h2>Menu:</h2>
      </div>
      <div class="menu-section-buttons flex justify-evenly align-center wrap gap-1">
        <ButtonElement class="menu-selector-btn" @click="setActiveMenu('pizza')" text="Pizzas"/>
        <ButtonElement class="menu-selector-btn" @click="setActiveMenu('drinks')" text="Drinks"/>
        <ButtonElement class="menu-selector-btn" @click="setActiveMenu('desserts')" text="Desserts"/>
      </div>
      <div class="menu-list" v-show="activeMenu === 'pizza'">
        <MenuElement v-for="pizza in pizzaArray" :key="pizza.name" :pizza="pizza" />
      </div>
       <div class="menu-list" v-show="activeMenu === 'drinks'">
        <MenuElement v-for="item in drinkArray" :key="item.name" :pizza="item" />
      </div>
       <div class="menu-list" v-show="activeMenu === 'desserts'">
        <MenuElement v-for="item in dessertArray" :key="item.name" :pizza="item" />
      </div>
    </div>
  </div>
</template>

<script>
import pizzaArray from "../content/pizza-menu.json";
import drinkArray from "../content/drink-menu.json";
import dessertArray from "../content/dessert-menu.json";

export default {
  data() {
    return {
      activeMenu: "pizza",
      pizzaArray: pizzaArray,
      drinkArray: drinkArray,
      dessertArray: dessertArray,
    }
  },
  methods: {
    setActiveMenu(name) {
      this.activeMenu = name
    }
  },
}
</script>

<style scoped>
.container {
  width: 100%;
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
  /* padding: 1rem; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 2rem;
  overflow-y: hidden;
}
.menu-title {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
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
}
</style>