import * as TypeDoc from "typedoc";

async function main() {
  const app = await TypeDoc.Application.bootstrapWithPlugins({
    entryPoints: ["../sdk-base/src/index.ts", "../sdk-react/src/index.ts"],
    disableSources: false,
    readme: "none",
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    plugin: ["typedoc-plugin-merge-modules", "typedoc-plugin-markdown"],
    lang: "en",
    navigation: {
      includeCategories: true,
      includeGroups: false,
      includeFolders: true,
    },
  });

  // Set options for typedoc-plugin-markdown
  app.options.setValue("entryFileName", "References");
  app.options.setValue("hideBreadcrumbs", true);
  app.options.setValue("hidePageHeader", true);
  app.options.setValue("hidePageTitle", true);
  app.options.setValue("readme", "none");
  app.options.setValue("useCodeBlocks", true);

  const project = await app.convert();

  if (project) {
    const outputDir = "docs";
    await app.generateDocs(project, outputDir);
  } else {
    console.error("Unable to generate docs due to errors.");
  }
}

main().catch(console.error);
