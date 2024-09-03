import type { CodegenConfig } from "@graphql-codegen/cli";

const IMPORT_SCALARS = 'import type { Address, Hash, Hex } from "~/index";';
const scalars = {
  Address: "Address",
  Hash: "Hash",
  Hex: "Hex",
  BigInt: "bigint",
};

const config: CodegenConfig = {
  schema: "https://keyban.localtest.me/api/graphql",
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true,
  generates: {
    "src/gql-types.ts": {
      plugins: [
        "typescript",
        { add: { content: "// @ts-nocheck" } },
        { add: { content: IMPORT_SCALARS } },
      ],
      config: {
        typesPrefix: "Gql",
        namingConvention: "keep",
        strictScalars: true,
        scalars,
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
        // Previous plugins will always import gql-types.ts, which
        // might not be used and will result in a TypeScript
        // compilation error at build time. Since these files are
        // auto-generated, there's no point to typecheck them.
        { add: { content: "// @ts-nocheck" } },
        { add: { content: "\n", placement: "append" } },
      ],
      config: {
        typesPrefix: "Gql",
        namingConvention: "keep",
        skipTypename: true,
        printFieldsOnNewLines: true,
        documentMode: "string",
        strictScalars: true,
        scalars,
      },
    },
  },
};

export default config;
