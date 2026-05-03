import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
// Use plugin-react (esbuild/babel) instead of react-swc: avoids "@swc/core Failed to load native binding"
// on some Node / Windows setups; performance impact is negligible for dev.
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Tailwind v4 official Vite plugin — avoids PostCSS + lightningcss optional-deps breakage on npm/Windows.
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:5080',
        changeOrigin: true,
        secure: false,
      },
    },
  }
});