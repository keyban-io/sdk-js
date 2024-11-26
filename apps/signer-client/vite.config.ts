import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [tsconfigPaths()],
  build: {
    rollupOptions: {
      input: {
        iframe: "iframe.html",
        test: "test.html",
      },
    },
  },
  server: {
    host: true,
    port: 4200,
  },
  base: "/public/",
}));
