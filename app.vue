<template>
    <NuxtLayout name="default">
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
// const nuxtApp = useNuxtApp()

// nuxtApp.hook("page:finish", () => {
//   window.scrollTo(0, 0)
// })
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body,
html {
  height: 100%;
  font-size: 100%;
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