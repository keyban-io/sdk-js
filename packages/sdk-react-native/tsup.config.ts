import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig(({ watch = false }) => ({
  clean: true,
  dts: true,
  entry: ["src/index.ts", "src/web/index.ts"],
  external: [
    "react",
    "react-native",
    "react-dom",
    "react-native-react-bridge",
    "react-native-webview",
  ],
  format: ["cjs", "esm"],
  treeshake: isProduction,
  minify: isProduction,
  sourcemap: isProduction,
  watch,
}));
