# Doc Manager

Doc Manager is a tool designed to generate documentation for the Keyban SDK using TypeDoc. It complements the online documentation by producing a single Markdown file for each library, making it easy to integrate with AI tools for SDK usage. Note that Doc Manager shares configuration elements with the online documentation: any changes to the online documentation configuration will affect Doc Manager.

---

## Usage

### Option 1: Generate Documentation with Earthly (Recommended)

To generate the documentation using Earthly, run the following command from the root of the repository:

```sh
earthly ./tools+generate-docs
```

---

### Option 2: Generate Documentation Locally with Node.js

If you prefer running the script locally:

#### 1. Install Dependencies

Ensure you have installed the SDK and its dependencies. Then run:

```sh
pnpm install
```

#### 2. Generate Documentation

Run the following command to generate the documentation:

```sh
pnpm run generate-docs
```

This command performs the following steps:

1. Updates the TypeDoc options using the `scripts/update-typedoc-options.js` script.
2. Generates the documentation with the updated TypeDoc configuration.
3. Removes the temporary TypeDoc options file after completion.

---

## Output

The generated documentation is structured as a single Markdown file for each library. These files are stored in the `sdk/apps/doc-manager/docs` folder.
