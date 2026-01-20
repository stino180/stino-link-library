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
    // More compatible target for a wider range of browsers.
    // ("esnext" can be fragile on older Safari/WebViews and can manifest as a blank screen.)
    target: 'es2019',
    cssCodeSplit: true,
    // Optimize chunk size reporting
    reportCompressedSize: true,
    // Reduce chunk size for better loading
    chunkSizeWarningLimit: 500,
  },
}));
