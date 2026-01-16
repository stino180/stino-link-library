import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: mode === "production",
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split GalleryScene into its own chunk for better code splitting (check first)
          if (id.includes('GalleryScene')) {
            return 'gallery-scene';
          }
          
          // Split vendor code
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Split Three.js and related 3D libraries - isolate heavy 3D code
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            // Split Radix UI components (large library)
            if (id.includes('@radix-ui')) {
              return 'radix-vendor';
            }
            // Split other heavy dependencies
            if (id.includes('@tanstack/react-query') || id.includes('lucide-react')) {
              return 'utils-vendor';
            }
            // Other vendor code
            return 'vendor';
          }
        },
      },
    },
    target: 'esnext',
    cssCodeSplit: true,
    // Optimize chunk size reporting
    reportCompressedSize: true,
    // Reduce chunk size for better loading
    chunkSizeWarningLimit: 500,
  },
}));
