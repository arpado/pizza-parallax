<template>
  <div class="container flex center-both">
    <NuxtLayout name="card">
      <div class="card flex column align-center">
        <div class="order-header-section">
          <h3>Please, confirm your order:</h3>
        </div>
        <div class="order-body-section flex align-start gap-2">
          <div class="user-info-container">
            <div class="user-info" v-if="userStore.user">
              <h3>Welcome back, {{ userStore.user.firstName }}!</h3>
              <table class="user-data-table">
                <thead>
                  <tr>
                    <th colspan="2" class="user-data-table-header">
                      Customer Data:
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>
                      {{ userStore.user.firstName }}
                      {{ userStore.user.lastName }}
                    </td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{{ userStore.user.address }}</td>
                  </tr>
                  <tr>
                    <td>Billing Address:</td>
                    <td>{{ userStore.user.address }}</td>
                  </tr>
                  <tr>
                    <td>Phone Number:</td>
                    <td>{{ userStore.user.phone }}</td>
                  </tr>
                  <tr>
                    <td>Email Address:</td>
                    <td>{{ userStore.user.email }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="additional-requests">
                <h3>Additional Request</h3>
                <textarea
                  name="additional-requests"
                  id="additional-requests"
                  cols="30"
                  rows="10"
                  placeholder="Do you wish something else? Just write it in here, and it will be sent along with your order!"
                ></textarea>
              </div>
            </div>
            <div
              class="login-form flex column justify-around align-center"
              v-else
            >
              <h3>PLEASE LOG IN TO ORDER!</h3>
              <form
                v-on:submit.prevent="userStore.login(email, password)"
                action="#"
                method="POST"
              >
                <div class="input-box flex justify-center align-start column">
                  <label for="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email-checkout"
                    v-model="email"
                    @keyup.enter="userStore.login(email, password)"
                  />
                  <hr />
                </div>
                <div class="input-box flex justify-center align-start column">
                  <label for="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    id="password-checkout"
                    v-model="password"
                    @keyup.enter="userStore.login(email, password)"
                  />
                  <hr />
                </div>
              </form>
              <div>
                <ButtonElement
                  id="login-button-checkout"
                  class="self-center"
                  text="Login"
                  type="submit"
                  @click="userStore.login(email, password)"
                />
              </div>

              <p>
                Not registered yet?
                <NuxtLink to="/user-registration">Register Here!</NuxtLink>
              </p>
            </div>
          </div>
          <div class="order-info-container flex column justify-between">
            <div
              v-if="cartStore.itemOnOrder.length"
              class="flex column justify-between align-end flex-1"
            >
              <div>
                <div class="order-info-header">
                  <div class="item-data-header">
                    <h3>Item</h3>
                  </div>
                  <div class="item-quantity-header">
                    <h3>Quantity</h3>
                  </div>
                  <div class="item-price-header">
                    <h3>Price</h3>
                  </div>
                  <div class="item-total-price-header">
                    <h3>Total Price</h3>
                  </div>
                  <hr class="item-separator" />
                </div>
                <div
                  class="order-item"
                  v-for="item in cartStore.itemOnOrder"
                  :key="item.name"
                >
                  <div class="item-data">
                    <h4>{{ item.name }}</h4>
                    <p v-for="prop in item.props" :key="prop">
                      {{ prop.description }}
                    </p>

                    <p v-for="(value, key) in item.props" :key="key">
                      {{
                        key.replace(key.charAt(0), key.charAt(0).toUpperCase())
                      }}:
                      {{
                        value.name.replace(
                          value.name.charAt(0),
                          value.name.charAt(0).toUpperCase()
                        )
                      }}
                    </p>

                    <p>
                      Additional toppings:
                      {{ additionalList(item.selectedOptions) }}
                    </p>
                  </div>
                  <div class="item-quantity">
                    <p>{{ item.quantity }}</p>
                  </div>
                  <div class="item-price">
                    <p>{{ item.price.toFixed(2) }}</p>
                  </div>

                  <div class="item-total-price">
                    <p>{{ item.sumPrice.toFixed(2) }}</p>
                  </div>
                  <hr class="item-separator" />
                </div>
              </div>
              <div class="order-total-container">
                <span class="order-price">Item total price:</span>
                <span class="order-price-value">{{
                  cartStore.getTotalPrice
                }}</span>
                <span class="order-vat">VAT(19%):</span>
                <span class="order-vat-value">{{ cartStore.getVat }}</span>
                <span class="order-shipping"
                  >Shipping price (free above $100 total item price):</span
                >
                <span class="order-shipping-value">{{
                  cartStore.getShippingPrice
                }}</span>
                <hr class="order-total-separator" />
                <span class="order-total-price">Order Full Total:</span>
                <span class="order-total-price-value">{{
                  cartStore.getOrderFullTotal
                }}</span>
              </div>
            </div>
            <div v-else>
              <h4>YOUR CART IS EMPTY!</h4>
              <img
                class="empty-boxes"
                src="@/src/images/empty-pizza-boxes.png"
                alt="A stack of empty pizza boxes."
              />
            </div>
          </div>
        </div>
        <div class="order-button-container flex justify-evenly">
          <ButtonElement text="Go Back" />
          <ButtonElement text="Send Order" @click="cartStore.sendOrder" />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";

export default {
  setup() {
    const cartStore = useCartStore();
    const userStore = useUserStore();
    return { cartStore, userStore };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    additionalList(list) {
      if (list.length > 0) {
        let res = list[0];
        for (let i = 1; i < list.length - 1; i++) {
          res = res.concat(", ", list[i]);
        }
        res = res.concat(" and ", list[list.length - 1]);
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
  /* justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-image: url("/assets/pizza3.jpg");
  background-size: cover;
  background-position: center; */
  min-height: calc(100vh - 4rem);
  overflow-x: hidden;
}
.container > :only-child {
  margin-top: 150px;
}
.card {
  width: calc(100vw - 6rem);
  max-width: 1200px;

  min-height: calc(70vh - 6rem);
  height: fit-content;
}
.order-header-section {
  margin: 20px auto;
}
.order-body-section {
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.user-data-table {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}
.user-data-table-header {
  text-align: center;
}
.order-info-container,
.user-info-container {
  min-height: 400px;
  width: 100%;
  height: fit-content;
  text-align: center;
}
.additional-requests > textarea {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
  padding: 10px;
}
.order-item,
.order-info-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
}
.order-item {
  overflow-y: auto;
}
.item-data,
.item-data-header {
  grid-column: 1/2;
  text-align: start;
}
.item-quantity,
.item-quantity-header {
  grid-column: 2/3;
}
.item-price,
.item-price-header {
  grid-column: 3/4;
}
.item-total-price,
.item-total-price-header {
  grid-column: 4/5;
}
.item-separator {
  grid-column: 1/5;
  margin: 5px;
}
.empty-boxes {
  width: 100%;
  max-width: 500px;
}
.order-total-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 250px;
}
.order-price,
.order-vat,
.order-shipping,
.order-total-price {
  grid-column: 1/2;
  text-align: right;
}
.order-price-value,
.order-vat-value,
.order-shipping-value,
.order-total-price-value {
  grid-column: 2/3;
  text-align: center;
}
.order-total-separator {
  grid-column: 1/3;
  margin: 10px;
}
.login-form {
  min-height: 400px;
}
.order-button-container {
  width: 100%;
  margin: 20px auto;
}
@media (min-width: 800px) {
  .order-body-section {
    flex-direction: row-reverse;
  }
}
</style>