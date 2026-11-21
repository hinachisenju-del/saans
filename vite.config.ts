import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  build: {
    target: 'es2022',
    cssTarget: 'es2022',
    modulePreload: {
      polyfill: false,
    },
  },
  server: {
    allowedHosts: true,
    headers: {
      'X-Robots-Tag': 'index, follow, all',
    },
  },
  preview: {
    allowedHosts: true,
    headers: {
      'X-Robots-Tag': 'index, follow, all',
    },
  },
})