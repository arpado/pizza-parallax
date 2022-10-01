<template>
  <ul>
    <NuxtLink
    class="navLink"
      v-for="(navLink, index) in navArray"
      :key="index"
      :to="navLink.to"
      >{{ navLink.text }}</NuxtLink
    >
  </ul>
</template>

<script>
export default {
  /* eslint-disable */
  props: ["navArray"],
  // methods: {
  //   emitScrollRequest(id) {
  //     this.$emit("scroll-request", id);
  //   },
  // },
};
</script>

<style scoped>
ul {
  position: relative;
  flex-direction: row;
  right: unset;
  top: unset;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  font-size: 2rem;
  box-shadow: unset;
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
</style>
