import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  assetsInclude: ['**/*.mp3', '**/*.wav'],
  build: {
    outDir: 'dist'
  }
}) 