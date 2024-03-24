// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  srcDir: 'src/ui',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      SERVER_URL: process.env.NUXT_SERVER_URL,
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  app: {
    head: {
      title: 'SGMK Test',
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error Vite 3
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    '@pinia/nuxt',
  ],
  pinia: {
    storesDirs: ['./src/domain/**'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
