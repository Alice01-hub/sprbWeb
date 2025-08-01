import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      host: true,
      proxy: {
        '/api': env.VITE_API_URL || 'http://localhost:8000'
      }
    },
    assetsInclude: ['**/*.mp3', '**/*.wav'],
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'esbuild' : false,
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['styled-components', 'framer-motion'],
            icons: ['react-icons']
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            if (/\.(mp3|wav|ogg|flac)$/.test(assetInfo.name)) {
              return `assets/audio/[name]-[hash].${ext}`
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/.test(assetInfo.name)) {
              return `assets/images/[name]-[hash].${ext}`
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return `assets/fonts/[name]-[hash].${ext}`
            }
            return `assets/[ext]/[name]-[hash].${ext}`
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    }
  }
}) 