<template>
  <div class="container">
    <h1>The Best Pizzeria!</h1>
    <h2>Come and eat at our place! Lorem ipsum, dolor sit amet consectetur adipisicing elit!</h2>
    <div class="btn-container">
      <ButtonElement text="Book a Table!" @click="modalStore.openModal('showBooking')" />
      <NuxtLink to="OurMenu">
        <ButtonElement text="Order Pizza" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { useModalStore } from '../stores/modalStore';

export default {
  name: "TitleElement",
  props: {
    title: {
      type: String,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const modalStore = useModalStore()
    return { modalStore }
  },
  methods: {
    test() {
      console.log('titleelement')
    }
  }
};
</script>

<style scoped>
.container {
  width: 50vw;
  min-width: 400px;
  max-width: 800px;
  height: fit-content;
  margin-top: 15vh;
  padding: 1rem;;
  text-align: center;
  color: var(--main-white);
  font-size: 28px;
  letter-spacing: 8px;
  text-transform: uppercase;
  background-color: var(--main-black);
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.border {
  background-color: #111;
  color: #fff;
  padding: 20px;
}
.transparent {
  background-color: transparent;
}
.container > * {
  margin: 30px 10px;
}
.btn-container {
  display: flex;
  justify-content: space-evenly;
}
.btn-container > a {
  text-decoration: none;
  color: unset;
}
</style>
