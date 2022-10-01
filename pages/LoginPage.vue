<template>
    <div class="wrapper">
      <div class="container">
        <div class="login-box">
          <h3>Login</h3>
          <div class="input-box">
            <label for="username">Username:</label>
            <input type="text" name="" id="username" />
          </div>
          <div class="input-box">
            <label for="password">Password:</label>
            <input type="text" name="" id="password" />
          </div>
          <button>Login</button>
        </div>
        <div class="alternatives">
          <p>
            Forgot your password? Click
            <NuxtLink to="SendPasswordPage">here!</NuxtLink>
          </p>
          <p>
            Don't have a username yet? Click
            <NuxtLink to="RegisterPage">here</NuxtLink> to register!
          </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {};
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
  background-image: url("/assets/pizza3.jpg");
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