import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const isProduction = mode === 'production';
  return {
    plugins: [react()],
    build: {
      minify: 'terser',
      terserOptions: isProduction
        ? {
            compress: {
              drop_debugger: true,
              pure_funcs: ['log.debug', 'console.debug']
            },
          }
        : {},
    }
  };
});
