<template>
  <div>
    <div class="wrapper flex column center-both" v-if="!userStore.user">
      <NuxtLayout name="card" class="card flex center-both">
        <div class="login-form flex column justify-around align-center">
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
      </NuxtLayout>
    </div>

    <div
      class="wrapper flex column center-both"
      v-else-if="userStore.user.role !== 'admin'"
    >
      <NuxtLayout name="card" class="card flex center-both">
        <p>sorry, you have no privelage!</p>
      </NuxtLayout>
    </div>

    <div
      class="wrapper flex column center-both"
      v-else-if="userStore.user.role === 'admin'"
    >
      <div class="menu flex center-both wrap">
        <ButtonElement
          text="Current Orders"
          @click="setActiveMenu('currentOrders')"
        />
        <ButtonElement text="Edit Menu" @click="setActiveMenu('editMenu')" />
        <!-- <ButtonElement text="Current Order" @click="setActiveMenu('userOrder')" /> -->
        <!-- <ButtonElement text="Bookings" @click="setActiveMenu('userBooking')" /> -->
      </div>
      <NuxtLayout name="card" class="card flex center-both">
        <div class="inner-container">
          <AdminOrdersElement v-show="activeMenu === 'currentOrders'" :userStore="userStore" />
          <AdminMenuElement v-show="activeMenu === 'editMenu'" />
          <!-- <UserOrderElement
          v-show="activeMenu === 'userOrder'"
          :userStore="userStore"
        /> -->
        </div>
      </NuxtLayout>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      activeMenu: "currentOrders",
      email: "",
      password: "",
    };
  },
  methods: {
    setActiveMenu(menu) {
      this.activeMenu = menu;
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100vw;
  /* min-height: calc(100vh - 50px); */
  /* min-height: 100%; */
  color: var(--main-white);
  padding-top: 150px;
}
.menu > * {
  margin: 0 10px;
  width: 200px;
}
.card {
  max-width: fit-content;
}
.inner-container {
  width: 100%;
  min-height: 40vh;
  min-width: 400px;
  max-width: 90vw;
}
</style>