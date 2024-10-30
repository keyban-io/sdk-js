import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://subql.keyban.localtest.me",
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
        avoidOptionals: true,
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
          JSON: "any",
        },
      },
    },
  },
};

export default config;
