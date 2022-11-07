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
    // content: {
        // https://content.nuxtjs.org/api/configuration
    // }
})
