import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
  // base:'/Supping/',

  // build: {
  //   rollupOptions: {
  //     output: {
  //       assetFileNames: 'Supping/[name].[hash][extname]',
  //       entryFileNames: 'Supping/[name].[hash].js',
  //       chunkFileNames: 'Supping/[name].[hash].js',
  //     }
  //   }
  // }

});
