<template>
  <!-- ennek majd meg megnezni, h hogyan csinalta -->
  <!-- <Transition name="slide-fade"> -->
  <div class="container" v-if="modalStore.showLogin">
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
        <button @click="postLoginForm(email, password)">Login</button>
        <p>
          Not registered yet?
          <NuxtLink to="/RegisterPage" @click="modalStore.closeModal"
            >Register Here!</NuxtLink
          >
        </p>
      </div>
    </NuxtLayout>
  </div>
  <!-- </Transition> -->
</template>

<script>
import { useModalStore } from "../stores/modalStore";
import { loginWithEmail } from "~/composables/useAuth";

export default {
  setup() {
    // definePageMeta({
    //   middleware: 'guest'
    // })

    const modalStore = useModalStore();
    return { modalStore };
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
    async postLoginForm(email, password) {
      const res = await loginWithEmail(email, password);
      this.hasError = res.hasError;
      if (this.hasError) {
        this.errorMessage = res.errorMessage;
      } else {
        this.modalStore.toggleLogin();
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
}
form > * {
  display: block;
  margin-bottom: 10px;
}
/* animations */
.modalanimation-enter-active,
.modalanimation-leave-active {
  transition: opacity 0.5s linear;
}
.modalanimation-enter-from,
.modalanimation-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>