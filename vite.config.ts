import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to './' for relative path deployment (compatible with hash routing)
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})