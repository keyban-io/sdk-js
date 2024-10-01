#!/usr/bin/env node

import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";

// Function to display help information
function displayHelp() {
  console.log(`
Usage: create-keyban-app [options] <project-name>

Options:
  --help         Display this help message and exit

Arguments:
  project-name   The name of the project to create. Defaults to "my-app".

Examples:
  create-keyban-app               Create a new project with the default name "my-app".
  create-keyban-app my-project    Create a new project with the name "my-project".
  `);
}

// Check for --help flag
if (process.argv.includes("--help")) {
  displayHelp();
  process.exit(0);
}

// Step 1: Get the project name from the command line arguments, or use 'my-app' as the default
const projectName = process.argv[2] || "my-app";

// Step 2: Create a new Vite React project with TypeScript
execSync(`npx create-vite@latest ${projectName} --template react-swc-ts`);

// Step 3: Navigate into the project directory
process.chdir(projectName);

// Step 4: Install additional dependencies
execSync(
  "npm install @keyban/sdk-react react-error-boundary @auth0/auth0-react",
  { stdio: "inherit" },
);

// Step 5: Copy custom files into the src directory
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

// Step 7: Run the development server
execSync("npm run dev", { stdio: "inherit" });
