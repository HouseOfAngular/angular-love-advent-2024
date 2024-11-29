/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { Nitro } from 'nitropack';

const devBindingsModule = async (nitro: Nitro) => {
  if (nitro.options.dev) {
    nitro.options.plugins.push('./src/dev-bindings.ts');
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      nitro: {
        preset: "cloudflare-pages",
        modules: [devBindingsModule],
      },
      prerender: {
        routes: ['/']
      },
    })
  ],
}));
