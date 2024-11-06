# Keyban SDK React

## Overview

The Keyban SDK React is designed to integrate Keyban's MPC wallet solution seamlessly into React applications. It simplifies the use of decentralized wallets by providing developers with an easy-to-use set of components, hooks, and utilities, fully compatible with React's ecosystem.

## Key Features

- **TypeScript Support**: Fully typed for safer and more efficient development.
- **Flexible Storage**: `KeybanLocalStorage` is provided as the default storage for user data. Additional storage options will be available in future updates.
- **Blockchain Support**: Currently supports Polygon's Amoy testnet (Mainnet coming soon).
- **Error Handling**: Built-in support for `react-error-boundary` for graceful error handling.
- **Suspense Compatibility**: Supports React's Suspense API for loading asynchronous data seamlessly.
- **Bundling**: Efficient bundling with `tsup`, optimizing development and production builds.

## Installation

```bash
npm install @keyban/sdk-react
```

## Basic Example

This example shows how to set up the SDK with basic components, integrating with React's error boundaries and Suspense API.

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { KeybanProvider, KeybanChain, KeybanLocalStorage } from "@keyban/sdk-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <KeybanProvider
    appId="your-keyban-app-id"
    accessTokenProvider={async () => "user's access token"}
    chain={KeybanChain.PolygonAmoy}
    storage={KeybanLocalStorage}
  >
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

The SDK provides key React hooks and components to simplify wallet and balance management:

- **`useKeybanAccount`**: Hook to retrieve account details.
- **`useKeybanAccountBalance`**: Hook to fetch the account's balance.
- **`FormattedBalance`**: Component to format and display balances in a readable format.

### Supported Blockchains

Currently, the SDK supports testnets only:

- **Amoy Testnet**: `KeybanChain.PolygonAmoy`

Mainnet support will be added in a future release.

### Custom Storage and Signing

Developers can implement their own storage and signing mechanisms if needed. In this release, the SDK comes with `KeybanLocalStorage` by default. More advanced storage options are planned.

### Bundlers

#### Vite.js

When using Vite.js, you might encounter a [known issue regarding WebAssembly (WASM) modules](https://github.com/vitejs/vite/issues/8427) in development mode. To resolve this, exclude the `@keyban/ecdsa-wasm-client` package from optimized dependencies by updating your `vite.config.ts` as follows:

```ts
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["@keyban/ecdsa-wasm-client"],
  },
});
```

## Documentation

For more details and advanced usage, refer to the official [Keyban API Reference Portal](https://docs.demo.keyban.io/api/References).
