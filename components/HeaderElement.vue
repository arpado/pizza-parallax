<template>
  <header :class="[scrollPosition >= 120 ? 'small-header' : 'big-header']">
    <div class="logo" @click="reload">
      <LogoElement />
    </div>
    <nav>
      <HorizontalMenu
        class="widescreen-nav"
        :nav-array="navArray"
        @scroll-request="emitScrollRequest"
      />
      <div class="narrowscreen-nav">
        <div class="hamburger" @click="toggleMenu">Menu</div>
        <DropdownMenu
          v-show="menuVisible"
          :nav-array="navArray"
          @scroll-request="emitScrollRequest"
        />
      </div>
      <div class="login-button"  @click="modalStore.toggleLogin">Login modal</div>
      <div class="cart-button" @click="cartStore.toggleCart">Cart</div>
    </nav>
  </header>
</template>

<script>
import DropdownMenu from "@/components/DropdownMenu.vue";
import HorizontalMenu from "@/components/HorizontalMenu.vue";
import { useCartStore } from '../stores/cartStore';
import { useModalStore } from '../stores/modalStore';
import { mapActions } from 'pinia';

export default {
  components: { DropdownMenu, HorizontalMenu },
  setup() {
    const cartStore = useCartStore();
    const modalStore = useModalStore();

    return {cartStore, modalStore};
  },
  data() {
    return {
      navArray: [
        { text: "Home", to: "/" },
        { text: "Our Selection", to: "OurMenu" },
        // { text: "Contact", to: "contact" },
        { text: "Login", to: "LoginPage" },
      ],
      menuVisible: false,
      scrollPosition: 0,
    };
  },
  mounted() {
    window.addEventListener("click", this.closeOpenNavMenu);
    window.addEventListener("scroll", this.updateScroll);
  },
  unmounted() {
    window.removeEventListener("click", this.closeOpenNavMenu);
  },
  methods: {
    // TEST
    test() {
      console.log('poop')
    },
    // TEST
    // EZT ATIRNI, H VISSZAVIGYEN A /HOME-RA
    reload() {
      window.location.reload(true);
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    // the dropdown should be able to close if viewport goes wide enough, this should be solved later
    closeOpenNavMenu(e) {
      if (
        this.menuVisible &&
        // window.innerWidth > 1100 &&
        !e.target.classList.contains("hamburger")
      ) {
        this.menuVisible = false;
      }
    },
    emitScrollRequest(id) {
      this.$emit("scroll-request", id);
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    // ...mapActions(useCartStore, ['toggleCart'])
  },
};
</script>

<style scoped>
header {
  width: 100%;
  /* height: 10vh; */
  /* min-height: 1px; */
  padding-left: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--main-red);
  border: 1px solid var(--main-black);
  box-shadow: 0 5px 5px 2px var(--main-black);
  position: fixed;
  color: var(--main-bronze);
  font-size: 2rem;
  z-index: 999;
  transition: height 0.5s ease-out;
}
.small-header {
  height: 10vh;
}
.big-header {
  height: 15vh;
}
.logo {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo:hover,
.logo:focus {
  cursor: pointer;
}
.logo > img {
  max-width: 100px;
  max-height: 100px;
}
.hamburger {
  display: block;
  visibility: visible;
  margin-right: 10vw;
}
.hamburger:hover,
.hamburger:focus {
  cursor: pointer;
}
.widescreen-nav {
  display: none;
  visibility: none;
}
.narrowscreen-nav {
  display: flex;
  visibility: visible;
}

@media (min-width: 1100px) {
  .narrowscreen-nav {
    display: none;
    visibility: none;
  }
  .widescreen-nav {
    display: flex;
    visibility: visible;
  }
}
</style>
