# README

## Overview

This project uses TypeDoc to generate documentation for TypeScript packages within a mono repo. Follow the instructions below to add new packages or modules to the documentation process and generate the necessary documentation.

## Prerequisites

- Familiarity with TypeScript and TypeDoc.

## Getting Started

### Adding a New Package or Module

To add a new package or module to be documented:

1. **Update the `index.ts` file:**
   - Open the `src/index.ts` file.
   - Add the path to your new TypeScript file in the `entryPoints` array. For example, if you are adding a new module in `sdk-react`, add its path to the list:

     ```typescript
     const app = await TypeDoc.Application.bootstrapWithPlugins({
         entryPoints: [
             "../packages/sdk-base/src/eddsa/account.ts",
             "../packages/sdk-base/src/eddsa/client.ts",
             "../packages/sdk-react/src/eddsa/storages/index.ts",
             "../packages/sdk-react/src/eddsa/hooks/index.ts",
             "../packages/sdk-react/src/eddsa/provider/index.ts",
             "../packages/sdk-react/src/newModule/index.ts",  // Add this line
         ],
         entryPointStrategy: 'expand',
         disableSources: false,
         excludePrivate: true,
         excludeProtected: true,
         excludeExternals: true
     });
     ```

2. **Update the `tsconfig.json` file:**
   - If your new package or module introduces new TypeScript settings or file paths, ensure that the `tsconfig.json` file reflects these changes. For example, add new `include` or `exclude` paths if necessary:

     ```json
     {
       "compilerOptions": {
         // existing options
       },
       "include": [
         "src",
         "../packages/sdk-base/src",
         "../packages/sdk-react/src",
         "../packages/sdk-react/src/newModule" // Add this line
       ],
       "exclude": [
         "node_modules",
         "dist"
       ]
     }
     ```

3. **Document Your Code:**
   - Ensure your TypeScript code is well-documented using JSDoc comments. TypeDoc will use these comments to generate the documentation.

     ```typescript
     /**
      * This function does something important.
      * @param param - Description of the parameter.
      * @returns Description of the return value.
      */
     function importantFunction(param: string): string {
         return `Important: ${param}`;
     }
     ```

### Generating Documentation

The documentation is generated automatically as part of the build process using Earthly in a job called `dap-doc`. You do not need to manually generate the documentation.

### Viewing the Documentation

The result of integrating new documentation is visible in the development environment at the following address:

[https://keyban.localtest.me/doc/docs/apis/sdk-docs/References](https://keyban.localtest.me/doc/docs/apis/sdk-docs/References)
