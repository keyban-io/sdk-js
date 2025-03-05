import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 4200,
    allowedHosts: ["refine.admin.keyban.localtest.me"],
  },
})
