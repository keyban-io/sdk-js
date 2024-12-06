
# Keyban Scaffolding App

This scaffold allows you to quickly set up a Keyban-based React wallet application.

## Quick Start

To create and run the app, follow these steps:

```bash
# Create a temporary directory and navigate into it
cd $(mktemp -d)

# Initialize the Keyban app using your preferred package manager
npm init @keyban/keyban-app
```

After the initialization completes, navigate to your project directory (if not already there) and start the development server:

```bash
cd your-project-name
npm dev
```

Once the development server is running, you can access the app by opening your browser at the URL shown in the terminal (usually `http://localhost:5173/`).

### Steps in the browser

1. **Click "Login"**.
2. **Login** using the default pre-configured account.
3. You will then see the basic information about your wallet, including your public key and balance on the Polygon Amoy testnet.

> **Note:** For this demo, no additional configuration or Auth0 account is needed as the app uses default credentials.

## Documentation

For more detailed information, check out the [Keyban documentation](https://docs.demo.keyban.io/).
