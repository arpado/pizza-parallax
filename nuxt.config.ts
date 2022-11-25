// import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
        // '@nuxt/content',
       
    ],
    imports: {
        dirs: ['stores'],
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
})
