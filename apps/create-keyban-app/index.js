#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Step 1: Create a new Vite React project with TypeScript
const projectName = 'my-app';
execSync(`npx create-vite@latest ${projectName} --template react-ts`, { stdio: 'inherit' });

// Step 2: Navigate into the project directory
process.chdir(projectName);

// Step 3: Install additional dependencies
// execSync('npm install @keyban/sdk-react react-error-boundary', { stdio: 'inherit' });
execSync('npm install react-error-boundary', { stdio: 'inherit' });


// Step 4: Copy custom files into the src directory
const srcPath = path.join(__dirname, 'template', 'src');
const destPath = path.join(process.cwd(), 'src');

// Copy the files from the template directory to the new project
for (const file of fs.readdirSync(srcPath)) {
    fs.copyFileSync(path.join(srcPath, file), path.join(destPath, file));
}

// Step 5: Run the development server
execSync('npm run dev', { stdio: 'inherit' });
