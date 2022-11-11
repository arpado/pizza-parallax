<template>
  <Transition name="slide-fade">
    <NuxtLayout name="modal" v-if="modalStore.showLogin">
      <div class="login-container flex column justify-evenly">
        <h3>LOGIN</h3>
        <form action="POST">
          <label for="username">Name:</label>
          <input type="text" name="username" id="username" />
          <hr />
          <label for="password">Password:</label>
          <input type="text" name="password" id="password" />
          <hr />
        </form>
        <button type="submit">Login</button>
        <p>
          Not registered yet? <NuxtLink  to="/RegisterPage" @click="modalStore.closeModal">Register Here!</NuxtLink>
        </p>
      </div>
    </NuxtLayout>
  </Transition>
</template>

<script>
import { useModalStore } from "../stores/modalStore";

export default {
  setup() {
    const modalStore = useModalStore();
    return { modalStore };
  },
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