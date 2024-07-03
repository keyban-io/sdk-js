import * as TypeDoc from "typedoc";

async function main() {
    const app = await TypeDoc.Application.bootstrapWithPlugins({
        entryPoints: [
            "../packages/sdk-base/src/eddsa/account.ts",
            "../packages/sdk-base/src/eddsa/client.ts",
            "../packages/sdk-react/src/eddsa/storages/index.ts",
            "../packages/sdk-react/src/eddsa/hooks/index.ts",
            "../packages/sdk-react/src/eddsa/provider/index.ts",
        ],
        entryPointStrategy: 'expand',
        disableSources: false,
        // readme: "none",
        excludePrivate: true,
        excludeProtected: true,
        excludeExternals: true,
        plugin: ["typedoc-plugin-markdown"]
    });

    const project = await app.convert();

    if (project) {
        const outputDir = "docs";
        await app.generateDocs(project, outputDir);
        // await app.generateJson(project, outputDir + "/documentation.json");
    } else {
        console.error("Unable to generate docs due to errors.");
    }
}

main().catch(console.error);