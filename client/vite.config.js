import { fileURLToPath, URL } from "node:url";
import { resolve, dirname } from 'node:path';
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from '@intlify/vite-plugin-vue-i18n';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/post': {
        target: 'http://localhost:3000'
      }
    },
  },
  plugins: [
    vue(),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,

      // you need to set i18n resource including paths !
      include: resolve(dirname(fileURLToPath(import.meta.url)), '../locales'),
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
