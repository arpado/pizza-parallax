<template>
  <ul class="flex justify-between align-center" :style="{top: dropdownTop}">
    <li v-for="(navLink, index) in navArray" :key="index">
      <NuxtLink
        class="navLink"
        :to="{ path: navLink.to, hash: navLink.hash }"
        :external="true"
        >{{ navLink.text }}</NuxtLink
      >
    </li>
     <li>
      <div class="navLink" @click="$emit('cart')">
        Cart
      </div>
    </li>
     <li v-if="!user">
      <div class="navLink" @click="$emit('login')">
        Login
      </div>
    </li>
    <li v-if="user">
      <div class="navLink" @click="logout">
        Logout
      </div>
    </li>
  </ul>
</template>

<script>
import { userLogout } from '~/composables/useAuth'
import { useState } from '#app'
import { useUser } from '~/composables/useAuth'

export default {
  /* eslint-disable */
  props: ["navArray", "modalArray", "dropdownTop"],
    setup() {
        const user = useState('user')
        return {user}
    },
    methods: {
      async logout() {
        const message = await userLogout()
        console.log(message.data.value.message)
      }
    },
}
</script>

<style scoped>
ul {
  position: absolute;
  right: 5vw;
  /* top: 10vh; */
  flex-direction: column;
  background: var(--main-red);
  box-shadow: 5px 5px 5px 0 black;
  list-style: none;
  font-size: 2rem;
  transition: top 0.5s ease-out;
}
.navLink {
  margin: 0 30px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: var(--main-black);
  padding-bottom: 3px;
}
.navLink::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -100%;
  width: 100%;
  height: 0.1em;
  background-color: var(--main-white);
  opacity: 0;
  transition: opacity 300ms, transform 300ms;
}
.navLink:hover,
.navLink:focus {
  cursor: pointer;
}
.navLink:hover::after,
.navLink:focus::after {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
@media screen and (min-width: 1100px) {
  ul {
    position: relative;
    flex-direction: row;
    right: unset;
    top: unset;
    box-shadow: unset;
  }
}
</style>
