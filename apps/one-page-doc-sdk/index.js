const TypeDoc = require("typedoc");
const fs = require("fs");
const path = require("path");

async function main() {
  const outputDir = "docs";

  // Fonction pour supprimer le dossier s'il existe
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
    console.log(`[info] Dossier ${outputDir} supprimé.`);
  }

  // Liste des SDK à traiter dans un seul processus
  const entryPoints = [
    "../../packages/sdk-base/src/index.ts",
    "../../packages/sdk-react/src/index.ts",
  ];

  // Créer une instance TypeDoc avec plusieurs entryPoints
  const app = await TypeDoc.Application.bootstrapWithPlugins({
    alwaysCreateEntryPointModule: false,
    entryPoints: entryPoints, // Fournir plusieurs points d'entrée
    tsconfig: "./tsconfig.json",
    plugin: ["typedoc-plugin-markdown"], // Utiliser le plugin markdown,
    outputFileStrategy: "modules",
    flattenOutputFiles: true,
    // entryModule: "index", // don't work
    mergeReadme: true,
    useCodeBlocks: true,
    disableSources: true,

    // Options de configuration récupérer de docusaurus
    readme: "none",
    excludePrivate: true,
    excludeProtected: true,
    excludeExternals: true,
    lang: "en",
    navigation: {
      includeCategories: true,
      includeGroups: true,
      includeFolders: true,
    },
    hidePageTitle: true,
    entryFileName: "References",
  });

  const project = await app.convert();

  if (project) {
    // Générer la documentation Markdown directement dans le répertoire docs
    await app.generateDocs(project, outputDir);
    console.log(`[info] Documentation Markdown générée dans ${outputDir}`);
  }
}

main().catch(console.error);
