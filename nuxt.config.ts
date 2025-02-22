// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      geminiApiKey: process.env.NUXT_PUBLIC_GEMINI_API_KEY,
    },
  },
  compatibilityDate: '2025-02-19',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/color-mode'],
  css: [
    '@vue-flow/core/dist/style.css',
    '@vue-flow/core/dist/theme-default.css',
    '@vue-flow/controls/dist/style.css',
  ],
  app: {
    head: {
      title: 'Ethical Decision Explorer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Explore ethical questions through interactive decision trees, powered by LLMs.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  icon: {
    clientBundle: {
      // list of icons to include in the client bundle
      icons: [
        'heroicons:x-mark',
        'heroicons:arrow-path-20-solid',
        'line-md:github-loop',
      ],
      scan: true,
    },
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
})
