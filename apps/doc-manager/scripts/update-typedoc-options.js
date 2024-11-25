const fs = require("node:fs");
const path = require("node:path");

// Chemins des fichiers
const originalPath = path.resolve(
  __dirname,
  "../../../../docs/docusaurus/typedocOptions.json",
);
const copyPath = path.resolve(
  __dirname,
  "../../../../docs/docusaurus/typedocOptions.temp.json",
);

// Charger le fichier original
const options = JSON.parse(fs.readFileSync(originalPath, "utf8"));

// Mise à jour des plugins
options.plugin = options.plugin.map((plugin) =>
  plugin === "typedoc-plugin-merge-modules"
    ? "typedoc-plugin-markdown"
    : plugin,
);

// Ajout et mise à jour des options
Object.assign(options, {
  alwaysCreateEntryPointModule: false,
  outputFileStrategy: "modules",
  flattenOutputFiles: true,
  mergeReadme: true,
});

// Sauvegarde de la copie mise à jour
fs.writeFileSync(copyPath, JSON.stringify(options, null, 2), "utf8");

console.log(`Options mises à jour et sauvegardées dans ${copyPath}`);
