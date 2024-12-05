import "./Wallet.css";

import React from "react";

import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { useAuth0 } from "@auth0/auth0-react";
import {
  FormattedBalance,
  KeybanProvider,
  useKeybanAccount,
  useKeybanAccountBalance,
} from "@keyban/sdk-react";

import config from "./config";

// WalletContent Component
// This component contains the main logic to display the account ID, address, and balance
function WalletContent() {
  // Retrieves the Keyban account information, with error handling
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError; // Throws an error if the account cannot be retrieved

  // Retrieves the account balance, with error handling, and refreshes the balance
  const [balance, balanceError] = useKeybanAccountBalance(account);

  if (balanceError) throw balanceError; // Throws an error if the balance cannot be retrieved

  return (
    <div className="wallet">
      <div>Address: {account?.address || "No address found"}</div>
      {/* Displays the account address */}
      <div>
        <FormattedBalance balance={{ raw: balance, isNative: true }} /> on{" "}
        {config.keyban.chain}{" "}
      </div>
    </div>
  );
}

// ErrorFallback Component
// This component is displayed when something goes wrong in the child components
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

// Main Wallet Component
// This component wraps the WalletContent with the KeybanProvider and handles errors and loading states
export default function Wallet() {
  const { getAccessTokenSilently } = useAuth0();

  return (
    <KeybanProvider
      {...config.keyban}
      accessTokenProvider={getAccessTokenSilently}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {/* Displays a loading state while fetching data */}
        <React.Suspense fallback={<div>Loading...</div>}>
          {/* Renders the main content of the wallet */}
          <WalletContent />
        </React.Suspense>
      </ErrorBoundary>
    </KeybanProvider>
  );
}
