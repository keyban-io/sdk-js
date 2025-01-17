#!/usr/bin/env node

import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";

// Display help information
function displayHelp() {
  console.log(`
Usage: create-keyban-app [options] <project-name>

Options:
  --help         Display this help message and exit
  --pm <manager> Specify the package manager (npm, yarn, pnpm). Default: npm

Arguments:
  project-name   The name of the project to create. Default: "my-app".

Examples:
  create-keyban-app
  create-keyban-app my-project
  create-keyban-app --pm yarn my-project
  `);
}

// Check if help is requested
if (process.argv.includes("--help")) {
  displayHelp();
  process.exit(0);
}

// Check dev mode
const dev = process.argv.includes("--dev");

// Retrieve the project name
const projectNameArg = process.argv.find((arg, index) => {
  return index > 1 && !arg.startsWith("--");
});
const projectName = projectNameArg || "my-app";

// Retrieve the package manager
const pmIndex = process.argv.indexOf("--pm");
let packageManager = "npm";
if (pmIndex !== -1 && process.argv[pmIndex + 1]) {
  const pmArg = process.argv[pmIndex + 1];
  if (["npm", "yarn", "pnpm"].includes(pmArg)) {
    packageManager = pmArg;
  } else {
    console.error(`Invalid package manager: ${pmArg}`);
    process.exit(1);
  }
}

// Step 1: Create a new Vite React TypeScript project
execSync(`npx create-vite@latest ${projectName} --template react-swc-ts`, { stdio: 'inherit' });

// Step 2: Move into the project directory
process.chdir(projectName);

// Step 3: Install additional dependencies using the chosen package manager
execSync(
  `${packageManager} install @keyban/sdk-react react-error-boundary`,
  { stdio: "inherit" },
);

// Step 4: Copy custom files
const templatePath = path.resolve(url.fileURLToPath(import.meta.url), "..", "template");
fs.cpSync(
  path.resolve(templatePath, "src"),
  path.resolve(process.cwd(), "src"),
  { recursive: true },
);
fs.cpSync(
  path.resolve(templatePath, "vite.config.ts"),
  path.resolve(process.cwd(), "vite.config.ts"),
);
