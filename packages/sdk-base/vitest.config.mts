/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
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
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
    target: 'esnext',
  },
});
