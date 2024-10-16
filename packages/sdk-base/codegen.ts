import type { CodegenConfig } from "@graphql-codegen/cli";

const IMPORT_SCALARS =
  '// @ts-ignore\nimport type { Address, Hash, Hex } from "~/index";';
const scalars = {
  Address: "Address",
  Hash: "Hash",
  Hex: "Hex",
  BigInt: "bigint",
  JSON: "JSON",
};

const config: CodegenConfig = {
  schema: "https://api.keyban.localtest.me/graphql",
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true,
  generates: {
    "src/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typed-document-node",
        { add: { content: IMPORT_SCALARS } },
        { add: { content: "\n", placement: "append" } },
      ],
      config: {
        typesPrefix: "Gql",
        namingConvention: "keep",
        skipTypename: true,
        avoidOptionals: true,
        printFieldsOnNewLines: true,
        documentMode: "documentNode",
        documentNodeImport:
          "@graphql-typed-document-node/core#TypedDocumentNode",
        strictScalars: true,
        scalars,
      },
    },
  },
};

export default config;
