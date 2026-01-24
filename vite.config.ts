import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    // Optimize images at build time
    ViteImageOptimizer({
      png: { quality: 75 },
      jpeg: { quality: 75 },
      jpg: { quality: 75 },
      webp: { lossless: false, quality: 75, alphaQuality: 75 },
      avif: { lossless: false, quality: 60 },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: mode === "production",
    minify: 'esbuild',
    cssMinify: true,
    target: 'es2019',
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Manual chunks to separate Three.js from main bundle
        // This allows the main app to load/render before Three.js
        manualChunks: (id) => {
          // Three.js and related 3D libraries - load after initial paint
          if (id.includes('node_modules/three') || 
              id.includes('node_modules/@react-three') ||
              id.includes('node_modules/troika')) {
            return 'three-vendor'
          }
          // React core - keep together for context stability
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-vendor'
          }
        },
      },
    },
  },
}));
