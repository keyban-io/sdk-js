import { defineConfig } from "tsup";

export default defineConfig(({ watch = false }) => ({
  dts: true,
  entry: {
    index: "src/index.ts",
  },
  external: [],
  format: ["cjs", "esm"],
  plugins: [],
  treeshake: true,
  minify: true,
  sourcemap: true,
  watch,
}));
