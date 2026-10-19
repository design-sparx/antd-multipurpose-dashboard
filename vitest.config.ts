import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mocks': path.resolve(__dirname, './public/mocks'),
    },
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});
