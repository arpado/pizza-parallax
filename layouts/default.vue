<template>
  <div>
    <HeaderElement />
    <!-- ezt innen lehet , h majd el -->
    <CartElement />
    <LoginElement />
    <BookingElement />
    <slot />
    <FooterElement />
  </div>
</template>

<script>
import { useCartStore } from '../stores/cartStore'

export default {};
</script>

<style>
</style>