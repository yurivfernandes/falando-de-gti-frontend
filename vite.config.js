import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: '/falando-de-gti-frontend/',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 3000
  }
})