import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  host: '0.0.0.0',
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
});
