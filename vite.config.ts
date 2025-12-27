import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Pastikan ada tailwindcss() di dalam array plugins
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
