/// <reference types="vitest" />
import { defineVitestConfig } from 'nuxt-vitest/config'
import { defineConfig } from 'vite'
// try later on, vitest has more config ops
// import { defineConfig } from 'vitest/config'

import vue from '@vitejs/plugin-vue'
// import { aliases } from './aliases'
import path from 'path';


export default defineConfig({
  // any custom vitest config you require
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['NuxtLayout'].includes(tag),
      }
    }
  })],
  test:{
    globals:true,
    environment: 'happy-dom',
  },
  root: ".",
//   resolve: { aliases },
  resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
  }
})

// export default defineVitestConfig({
//   plugins: [vue()],
//   test: {
//     globals:true,
//     environment: 'nuxt'
//   },
//   root: ".",
//   //   resolve: { aliases },
//     resolve: {
//         alias: {
//           '@': path.resolve(__dirname, '.')
//         }
//     }
// })