<template>
  <div>
    <HeaderElement />
    <!-- ezt innen lehet , h majd el -->
    <CartElement />
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