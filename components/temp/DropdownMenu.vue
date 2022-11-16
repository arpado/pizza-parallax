<template>
  <ul>
    <li
      v-for="(navLink, index) in navArray"
      :key="index"
      @click="emitScrollRequest(navLink.sectionId)"
    >
      {{ navLink.text }}
    </li>
  </ul>
</template>

<script>
export default {
  /* eslint-disable */
  props: ["navArray"],
  methods: {
    emitScrollRequest(id) {
      this.$emit("scroll-request", id);
    },
  },
};
</script>

<style scoped>
ul {
  position: absolute;
  right: 5vw;
  top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  background: var(--main-brown);
  box-shadow: 5px 5px 5px 0 black;
}
li {
  margin: 1vw 2vw;
  overflow: hidden;
  position: relative;
}
li::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -100%;
  width: 100%;
  height: 0.1em;
  background-color: var(--main-bronze);
  opacity: 0;
  transition: opacity 300ms, transform 300ms;
}
li:hover,
li:focus {
  cursor: pointer;
}
li:hover::after,
li:focus::after {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
</style>
