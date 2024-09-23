import './Wallet.css'; // Fichier CSS séparé

import type React from 'react';
import { Suspense } from 'react';

import {
  ErrorBoundary,
  useErrorBoundary,
} from 'react-error-boundary';

import { useAuth0 } from '@auth0/auth0-react';
import {
  FormattedBalance,
  KeybanProvider,
  useKeybanAccount,
  useKeybanAccountBalance,
} from '@keyban/sdk-react';

import config from './config';

// ErrorFallback Component
// This component is displayed when something goes wrong in the child components
function ErrorFallback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button type="button" onClick={resetBoundary}>
        Try again
      </button>
    </div>
  );
}

// WalletContent Component
// This component contains the main logic to display the account ID, address, and balance
const WalletContent: React.FC = () => {
  // Retrieves the Keyban account information, with error handling
  const [account, accountError] = useKeybanAccount({ suspense: true });
  if (accountError) throw accountError; // Throws an error if the account cannot be retrieved

  // Retrieves the account balance, with error handling, and refreshes the balance
  const [balance, balanceError, { refresh: refreshBalance }] =
    useKeybanAccountBalance(account, {
      suspense: true,
    });
  if (balanceError) throw balanceError; // Throws an error if the balance cannot be retrieved

  return (
    <div className="wallet">
      <div>Address: {account?.address || "No address found"}</div>{" "}
      {/* Displays the account address */}
      <div>
        <FormattedBalance balance={balance} /> on {config.keybanProvider.chain}{" "}
        <button
          type="button"
          className="refresh-button"
          onClick={refreshBalance}
        >
          refresh
        </button>
      </div>
    </div>
  );
};

// Main Wallet Component
// This component wraps the WalletContent with the KeybanProvider and handles errors and loading states
const Wallet: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <KeybanProvider
        {...config.keybanProvider}
        accessTokenProvider={getAccessTokenSilently}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {" "}
          {/* Displays a loading state while fetching data */}
          <WalletContent /> {/* Renders the main content of the wallet */}
        </Suspense>
      </KeybanProvider>
    </ErrorBoundary>
  );
};

export default Wallet;
