// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
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
    baseURL: '/ethical-analysis-visualizer-ai/', // for GitHub Pages
    head: {
      title: 'Ethical Analysis Visualizer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Explore ethical questions through interactive decision trees, powered by LLMs.',
        },
      ],
    },
  },
  icon: {
    clientBundle: {
      // list of icons to include in the client bundle
      icons: ['heroicons:x-mark', 'heroicons:arrow-path-20-solid'],
      scan: true,
    },
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
})
