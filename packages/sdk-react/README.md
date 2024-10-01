# Keyban SDK React

## Overview

React SDK for Keyban's MPC wallet solution, designed to facilitate easy integration of MPC wallets into React applications.

## Features

- **TypeScript Support**: Fully typed with TypeScript for type safety and improved development experience.
- **Flexible Storage**: While additional storage options are planned for future releases, you can start building with `KeybanLocalStorage` as the default storage mechanism.
- **Blockchain Support**: Easily switch between supported testnet blockchains such as Ethereum Sepolia (Mainnet not yet available).
- **Bundling**: Uses `tsup` for efficient bundling.
- **Error Handling**: Built-in support for `react-error-boundary` to handle errors gracefully.
- **Suspense API Compatibility**: Fully compatible with React's Suspense API for asynchronous data loading.

## Install

```bash
npm i @keyban/sdk-react
```

## Basic Usage

Here's a basic example of how to integrate Keyban SDK React into your project:

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { KeybanProvider, KeybanChain, KeybanLocalStorage } from "@keyban/sdk-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <KeybanProvider
    appId="your-keyban-app-id"
    accessTokenProvider={async () => "user's access token"}
    chain={KeybanChain.Sepolia}  {/* Choose Sepolia as the Mainnet is not yet supported */}
    storage={KeybanLocalStorage}  {/* Use LocalStorage for now, more storage options coming soon */}
  >
    {/* We recommend using react-error-boundary to handle errors */}
    <ErrorBoundary fallbackRender={({ error }) => <pre>{error.message}</pre>}>
      <React.Suspense fallback="Loading...">
        <MyWallet />
      </React.Suspense>
    </ErrorBoundary>
  </KeybanProvider>,
);

function MyWallet() {
  const [account, accountError] = useKeybanAccount({ suspense: true });
  if (accountError) throw accountError;

  const [balance, balanceError] = useKeybanAccountBalance(account, { suspense: true });
  if (balanceError) throw balanceError;

  return (
    <div>
      Your account balance: <FormattedBalance balance={balance} />
    </div>
  );
}
```

### Hooks and Components

- **useKeybanAccount**: Retrieves account details for the user.
- **useKeybanAccountBalance**: Fetches the account's balance. Both hooks are compatible with React's Suspense API.

### Available Chains

In this initial release, only testnets are supported:
- `KeybanChain.Sepolia` (Ethereum testnet)

Additional networks, including Ethereum Mainnet, will be available in future releases.

### Custom Storage and Signing

In this initial release, `KeybanLocalStorage` is available for storing account information. More storage options will be introduced in future releases to support various use cases. You can also implement your own storage solution by conforming to the `IKeybanStorage` interface.

## Bundlers

### Vite

If you are using Vite.js as your bundler, there is a [known bug regarding WebAssembly (WASM) module dependencies](https://github.com/vitejs/vite/issues/8427) in development mode only. As a workaround, you can exclude the `@keyban/ecdsa-wasm-client` package from optimized dependencies by updating your `vite.config.ts` file as follows:

```ts
import { defineConfig } from "vite";

export default defineConfig({
  // ...
  optimizeDeps: {
    exclude: ["@keyban/ecdsa-wasm-client"],
  },
});
```

## Examples

### Formatting a Balance

The SDK provides a `FormattedBalance` component to display account balances in a readable format.

```tsx
import { FormattedBalance } from "@keyban/sdk-react";

function BalanceDisplay() {
  return (
    <p>Native Balance: <FormattedBalance balance={BigInt(2e17)} /></p>
  );
}

export default BalanceDisplay;
```

## Documentation

For detailed documentation, please refer to the official [Keyban API Reference Portal](https://docs.demo.keyban.io/api/References).
