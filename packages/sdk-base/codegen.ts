import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true,
  generates: {
    "src/gql-types.ts": {
      plugins: ["typescript"],
      config: {
        typesPrefix: "Gql",
        namingConvention: "keep",
      },
    },

    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "gql-types.ts",
      },
      plugins: [
        "typescript-operations",
        "typescript-generic-sdk",
        {
          // Previous plugins will always import gql-types.ts, which
          // might not be used and will result in a TypeScript
          // compilation error at build time. Since these files are
          // auto-generated, there's no point to typecheck them.
          add: { content: "// @ts-nocheck" },
        },
      ],
      config: {
        typesPrefix: "Gql",
        namingConvention: "keep",
        printFieldsOnNewLines: true,
        documentMode: "string",
      },
    },
  },
};

export default config;
