import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [tsconfigPaths()],
  server: {
    host: true,
    port: 4200,
  },
  base: "/signer-client",
  build: {
    outDir: "dist/signer-client",
  },
  test: {
    environment: "happy-dom",
    setupFiles: ["./src/vitest.setup.ts"],
  },
}));
