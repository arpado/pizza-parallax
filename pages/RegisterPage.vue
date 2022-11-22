<template>
  <div class="wrapper">
    <div class="container">
      <div class="login-box">
        <h3>Register</h3>
        <div class="input-box">
          <label for="name">Name:</label>
          <input type="text" name="" id="name" v-model="name" />
        </div>
        <div class="input-box">
          <label for="email">Email:</label>
          <input type="text" name="" id="email" v-model="email" />
        </div>
        <div class="input-box">
          <label for="password">Password:</label>
          <input type="text" name="" id="password" v-model="password" />
        </div>
        <!-- <div class="input-box">
          <label for="password-again">Password again:</label>
          <input
            type="text"
            name=""
            id="password-again"
           
          />
        </div> -->
        <button @click="postRegisterForm">Register</button>
        <!-- (name, email, password) -->
      </div>
      <div class="alternatives">
        <p>
          Already registered? Click
          <NuxtLink to="LoginPage">here</NuxtLink> to login!
        </p>
        <p>Click <NuxtLink to="/">here</NuxtLink> to return home!</p>
        <p>{{ name }} -{{ email }} - {{ password }}</p>
        <!-- <div v-if="response.hasErrors">
          <div class="error-messages" v-for="error in errors" :key="error">
            <p>{{ error }}</p>
          </div>
        </div> -->
        <div
          v-if="response.hasErrors && errors"
          role="alert"
        >
          <strong class="font-bold">Oops, try again! </strong>

          <ul class="block sm:inline">
            <li v-for="[key, value] in errors" :key="key">
              {{ value.check.errorMessage }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { registerWithEmail } from '~/composables/useAuth';

// export default {
//   data() {
//     return {
//       name: "test",
//       email: "test@test.com",
//       password: "test",
//       passwordAgain: "",
//       errors: null,
//       response: {
//         hasErrors: false
//       }
//     };
//   },
//   methods: {
//     async postRegistrationForm(name, email, password) {
//       this.response = await registerWithEmail(name, email, password)
//       // .then(console.log(res))
//       // console.log(this.response)

//       this.errors = this.response.errors
//       // console.log(this.errors)
//     },
//   },
// };

import { ref } from "@vue/reactivity";
import { registerWithEmail } from "~/composables/useAuth";
const email = ref(null);
const password = ref(null);
const name = ref(null);
const errors = ref(new Map());
let response = ref({ hasErrors: false });
async function postRegisterForm() {
  response.value = await registerWithEmail(
    name.value,
    email.value,
    password.value
  );
  errors.value = response.value.errors;
  console.log(errors.value)
}
</script>

<style scoped>
.wrapper,
.container,
.login-box {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.wrapper {
  justify-content: center;
  height: 100vh;
  width: 100vw;
  /* background-image: url("/assets/pizza3.jpg"); */
  background-size: cover;
  background-position: center;
}
.container {
  width: fit-content;
  padding: 2rem;
  justify-content: center;
  background-color: var(--main-red);
  color: var(--main-white);
  border: 1px solid var(--main-black);
  box-shadow: 2px 2px 2px 2px var(--main-black);
}
.login-box {
  justify-content: space-around;
}
/* .login-box > * {
    margin-top: 50px;
} */
.input-box {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
button {
  padding: 0.5rem;
  background-color: var(--main-white);
}
.alternatives {
  padding: 2rem 1rem;
}
</style>