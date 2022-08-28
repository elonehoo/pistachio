import path from 'path'
import { defineConfig } from 'vite'
import types from '@elonehoo/vite-plugin-type-ts'
import recordTime from '@elonehoo/vite-plugin-record-time'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    types({
      tsConfigFilePath: './tsconfig.json',
      cleanVueFileName: true,
      insertTypesEntry: true,
    }),
    recordTime(),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vue-hooks',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
