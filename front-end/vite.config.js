import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    allowedHosts: ['qtpodgcnfftl.usw.sailos.io'],
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://wigsbtkcinsg.usw.sailos.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})