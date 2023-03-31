<template>
  <div class="container" v-if="modalStore.modalList.showLogin">
    <NuxtLayout name="modal">
      <div class="login-container flex column justify-evenly">
        <h3>LOGIN</h3>
        <hr class="title-hr" />
        <!-- <form action="POST"> -->
        <form
          v-on:submit.prevent="login(email, password)"
          action="#"
          method="POST"
        >
          <div class="input-box flex justify-center align-start column">
            <label for="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              v-model="email"
              @keyup.enter="login(email, password)"
            />
            <hr />
          </div>
          <div class="input-box flex justify-center align-start column">
            <label for="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              v-model="password"
              @keyup.enter="login(email, password)"
            />
            <hr />
          </div>
        </form>
        <div class="error-container" v-if="hasError">
          <h3>Error!</h3>
          <p v-if="errorMessage">{{ errorMessage }}</p>
          <p v-else>Something went wrong!</p>
        </div>
        <ButtonElement
          class="self-center"
          text="Login"
          type="submit"
          @click="login(email, password)"
        />
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
import { useUserStore } from "@/stores/userStore";
import { postLoginForm } from "@/composables/userAuth";

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
  methods: {
    async login(email, password) {
      try {
        let { data, error } = await this.userStore.login(email, password);
        this.modalStore.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
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
  max-width: 400px;
}
h3 {
  font-size: 1.5rem;
}
.title-hr {
  width: 50%;
  margin: 5px auto 10px;
}
form > * {
  display: block;
  margin-bottom: 10px;
}
</style>