<template>
  <div class="container" v-if="modalStore.modalList.showLogin">
    <NuxtLayout name="modal">
      <div class="login-container flex column justify-evenly">
        <h3>LOGIN</h3>
        <!-- <form action="POST"> -->
        <form v-on:submit.prevent action="#" method="POST">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" v-model="email" />
          <hr />
          <label for="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
          />
          <hr />
        </form>
        <div class="error-container" v-if="hasError">
          <h3>Error!</h3>
          <p v-if="errorMessage">{{ errorMessage }}</p>
          <p v-else>Something went wrong!</p>
        </div>
        <button @click="userStore.login(email, password)">Login</button>
        <p>
          Not registered yet?
          <NuxtLink to="/user-registration" @click="modalStore.closeModal"
            >Register Here!</NuxtLink
          >
        </p>
      </div>
    </NuxtLayout>
  </div>
</template>

<script>
import { useModalStore } from "@/stores/modalStore";
import { useUserStore } from "@/stores/userStore"
import { postLoginForm } from "@/composables/userAuth"

export default {
  setup() {
    // definePageMeta({
    //   middleware: 'guest'
    // })
    const modalStore = useModalStore();
    const userStore = useUserStore();
    return { modalStore, userStore };
  },
  data() {
    return {
      email: "",
      password: "",
      hasError: false,
      errorMessage: null,
    };
  },
};
</script>

<style scoped>
.container {
  width: fit-content;
  height: fit-content;
  position: relative;
}
.login-container {
  min-height: 70vh;
  padding: 1rem;
}
form > * {
  display: block;
  margin-bottom: 10px;
}
</style>