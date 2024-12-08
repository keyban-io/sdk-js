import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import jsdoc from "eslint-plugin-jsdoc";

export default tseslint.config(
  jsdoc.configs["flat/recommended-typescript"],
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
      jsdoc,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "jsdoc/require-description": "warn",
      "jsdoc/require-hyphen-before-param-description": "warn",
      "jsdoc/check-tag-names": ["error", { typed: true }],
      "jsdoc/check-tag-names": ["error", { definedTags: ["remarks"] }],
    }
  }
);
