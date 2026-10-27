import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Copies root-level static assets (237 ezgif-frame-*.jpg files, logo.png,
 * mustard_oil_mockup.png, natural-sesame-seed.jpg, and _redirects) into dist/
 * during production builds so Netlify serves every asset reliably.
 */
function copyRootStaticAssets(): Plugin {
  return {
    name: 'copy-root-static-assets',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(outDir)) return;

      const entries = fs.readdirSync(__dirname);
      for (const file of entries) {
        if (
          file.endsWith('.jpg') ||
          file.endsWith('.jpeg') ||
          file.endsWith('.png') ||
          file.endsWith('.webp') ||
          file.endsWith('.svg') ||
          file.endsWith('.ico') ||
          file === '_redirects'
        ) {
          const srcPath = path.resolve(__dirname, file);
          const destPath = path.resolve(outDir, file);
          try {
            if (fs.statSync(srcPath).isFile()) {
              fs.copyFileSync(srcPath, destPath);
            }
          } catch (err) {
            console.warn(`Could not copy asset ${file}:`, err);
          }
        }
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    copyRootStaticAssets(),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
