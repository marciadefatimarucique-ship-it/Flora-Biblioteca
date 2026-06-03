import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react()],
  base: '/', // ou './' se necessário
  build: {
    outDir: 'dist',
  }
})

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
