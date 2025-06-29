import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/Privaterole': fileURLToPath(new URL('./src/Privaterole', import.meta.url)),
      '@/adminlayout': fileURLToPath(new URL('./src/Layout/adminlayout', import.meta.url)),
      '@/adminpanel': fileURLToPath(new URL('./src/adminpanel', import.meta.url)),
    }
  },
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true,
  },
})
