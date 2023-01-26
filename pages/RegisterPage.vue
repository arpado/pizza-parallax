<template>
  <div class="wrapper flex center-both column">
    <div class="container flex center-both column">
      <div class="login-box flex align-center jusify-around column">
        <h3>Register</h3>
        <div class="input-box flex justify-center align-start column">
          <label for="firstName">First Name:</label>
          <input type="text" name="" id="firstName" v-model="firstName" />
        </div>
        <div class="input-box flex justify-center align-start column">
          <label for="lastName">Last Name:</label>
          <input type="text" name="" id="lastName" v-model="lastName" />
        </div>
        <div class="input-box flex justify-center align-start column">
          <label for="address">Address:</label>
          <input type="text" name="" id="address" v-model="address" />
        </div>
        <div class="input-box flex justify-center align-start column">
          <label for="email">Email:</label>
          <input type="text" name="" id="email" v-model="email" />
        </div>
        <div class="input-box flex justify-center align-start column">
          <label for="password">Password:</label>
          <input type="text" name="" id="password" v-model="password" />
        </div>
        <!-- <div class="input-box flex justify-center align-start column">
          <label for="password-again">Password again:</label>
          <input
            type="text"
            name=""
            id="password-again"
           
          />
        </div> -->
        <button @click="postRegisterForm">Register</button>
      </div>
      <div class="alternatives">
        <p>Already registered?</p>
        <p>Click <NuxtLink to="/">here</NuxtLink> to return home!</p>
        <!-- <div v-if="response.hasErrors">
          <div class="error-messages" v-for="error in errors" :key="error">
            <p>{{ error }}</p>
          </div>
        </div> -->
        <div v-if="response.hasErrors && errors">
          <strong class="font-bold">Oops, try again! </strong>
          <ul>
            <li v-for="(key, value) in errors" :key="key">
              {{ value.check.errorMessage }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { useUserStore } from "~/stores/userStore";
import { registerWithEmail } from "@/composables/userAuth";

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    return { userStore, router };
  },
  data() {
    return {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      address: null,
      errors: new Map(),
      response: { hasErrors: false },
    };
  },
  methods: {
    async postRegisterForm() {
      let {data, error} = await registerWithEmail(
        this.email,
        this.password,
        this.firstName,
        this.lastName,
        this.address
      );
      this.userStore.checkActiveUser();
      this.router.push({ path: "/successful-registration" });
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: fit-content;
  width: 100vw;
  /* background-image: url("/assets/pizza3.jpg"); */
  background-size: cover;
  background-position: center;
}
.container {
  width: fit-content;
  padding: 2rem;
  background-color: var(--main-red);
  color: var(--main-white);
  border: 1px solid var(--main-black);
  box-shadow: 2px 2px 2px 2px var(--main-black);
  margin-top: 150px;
}
.login-box {
}
/* .login-box > * {
    margin-top: 50px;
} */
.input-box {
  margin: 10px 0;
}
button {
  padding: 0.5rem;
  background-color: var(--main-white);
}
.alternatives {
  padding: 2rem 1rem;
  text-align: center;
}
</style>