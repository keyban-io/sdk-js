import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(
  ({ command }): UserConfig => ({
    plugins: [
      react({
        plugins: [
          [
            "@swc/plugin-formatjs",
            {
              idInterpolationPattern: "[sha512:contenthash:base64:6]",
              removeDefaultMessage: true, // command === "build",
              ast: true,
            },
          ],
        ],
      }),
      tsconfigPaths(),
    ],
    server: {
      host: true,
      port: 4200,
    },
  }),
);
