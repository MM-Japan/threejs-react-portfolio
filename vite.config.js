import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base URL depending on environment
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/<repo-name>/' : '/',
});
