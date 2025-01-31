import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["webgl-mock-threejs"],
  },
  build: {
    rollupOptions: {
      external: ["webgl-mock-threejs"],
    },
  },
});
