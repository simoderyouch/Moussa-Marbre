import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Generate source maps only for production debugging
    sourcemap: false,
    // Minify with esbuild (faster) for production
    minify: 'esbuild',
    // CSS code splitting for faster initial load
    cssCodeSplit: true,
    // Chunk size warning limit (kB)
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Manual chunks for better caching & smaller initial bundle
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library (heavy)
          'vendor-motion': ['framer-motion'],
          // i18n (loaded on every page)
          'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          // UI primitives (Radix)
          'vendor-ui': [
            '@radix-ui/react-select',
            '@radix-ui/react-slider',
            '@radix-ui/react-label',
            '@radix-ui/react-slot',
            '@radix-ui/react-dialog',
          ],
        },
      },
    },
  },
});
