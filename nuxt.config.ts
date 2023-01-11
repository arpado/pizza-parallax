import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    // alias: {
    //     pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    // },
    modules: [
        [
            '@pinia/nuxt',
            // {
            //     autoImports: ['defineStore', 'acceptHMRUpdate'],
            // },
            {
                autoImports: [
                  // automatically imports `defineStore`
                  'defineStore', // import { defineStore } from 'pinia'
                  // automatically imports `defineStore` as `definePiniaStore`
                  ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
              },
        ],
        ['@nuxtjs/supabase'],
        // '@nuxt/content',
       
    ],
    imports: {
        dirs: ['stores'],
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' }
      },
    // nodeResolve: {
    //     browser: true
    //   },
    // target: 'static',
    // ssr: false,
    // "nitro": {
    //     "output": {
    //         dir: 'output',
    //         serverDir: 'output/server',
    //         publicDir: 'output/public'
    //     }
    // }
    // content: {
        // https://content.nuxtjs.org/api/configuration
    // }
    // NITRO_PRESET = node-server
    // NITRO_PRESET = cloudflare-pages
    // NITRO_APP_BASE_URL = /
    // "pinia": "^2.0.23",
    // "@nuxtjs/composition-api": "^0.33.1",
})
