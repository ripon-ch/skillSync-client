// Path: ~/skillSync/client/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ✅ Vite configuration for React + clean alias setup
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // Allow local & network access (for testing on phone)
    port: 5173,      // Default Vite port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // So you can use @/components etc.
    },
  },
  build: {
    outDir: "dist",  // Output folder for production build
  },
});
