<template>
  <div class="wrapper">
    <div class="container">
      <div class="login-box">
        <h3>Register</h3>
        <div class="input-box">
          <label for="username">Username:</label>
          <input type="text" name="" id="username" v-model="username" />
        </div>
        <div class="input-box">
          <label for="email">Email:</label>
          <input type="text" name="" id="email" v-model="email" />
        </div>
        <div class="input-box">
          <label for="password">Password:</label>
          <input type="text" name="" id="password" v-model="password" />
        </div>
        <div class="input-box">
          <label for="password-again">Password again:</label>
          <input
            type="text"
            name=""
            id="password-again"
            v-model="passwordAgain"
          />
        </div>
        <!-- @click="registerUser(username, email, password, passwordAgain)" -->
        <button @click="postRegistrationForm(username, email, password)">Register</button>
      </div>
      <div class="alternatives">
        <p>
          Already registered? Click
          <NuxtLink to="LoginPage">here</NuxtLink> to login!
        </p>
        <p>Click <NuxtLink to="/">here</NuxtLink> to return home!</p>
        <p>{{ username }} -{{email}} - {{ password }} - {{ passwordAgain }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { registerWithEmail } from '~/composables/useAuth';

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordAgain: "",
      // ezeket majd csekkolni
      errors: new Map(),
      response: {
        hasErrors: false
      }
    };
  },
  methods: {
 
    async postRegistrationForm(name, email, password) {
      this.response = await registerWithEmail(this.name, this.email, this.password)
      // this.errors = this.response.errors
      console.log(this.response)
    },
    
    // async postRegistrationForm(name, email, password) {
    //   response.value = await registerWithEmail(name, email, password)
    // },
    // registerUser(name, email, password, passwordAgain) {
    //   if (name && email && password && password === passwordAgain) {
    //     // create user
    //   }
    // },
  },
};
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