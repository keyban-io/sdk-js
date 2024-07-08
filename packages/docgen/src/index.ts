import * as TypeDoc from "typedoc";

async function main() {
    const app = await TypeDoc.Application.bootstrapWithPlugins({
        entryPoints: [
            "../sdk-base/src/eddsa/account.ts",
            "../sdk-base/src/eddsa/client.ts",
            "../sdk-react/src/eddsa/storages/index.ts",
            "../sdk-react/src/eddsa/hooks/index.ts",
            "../sdk-react/src/eddsa/provider/index.ts",
        ],
        disableSources: false,
        readme: "none",
        excludePrivate: true,
        excludeProtected: true,
        excludeExternals: true,
        plugin: [
            "typedoc-plugin-merge-modules",
            "typedoc-plugin-markdown"
        ],
        lang: "en",
        navigation: {
            "includeCategories": true,
            "includeGroups": false,
            "includeFolders": true
        }
    });

    // Set options for typedoc-plugin-markdown
    app.options.setValue('entryFileName', "References");
    app.options.setValue('hideBreadcrumbs', true);
    app.options.setValue('hidePageHeader', true);
    app.options.setValue('hidePageTitle', true);
    app.options.setValue('readme', "none");
    app.options.setValue('useCodeBlocks', true);

    // Set options for typedoc-plugin-merge-modules
    // app.options.setValue('mergeModulesRenameDefaults', false); // NEW option of TypeDoc added by this plugin
    // app.options.setValue('mergeModulesMergeMode', "project"); // NEW option of TypeDoc added by this plugin


    const project = await app.convert();

    if (project) {
        const outputDir = "docs";
        await app.generateDocs(project, outputDir);
    } else {
        console.error("Unable to generate docs due to errors.");
    }
}

main().catch(console.error);