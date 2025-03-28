import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom')
    }
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom']
    }
  }
})