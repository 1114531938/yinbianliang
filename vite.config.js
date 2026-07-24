import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('/node_modules/shaders/') ||
            id.includes('/node_modules/pixi.js/') ||
            id.includes('/node_modules/typegpu/')
          ) {
            return 'shader-runtime'
          }
        },
      },
    },
  },
})
