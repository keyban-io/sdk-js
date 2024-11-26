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

// Conserver les plugins d'origine et ajouter le plugin markdown
if (!options.plugin.includes("typedoc-plugin-markdown")) {
  options.plugin.push("typedoc-plugin-markdown");
}

// Ajout et mise à jour des options
Object.assign(options, {
  alwaysCreateEntryPointModule: false,
  outputFileStrategy: "modules",
  flattenOutputFiles: true,
  mergeReadme: true,
  entryFileName: "Keyban-sdk",
});

// Sauvegarde de la copie mise à jour
fs.writeFileSync(copyPath, JSON.stringify(options, null, 2), "utf8");

console.log(`Options mises à jour et sauvegardées dans ${copyPath}`);
