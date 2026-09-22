import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Saat `npm run dev`, request /api diteruskan ke backend Express
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
