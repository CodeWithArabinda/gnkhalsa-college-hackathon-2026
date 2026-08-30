import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@portfolio1': path.resolve(__dirname, './src/templates/portfolio1'),
    },
  },
  define: {
    'process.env': {},
    global: 'window',
  },
  server: {
    port: 5180,
  },
});
