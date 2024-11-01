// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // <link rel="manifest" href="/manifest.webmanifest" />
    head: {
      link: [
        {
          rel: "manifest",
          href: "/manifest.webmanifest"
        }
      ]
    }
  },
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