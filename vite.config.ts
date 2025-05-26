import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base URL for GitHub Pages deployment
  // Use the repository name for GitHub Pages deployment
  // e.g., if your repository is username/carbon-calculator, use '/carbon-calculator/'
  // For local development, use '/' (default)
  base: '/carbon-calculator/',
  build: {
    outDir: 'dist',
    // Generate source maps for better debugging
    sourcemap: true,
    // Optimize chunks for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
})
