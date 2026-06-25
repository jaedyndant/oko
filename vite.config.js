import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/oko/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
