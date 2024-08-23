Here's a step-by-step breakdown of the process you outlined:

### Step 1: Navigate to the `playground` Folder

You need to navigate to the `playground` directory using your terminal or command line interface.

```bash
cd playground
```

### Step 2: Create a New App Using `create-keyban-app`

Run the following command to create a new app named `my-second-app`:

```bash
node ../create-keyban-app/index.js my-second-app
```

This will generate a new directory named `my-second-app` within the `playground` folder.

### Step 3: Modify the `package.json` File

After creating the new app, navigate to the `my-second-app` directory:

```bash
cd my-second-app
```

Now, open the `package.json` file in a text editor of your choice and add the following dependencies under the `"dependencies"` section:

```json
{
  "dependencies": {
    "@keyban/sdk-base": "workspace:*",
    "@keyban/sdk-react": "workspace:*"
  }
}
```

This ensures that your app will use the workspace versions of these packages.

### Step 4: Install Dependencies Using `pnpm`

After modifying the `package.json` file, install the dependencies by running:

```bash
pnpm install
```

This command will install all necessary dependencies for your project.

### Step 5: Run the Development Server

Finally, start the development server with:

```bash
pnpm run dev
```

This command will launch the app, and you can begin development.
