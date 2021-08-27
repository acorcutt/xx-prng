// vite.config.js
import pkg from 'vite';
const { defineConfig } = pkg;
export default defineConfig(({ root }) => ({
  build: {
    lib: {
      entry: './lib/index.js',
      name: 'xxPrng',
      fileName: (format) => `xx-prng.${format}.js`,
      formats: ['es', 'umd', 'iife', 'cjs'],
    },
  },
}));
