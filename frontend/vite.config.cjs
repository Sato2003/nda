const path = require('node:path');
const react = require('@vitejs/plugin-react');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  root: __dirname,
  envDir: path.resolve(__dirname, '..'),
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: true,
  },
});
