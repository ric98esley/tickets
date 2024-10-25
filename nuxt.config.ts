// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', "nuxt-tiptap-editor"],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  imports: {
    dirs: ["stores"],
  },

  compatibilityDate: '2024-10-24',
})