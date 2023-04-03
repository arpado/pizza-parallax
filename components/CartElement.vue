<template>
  <NuxtLayout
    class="outer-container"
    name="modal"
    v-show="modalStore.modalList.showCart"
  >
    <div class="container">
      <h3 class="cart-title">Your Cart:</h3>
      <hr />
      <ul class="item-on-order-container" v-if="cartStore.itemOnOrder.length">
        <li
          v-for="(item, index) in cartStore.itemOnOrder"
          :key="index"
          class="item-on-order flex column"
        >
          <div class="title">
            <h4>{{ item.name }}</h4>
          </div>
          <div class="item-body flex justify-between align-center">
            <div class="item-info">
              <p v-for="prop in item.props" :key="prop">
                {{ prop.description }}
              </p>
              <!-- <ul> -->
              <p v-for="(value, key) in item.props" :key="key">
                {{ key.replace(key.charAt(0), key.charAt(0).toUpperCase()) }}:
                {{
                  value.name.replace(
                    value.name.charAt(0),
                    value.name.charAt(0).toUpperCase()
                  )
                }}
              </p>
              <!-- </ul> -->
              <p>
                Additional toppings: {{ additionalList(item.selectedOptions) }}
                <!-- <span v-for="item in item.selectedOptions" :key="item" >
                  {{ item }},
                </span> -->
              </p>
              <!-- <p>Quantity: {{ item.quantity }}</p> -->
              <p>Item Price: {{ item.price.toFixed(2) }}</p>
            </div>
            <div class="flex column">
              <div class="item-buttons flex wrap justify-center align-end">
                <div class="quantity-buttons flex column">
                  <div class="flex center-both">
                    <p>Quantity:</p>
                  </div>
                  <div class="quntity-button-bar flex align-center">
                    <ButtonElementSmall
                      @click="cartStore.lessItem(index)"
                      text="-"
                    />
                    <div class="quantity-indicator flex center-both">
                      {{ item.quantity }}
                    </div>
                    <ButtonElementSmall
                      @click="cartStore.moreItem(index)"
                      text="+"
                    />
                  </div>
                </div>
                <ButtonElementSmall
                  @click="cartStore.deleteItem(item.name, item.size)"
                  iconName="bi:trash3-fill"
                />
                <!-- <button
                class="order-manipulation-btn"
                @click="cartStore.lessItem(index)"
              >
                -
              </button>
              <button
                class="order-manipulation-btn"
                @click="cartStore.moreItem(index)"
              >
                +
              </button>
              <button
                class="order-manipulation-btn"
                @click="cartStore.deleteItem(item.name, item.size)"
              >
                X
              </button> -->
              </div>
              <div class="item-total-price flex justify-end align-center">
                <p>Total Price: {{ item.sumPrice.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="empty-cart flex center-both" v-else>
        <p>Your cart is empty!</p>
      </div>
      <hr />
      <div class="order-total">
        <p>Order Total: ${{ cartStore.totalPrice }}</p>
      </div>
      <div class="send-order">
        <ButtonElement @click="proceedToCheckout" text="Proceed to Checkout" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script>
import { useCartStore } from "../stores/cartStore";
import { useModalStore } from "../stores/modalStore";

export default {
  setup() {
    const cartStore = useCartStore();
    const modalStore = useModalStore();
    return { cartStore, modalStore };
  },
  methods: {
    proceedToCheckout() {
      this.modalStore.closeModal();
      this.cartStore.lockOrder();
      this.$router.push("/checkout");
    },
    additionalList(list) {
      if (list.length > 0) {
        let res = list[0];
        for (let i = 1; i < list.length - 1; i++) {
          res = res.concat(", ", list[i]);
        }
        res = res.concat(" and ", list[list.length - 1]);
        console.log(res);
        return res;
      } else {
        return "None";
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-width: 200px;
  min-height: 150px;
  width: 80vw;
}
.cart-title {
  grid-row: 2/3;
  width: fit-content;
  margin: 15px auto;
}
.item-on-order-container,
.empty-cart {
  height: 50vh;
  grid-row: 3/10;
  border: 1px solid black;
  overflow: auto;
  list-style: none;
  font-size: initial;
  overflow-y: scroll;
  padding: 10px;
}
.item-on-order {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-body {
  width: 100%;
  flex-direction: column;
}
.empty-cart {
  min-height: 150px;
}
/* .quntity-button-bar > * {
  margin: 5px;
} */
.item-total-price {
  margin: 10px;
}
.order-total {
  grid-row: 10/11;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px;
  font-size: 1.3rem;
}
.send-order {
  grid-row: 12/13;
}
.send-order > :only-child {
  margin: 20px auto;
}
/* .order-manipulation-btn {
  width: 50px;
  height: 50px;
  margin: 10px;
  background-color: var(--main-red);
} */

/* new */
.quantity-indicator {
  height: 50px;
  width: 50px;
  min-width: fit-content;
  margin: 10px;
  padding: 1rem;
  border: 1px solid var(--main-white);
  border-radius: 10px;
  font-weight: bold;
}
@media screen and (min-width: 600px) {
  .item-body {
    flex-direction: row;
  }
}
</style>