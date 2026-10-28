import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Forward /api calls to the Spring Boot backend
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
