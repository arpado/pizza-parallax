<template>
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
  <ItemSetup />
</template>

<script setup>
import { useUser } from '~/composables/useAuth'
const user = await useUser()

const nuxtApp = useNuxtApp()
nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0)
})
</script>

<style>
@import '/node_modules/augmented-ui/augmented-ui.min.css';
@import '/assets/flex-setup.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body,
html {
  height: 100%;
  font-size: 100%;
  scroll-behavior: smooth;
}
:root {
  --main-red: #fd1d01;
  --main-brown: #ba8475;
  --main-white: #fff6f2;
  --main-black: #281713;
}
h2 {
  font-size: 2rem;
}
p,
label,
input,
h3,
h4,
button,
.btn-font {
  font-size: 1rem;
}
@media (min-width: 800px) {
  h2 {
    font-size: 2rem;
  }
  p,
  label,
  input,
  h3,
  h4,
  button,
  .btn-font {
    font-size: 1.5rem;
  }
}
</style>