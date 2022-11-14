<template>
  <NuxtLayout name="modal" v-show="modalStore.showItemSetup">
  <div class="container" >
    <h3>Modify</h3>
    <p @click="modalStore.closeModal">close</p>
    <p>{{ itemModStore.itemOnMod }}</p>
    <div class="pizza-buttons">
        <div class="btn-bar">
          <div class="size-selector-bar">
            <PizzaSizeSelector size="S" :selectedPizzaSize="selectedPizzaSize" @emitChangeSize="changeSize"/>
            <PizzaSizeSelector size="M" :selectedPizzaSize="selectedPizzaSize" @emitChangeSize="changeSize"/>
            <PizzaSizeSelector size="L" :selectedPizzaSize="selectedPizzaSize" @emitChangeSize="changeSize"/>
            <PizzaSizeSelector size="XL" :selectedPizzaSize="selectedPizzaSize" @emitChangeSize="changeSize"/>
          </div>
        </div>
        <div class="pizza-quantity">
          <input type="number" name="" min="1" id="pizza-quantity" class="pizza-quantity-input" v-model="selectedPizzaQuantity"/>
        </div>
        <div class="crust-selector">
          <!-- <label for="crust">Crust</label> -->
          <label for="crust-thin">Thin Crust</label>
          <input type="radio" name="crust" id="crust-thin" value="thin">
          <!-- <p>thin</p> -->
          <label for="crust-thick">Thick Crust</label>
          <input type="radio" name="crust" id="crust-thick" value="thick">
          <!-- <p>thick</p> -->
          <label for="crust-cheese">Thick Crust with Cheese</label>
          <input type="radio" name="crust" id="crust-cheese" value="cheese">
          <!-- <p>cheese</p> -->
        </div>
        <div class="additional-topping">
          <select name="" id="">
            <option value="none" default>--Select additional topping--</option>
            <option value="cheese">Cheese</option>
            <option value="salami">Salami</option>
            <option value="bacon">Bacon</option>
            <option value="mushroom">Mushroom</option>
            <option value="tomato">Tomato</option>
            <option value="pepperoni">Pepperoni</option>
            <option value="egg">Egg</option>
            <option value="corn">Corn</option>
          </select>
        </div>
      </div>
      <button @click="modalStore.closeModal">Cancel</button>
      <button @click="sendData(selectedPizzaSize)">modify</button>
  </div>
  </NuxtLayout>
</template>

<script>
import { useModalStore } from '../stores/modalStore';
import { useItemModificationStore } from '../stores/itemModificationStore';

export default {
  // props: ["item"],
  setup() {
    const modalStore = useModalStore();
    const itemModStore = useItemModificationStore();
    return { modalStore, itemModStore }
  },
  data() {
    return {
      selectedPizzaSize: "L",
      selectedPizzaQuantity: 1,
      // pizza: this.pizza,
    };
  },
  methods: {
    changeSize(value) {
      this.selectedPizzaSize = value;
    },
  }

}
</script>

<style scoped>
.container {
    width: 100%;
    height: 50vh;
    /* background-color: white; */
    /* bottom: 0;
    left: 0; */
    /* position: fixed; */
} 
.container > * {
  margin-top: 30px;
}
</style>