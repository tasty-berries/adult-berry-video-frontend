// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools         : {enabled: true},

    extends: ['@nuxt/ui-pro'],
    modules: ['@nuxt/ui', '@vueuse/nuxt'],

    devServer: {
        port: 3200
    },

    runtimeConfig: {
        public: {
            apiUrl  : process.env.NUXT_API_URL,
            assetUrl: process.env.NUXT_ASSET_URL
        }
    },

    app: {
        head: {
            meta: [{name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no'}],
            link: [{rel: 'icon', href: '/img/icon.png'}]
        }
    }
})
