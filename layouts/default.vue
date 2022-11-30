<template>
  <div>
    <HeaderElement />
    <!-- ezt innen lehet , h majd el -->
    <!-- <CartElement /> -->
    
  <!-- <Transition name="content">
    <LoginElement />
  </Transition> -->

    <!-- <BookingElement /> -->
    <slot />
    <FooterElement />
  </div>
</template>

<script>
// import { useCartStore } from '../stores/cartStore'

export default {};
</script>

<style scoped>
/* .slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
} */

/* .content-enter-active,
.content-leave-active {
  transition: opacity 1s ease;
  z-index: 999;
}
.content-enter-from,
.content-leave-to {
  opacity: 0;
}
.content-enter-to,
.content-leave-from {
  opacity: 1;
} */
</style>