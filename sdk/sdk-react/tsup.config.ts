import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig(({ watch = false }) => ({
  clean: true,
  dts: true,
  entry: {
    index: "src/index.ts",
  },
  external: ["react", "react-dom"],
  format: ["cjs", "esm", "iife"],
  treeshake: isProduction,
  minify: isProduction,
  sourcemap: isProduction,
  watch,
}));
