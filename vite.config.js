import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const pageNames = [
  'index',
  'menu',
  'cakes',
  'product',
  'about',
  'founders',
  'process',
  'suppliers',
  'mission',
  'awards',
  'heritage',
  'visit',
  'blog',
  'cafe-notes',
  'recipe-stories',
  'seasonal',
  'suppliers-journal',
  'how-to',
];

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pageNames.map((name) => [name, resolve(__dirname, `${name}.html`)]),
      ),
    },
  },
});
