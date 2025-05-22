import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
export default defineConfig({
  base: '/', // <-- make sure this is here
  plugins: [react()],
  build: {
    outDir: 'dist'
  }, 
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/v1': {
        target: 'https://lac-viet-studio-api.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
