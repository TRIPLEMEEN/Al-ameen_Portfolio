import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.JPEG', '**/*.JPG', '**/*.PNG', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
  server: {
    port: 3000,
    open: true,
  },
});
