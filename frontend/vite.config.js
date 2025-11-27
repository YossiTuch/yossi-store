import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    proxy: {
      "/api/": { target: "http://localhost:5000", changeOrigin: true },
      "/uploads/": { target: "http://localhost:5000", changeOrigin: true },
      "/images/": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
});
