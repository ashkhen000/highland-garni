import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite"; // 1. Import the Tailwind plugin
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Add it right here to process your styles.css
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
