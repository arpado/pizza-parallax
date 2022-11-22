<template>
<!-- ennek majd meg megnezni, h hogyan csinalta -->
  <Transition name="slide-fade">
    <NuxtLayout name="modal" v-if="modalStore.showLogin">
      <div class="login-container flex column justify-evenly">
        <h3>LOGIN</h3>
        <!-- <form action="POST"> -->
        <form v-on:submit.prevent action="#" method="POST">
          <label for="email">Email:</label>
          <input type="text" name="email" id="email" v-model="email"/>
          <hr />
          <label for="password">Password:</label>
          <input type="text" name="password" id="password" v-model="password"/>
          <hr />
        </form>
        <div class="error-container" v-if="hasError">OOPS!</div>
        <p>{{ email }} - {{ password }}</p>
        <button @click="postLoginForm(email, password)">Login</button>
        <p>
          Not registered yet? <NuxtLink  to="/RegisterPage" @click="modalStore.closeModal">Register Here!</NuxtLink>
        </p>
      </div>
    </NuxtLayout>
  </Transition>
</template>

<script>
import { useModalStore } from "../stores/modalStore";
import { loginWithEmail } from "~/composables/useAuth"

export default {
  setup() {
    definePageMeta({
      middleware: 'guest'
    })

    const modalStore = useModalStore();
    return { modalStore };
  },
  data() {
    return {
      email: null,
      password: null,
      hasError: null,
      errorMessage: null,
    }
  },
  methods: {
    async postLoginForm(email, password) {
      await loginWithEmail(email, password)
      this.modalStore.toggleLogin()
    }
  }
};
</script>

<style scoped>
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