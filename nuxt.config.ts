// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
      title: 'Ethical Decision Tree Explorer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Explore ethical decisions through interactive decision trees',
        },
      ],
    },
  },
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
  },
})
