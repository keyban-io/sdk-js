import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
    port: 4200,
  },
  define: {
    // disable apollo client dev tool install message in console
    "globalThis.__DEV__": JSON.stringify(configEnv.mode === "development"),
  },
}));
