import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router"],
          redux: ["@reduxjs/toolkit", "react-redux"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    proxy: {
      "/api/": { target: "http://localhost:5000", changeOrigin: true },
      "/uploads/": { target: "http://localhost:5000", changeOrigin: true },
      "/images/": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
});
