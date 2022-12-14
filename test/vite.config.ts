/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
