<template>
  <div class="container flex center-both">
    <NuxtLayout name="card">
      <div class="card flex column align-center">
        <div class="order-header-section">
          <h3>Please, confirm your order:</h3>
        </div>
        <div class="order-body-section flex align-center">
          <div class="user-info-container">
            <div class="user-info" v-if="userStore.user">
              <h3>Welcome back, {{userStore.user.firstName}}!</h3>
              <p>Customer Data:</p>
              <p>Name: {{userStore.user.firstName }} {{ userStore.user.lastName}}</p>
              <p>Address: {{ userStore.user.address }}</p>
              <p>Billing Address: {{ userStore.user.address }}</p>
              <p>Phone Number: {{ userStore.user.phone }}</p>
              <p>Email Address: {{ userStore.user.email }}</p>
              <p>Click here if you wish to change your data!</p>
                          <div class="additional-requests">
              <h3>Additional Request</h3>
              <textarea name="" id="" cols="30" rows="10"></textarea>
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
          <div class="order-info-container">
            <div v-if="cartStore.itemOnOrder.length">
              <div
                class="order-item"
                v-for="item in cartStore.itemOnOrder"
                :key="item.name"
              >
                <h4>{{ item.name }}</h4>
                <p v-for="prop in item.props" :key="prop">
                  {{ prop.description }}
                </p>
                <p>{{ item.selectedOptions }}</p>
                <p>{{ item.quantity }}</p>
                <p>{{ item.price.toFixed(2) }}</p>
                <p>{{ item.sumPrice.toFixed(2) }}</p>
                <hr />
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
  min-height: calc(70vh - 6rem);
  height: fit-content;
}
.order-body-section {
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.order-info-container,
.user-info-container {
  width: 100%;
  height: fit-content;
  text-align: center;
}
.empty-boxes {
  width: 100%;
  max-width: 500px;
}
.login-form {
 min-height: 400px;
}
.order-button-container {
  width: 100%;
}
@media (min-width: 800px) {
  .order-body-section {
    flex-direction: row-reverse;
  }
}
</style>