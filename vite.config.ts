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
    // Optimize images at build time - converts to WebP/AVIF with responsive sizes
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: false,
        quality: 80,
        alphaQuality: 80,
      },
      avif: {
        lossless: false,
        quality: 65,
      },
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
    // More compatible target for a wider range of browsers.
    target: 'es2019',
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    // Enable asset inlining for small images
    assetsInlineLimit: 4096,
  },
}));
