// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  routeRules: {
    '/share/**': {ssr: false},
    '/app/editor/**': {cache: false}
  }
})
