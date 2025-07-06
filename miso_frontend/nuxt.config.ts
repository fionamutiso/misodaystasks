// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css'
  ],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  
  // Tailwind configuration
  tailwindcss: {
    config: './tailwind.config.js'
  },
  
  // App configuration
  app: {
    head: {
      title: 'Miso Days',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Miso Days - Your journey begins here' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  
  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000'
    }
  }
})
