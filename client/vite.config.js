import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' },
  },
  server: {
    proxy: {
      // En dev, /api/* → serveur Express sur :3001
      '/api': {
        target:       'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})