import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/webdevportfolio/', // Update this to match your repository name
  server: {
    host: "::",
    port: 8080,
  }
})
