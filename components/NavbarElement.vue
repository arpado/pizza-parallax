<template>
  <ul class="flex justify-between align-center" :style="{ top: dropdownTop }">
    <li v-for="(navLink, index) in navArray" :key="index">
      <NuxtLink
        class="navLink flex center-both"
        :to="{ path: navLink.to, hash: navLink.hash }"
        >{{ navLink.text }}</NuxtLink
      >
      <!-- :external="true" -->
    </li>
    <li>
      <NuxtLink
        class="navLink flex center-both"
        @click="$emit('cart')"
        tabindex="0"
      >
        Cart
      </NuxtLink>
    </li>
    <li v-if="!userStore.user">
      <div
        class="navLink flex center-both"
        @click="$emit('login')"
        tabindex="0"
      >
        Login
      </div>
    </li>
    <li v-else>
      <div class="navLink flex center-both" @click="signOut" tabindex="0">
        Logout
      </div>
    </li>
  </ul>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { postSignOut } from "@/composables/userAuth";

export default {
  /* eslint-disable */
  props: ["navArray", "modalArray", "dropdownTop"],
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    async signOut() {
      let result = await postSignOut();
      this.userStore.user = null;
    },
  },
};
</script>

<style scoped>
ul {
  position: absolute;
  right: 5vw;
  /* top: 10vh; */
  padding: 1rem 0;
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
  text-align: center;
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
.navLink:hover::after {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
@media screen and (min-width: 800px) {
  ul {
    position: relative;
    flex-direction: row;
    right: unset;
    top: unset;
    box-shadow: unset;
  }
}
</style>
