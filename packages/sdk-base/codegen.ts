import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://subql-ethereum-anvil.keyban.localtest.me",
  documents: ["src/**/*.gql"],
  ignoreNoDocuments: true,
  generates: {
    "src/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typed-document-node",
        { add: { content: "\n", placement: "append" } },
      ],
      config: {
        typesPrefix: "Gql",
        namingConvention: "keep",
        skipTypename: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: true,
        },
        printFieldsOnNewLines: true,
        documentMode: "documentNode",
        documentNodeImport:
          "@graphql-typed-document-node/core#TypedDocumentNode",
        strictScalars: true,
        scalars: {
          BigFloat: "string",
          BigInt: "string",
          Cursor: "string",
          Date: "string",
          Datetime: "string",
          JSON: "any",
        },
      },
    },
  },
};

export default config;
