<template>
  <header :class="[scrollPosition >= 120 ? 'small-header' : 'big-header']">
    <div class="logo" @click="reload">
      <LogoElement />
    </div>
    <nav class="flex">
      <NavbarElement
        class="widescreen-nav"
        :nav-array="navArray"
        :modal-array="modalArray"
        @login="modalStore.openModal('showLogin')"
        @cart="modalStore.openModal('showCart')"
      />
      <div class="narrowscreen-nav">
        <!-- <div class="hamburger" @click="toggleMenu" tabindex="0">Menu</div> -->
        <div class="hamburger" @click="toggleMenu" tabindex="0">
          <div class="hamb-bar" id="hamb-bar-top"></div>
          <div class="hamb-bar" id="hamb-bar-middle"></div>
          <div class="hamb-bar" id="hamb-bar-bottom"></div>
        </div>
        <Transition name="menu">
        <NavbarElement
          v-show="menuVisible"
          :nav-array="navArray"
          :modal-array="modalArray"
          @login="modalStore.openModal('showLogin')"
          @cart="modalStore.openModal('showCart')"
          :dropdown-top="[scrollPosition >= 120 ? '80px' : '130px']"
        />
        </Transition>
      </div>
    </nav>
  </header>
</template>

<script>
import { useCartStore } from "../stores/cartStore";
import { useModalStore } from "../stores/modalStore";
import { mapActions } from "pinia";
import gsap from "gsap";


export default {
  setup() {
    const cartStore = useCartStore();
    const modalStore = useModalStore();
    return { cartStore, modalStore };
  },
  data() {
    return {
      navArray: [
        { text: "Home", to: "/", hash: "" },
        { text: "Our Selection", to: "menu", hash: "" },
        // { text: "User Profile", to: "user-profile", hash: "" },
        // { text: "Contacts", to: "/", hash: "#contacts-section"},
      ],
      modalArray: [
        { text: "Cart", event: "cart" },
        { text: "Login", event: "login" },
      ],
      menuVisible: false,
      scrollPosition: 0,
    };
  },
  mounted() {
    window.addEventListener("click", this.closeOpenNavMenu);
    document.body.addEventListener("scroll", this.updateScroll);
  },
  unmounted() {
    window.removeEventListener("click", this.closeOpenNavMenu);
    document.body.removeEventListener("scroll", this.updateScroll);
  },
  methods: {
    // EZT ATIRNI, H VISSZAVIGYEN A /HOME-RA
    reload() {
      window.location.reload(true);
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;

      if (this.menuVisible) {
        gsap.to('#hamb-bar-top', {
          transform: 'translate3D(0px, 16.5px, 0px) rotateZ(45deg)'
        })
        gsap.to('#hamb-bar-middle', {
          transform: 'rotateZ(45deg)'
        })
        gsap.to('#hamb-bar-bottom', {
          transform: 'translate3D(0px, -16.5px, 0px) rotateZ(-45deg)'
        })
      }
      else {
        gsap.to('#hamb-bar-top', {
          transform: 'translate3D(0px, 0px, 0px) rotateZ(0deg)'
        })
         gsap.to('#hamb-bar-middle', {
          transform: 'rotateZ(0deg)'
        })
         gsap.to('#hamb-bar-bottom', {
          transform: 'translate3D(0px, 0px, 0px) rotateZ(0deg)'
        })
      }
    },
    // the dropdown should be able to close if viewport goes wide enough, this should be solved later
    closeOpenNavMenu(e) {
      if (
        this.menuVisible &&
        // window.innerWidth > 1100 &&
        !e.target.classList.contains("hamburger") &&
        !e.target.classList.contains("hamb-bar")
      ) {
        this.menuVisible = false;

        gsap.to('#hamb-bar-top', {
          transform: 'translate3D(0px, 0px, 0px) rotateZ(0deg)'
        })
         gsap.to('#hamb-bar-middle', {
          transform: 'rotateZ(0deg)'
        })
         gsap.to('#hamb-bar-bottom', {
          transform: 'translate3D(0px, 0px, 0px) rotateZ(0deg)'
        })
      }
    },
    // CHECK WHAT THIS DOES!!!
    // emitScrollRequest(id) {
    //   this.$emit("scroll-request", id);
    // },
    updateScroll() {
      // DEBOUNCE!!!

      // let timer
      
      //   clearTimeout(timer)
      
      // timer = setTimeout(() => {
              this.scrollPosition = document.body.scrollTop;
      // }, 1000);
      
    },
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
  z-index: 990;
  transition: height 0.5s ease-out;
}
.small-header {
  /* height: 10vh; */
  height: 80px;
}
.big-header {
  /* height: 15vh; */
  height: 130px;
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
  position: relative;
  overflow: hidden;
  /* new */
  height: 50px;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* position: fixed; */
  color: white;
  /* top: 10px;
  right: 30px; */
}
.hamburger:hover,
.hamburger:focus {
  cursor: pointer;
}
/* .hamburger::after {
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
.hamburger:hover::after,
.hamburger:focus::after {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
} */
.hamb-bar {
  width: 100%;
  height: 5px;
  background-color: white;
  border-radius: 10px;
  transform-origin: center;
  /*transition: all 1s cubic-bezier(0.54, 0.54, 0.54, 0.54); */
}
.widescreen-nav {
  display: none;
  visibility: none;
}
.narrowscreen-nav {
  display: flex;
  visibility: visible;
}

/* animation */

/* .menu-before-enter,
.menu-after-leave {
    transform: translateY(-120px);
} */
.menu-enter-active,
.menu-leave-active {
  transition: transform 0.2s cubic-bezier(0.28, 0.62, 0.57, 1);
  transform-origin: top center;

}
/* .menu-after-enter,
.menu-before-leave {
  transform: translateY(-120px);
} */
.menu-enter-from,
.menu-leave-to {
  transform: rotateX(-90deg) scaleX(0);
}

@media (min-width: 1200px) {
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
