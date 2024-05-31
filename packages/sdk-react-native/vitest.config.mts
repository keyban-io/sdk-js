/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  plugins: [nodePolyfills()],
  define: {
    global: {}
  },
  test: {
    browser: {
      enabled: true,
      name: 'chrome',
      headless: true,

    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'json-summary', 'html'],
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
});
