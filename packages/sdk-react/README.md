# Keyban SDK React

## Overview

React SDK for Keyban MPC wallet solution.

## Features

- **TypeScript Support**: Fully typed with TypeScript for type safety and improved development experience.
- **Bundling**: Uses tsup for efficient bundling.

## Install

```sh
npm i @keyban/sdk-react
```

## Usage

Here's a basic example of how to use Keyban SDK React in your project:

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { KeybanProvider, KeybanChain, KeybanLocalStorage } from "@keyban/sdk-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <KeybanProvider
    appId="your keyban app ID"
    accessTokenProvider={async () => "user's access token"}
    chain={KeybanChain.Sepolia}
    storage={KeybanLocalStorage}
  >
    {/* We recomend using react-error-boundary to handle errors */}
    <ErrorBoundary fallbackRender={({ error }) => <pre>{error.message}</pre>}>
      {/* Keyban SDK React is fully compatible with React's suspense API. */}
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
