<template>
  <div class="wrapper flex center-both column">
    <!-- <div class="container flex center-both column"> -->
    <NuxtLayout name="card">
      <div class="login-box flex align-center jusify-around column">
        <h3>Register</h3>
        <hr class="title-hr" />
        <div class="input-box-container">
          <div class="input-box flex justify-center align-start column">
            <label for="firstName">First Name:</label>
            <input type="text" name="firstName" id="registration-first-name" placeholder="Margherita" v-model="firstName" />
            <hr />
          </div>
          <div class="input-box flex justify-center align-start column">
            <label for="lastName">Last Name:</label>
            <input type="text" name="lastName" id="registration-last-name" placeholder="Calabrese" v-model="lastName" />
            <hr />
          </div>
          <div class="input-box flex justify-center align-start column">
            <label for="address">Address:</label>
            <input type="text" name="address" id="registration-address" placeholder="Mushroom str. 8." v-model="address" />
            <hr />
          </div>
          <div class="input-box flex justify-center align-start column">
            <label for="phone">Phone Number:</label>
            <input type="number" name="phone" id="registration-phone" placeholder="555555" v-model="phone" />
            <hr />
          </div>
          <div class="input-box flex justify-center align-start column">
            <label for="email">Email:</label>
            <input type="text" name="email" id="registration-email" placeholder="margherita@pizza.com" v-model="email"/>
            <hr />
          </div>
          <div class="input-box flex justify-center align-start column">
            <label for="password">Password:</label>
            <input type="text" name="password" id="registration-password" placeholder="#Your-PassW0rd~" v-model="password"/>
            <hr />
          </div>
        </div>

        <!-- <div class="input-box flex justify-center align-start column">
          <label for="password-again">Password again:</label>
          <input
            type="text"
            name=""
            id="password-again"
           
          />
        </div> -->
        <ButtonElement text="Register" @click="postRegisterForm" />
      </div>
      <div class="alternatives">
        <p>Already registered? Click <NuxtLink to="/">here</NuxtLink> to return home!</p>
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
      <!-- </div> -->
    </NuxtLayout>
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
      phone: null,
      errors: new Map(),
      response: { hasErrors: false },
    };
  },
  methods: {
    async postRegisterForm() {
      let { data, error } = await registerWithEmail(
        this.email,
        this.password,
        this.firstName,
        this.lastName,
        this.address,
        this.phone,
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
  /* new */
  /* width: fit-content; */
  /* padding: 2rem; */
  /* background-color: var(--main-red); */
  /* color: var(--main-white); */
  /* border: 1px solid var(--main-black);
  box-shadow: 2px 2px 2px 2px var(--main-black); */
  margin: 150px auto 20px;
}
/* .container {
  width: fit-content;
  padding: 2rem;
  background-color: var(--main-red);
  color: var(--main-white);
  border: 1px solid var(--main-black);
  box-shadow: 2px 2px 2px 2px var(--main-black);
  margin-top: 150px;
} */
.login-box {
  width: 80vw;
  min-width: 300px;
  max-width: 800px;
}

/* .login-box > * {
    margin-top: 50px;
} */
/* .input-box {
  margin: 10px 0;
} */
.alternatives {
  padding: 2rem 1rem;
  text-align: center;
}

/* new */
.container {
  width: fit-content;
  height: fit-content;
  position: relative;
}
.login-container {
  min-height: 70vh;
  padding: 1rem;
}
h3 {
  margin: 20px auto 5px;
  font-size: 1.5rem;
  /* border-bottom: 2px solid black; */
}
.title-hr {
  width: 50%;
  margin: 5px auto 10px;
}
.input-box-container {
  margin: 20px auto;
}
 
@media screen and (min-width: 800px) {
  .input-box-container {
    width: 100%;
    display: grid;
    grid-template-areas: 
    "firstname lastname"
    "address phone"
    "email password"
    ;
  }
 .input-box-container > :nth-child(1) {
    grid-area: firstname;
  }
  .input-box-container > :nth-child(2) {
    grid-area: lastname;
  }
  .input-box-container > :nth-child(3) {
    grid-area: address;
  }
  .input-box-container > :nth-child(4) {
    grid-area: phone;
  }
  .input-box-container > :nth-child(5) {
    grid-area: email;
  }
  .input-box-container > :nth-child(6) {
    grid-area: password;
  }
}
</style>