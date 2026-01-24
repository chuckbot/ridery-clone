import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 1. Activa la estructura y características de Nuxt 4 [cite: 2026-01-24]
  future: {
    compatibilityVersion: 4,
  },

  // 2. Configura el Alias para que TypeScript encuentre tu paquete compartido [cite: 2026-01-24]
  alias: {
    '@ridery/shared': fileURLToPath(new URL('../../packages/shared/src/index.ts', import.meta.url)),
  },

  // 3. Integración de CSS para Vuetify y Material Design Icons [cite: 2026-01-24]
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  // 4. Configuración del build para asegurar que Vuetify se procese correctamente [cite: 2026-01-24]
  build: {
    transpile: ['vuetify'],
  },

  // 5. Configuración de Vite necesaria para Vuetify 3 [cite: 2026-01-24]
  vite: {
    define: {
      'process.env.DEBUG': 'false',
    },
  },

  // 6. Habilitar herramientas de desarrollo (opcional pero recomendado) [cite: 2026-01-24]
  devtools: { enabled: true }
})