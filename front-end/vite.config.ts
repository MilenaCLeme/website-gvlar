import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    svgr({
      exportAsDefault: true,
      include: '**/*.svg',
    }),
    react(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '../src/style/variables.scss';`,
      },
    },
  },
});
