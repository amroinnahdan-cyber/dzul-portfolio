import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // PostCSS: pakai daftar plugin kosong (Tailwind sudah ditangani @tailwindcss/vite).
  // Tanpa ini Vite ikut mencari file postcss.config.js ke folder DI ATAS project —
  // kalau folder induk berisi project lain (mis. Tailwind v3), CSS portofolio ini
  // akan diproses plugin versi salah dan halaman gagal dibuka.
  css: {
    postcss: { plugins: [] },
  },
  // Saat `npm run dev`, request /api diteruskan ke backend Express
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
