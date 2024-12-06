import { defineConfig } from "tsup";

export default defineConfig(({ watch = false }) => ({
  dts: true,
  entry: {
    index: "src/index.ts",
    graphql: "src/graphql.ts",
    rpc: "src/rpc.ts",
    errors: "src/errors/index.ts",
  },
  external: [],
  format: ["cjs", "esm"],
  plugins: [],
  treeshake: true,
  minify: true,
  sourcemap: true,
  watch,
}));
