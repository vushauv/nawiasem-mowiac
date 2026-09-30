import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // File events can be missed on bind mounts in Docker, so poll there.
  server: { watch: process.env.USE_POLLING ? { usePolling: true } : undefined },
})
