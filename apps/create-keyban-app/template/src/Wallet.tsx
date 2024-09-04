import React, { Suspense } from 'react';

import {
  ErrorBoundary,
  useErrorBoundary,
} from 'react-error-boundary';

import {
  KeybanChain,
  KeybanSigner,
} from '@keyban/sdk-base';
import {
  FormattedBalance,
  KeybanLocalStorage,
  KeybanProvider,
  useKeybanAccount,
  useKeybanAccountBalance,
} from '@keyban/sdk-react';

// Key ID used to create or retrieve an account
const keyId = "a-random-ecdsa-key";

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
  const [account, accountError] = useKeybanAccount(keyId, { suspense: true });
  if (accountError) throw accountError; // Throws an error if the account cannot be retrieved

  // Retrieves the account balance, with error handling, and refreshes the balance
  const [balance, balanceError, { refresh: refreshBalance }] =
    useKeybanAccountBalance(account, {
      suspense: true,
    });
  if (balanceError) throw balanceError; // Throws an error if the balance cannot be retrieved

  return (
    <div>
      <div>Account ID: {keyId || "No account"}</div>{" "}
      {/* Displays the account ID */}
      <div>Address: {account?.address || "No address found"}</div>{" "}
      {/* Displays the account address */}
      <div>
        <FormattedBalance balance={balance} />{" "}
        {/* Displays the account balance in POL format */}
        <button type="button" onClick={refreshBalance}>
          refresh
        </button>
      </div>
    </div>
  );
};

// Main Wallet Component
// This component wraps the WalletContent with the KeybanProvider and handles errors and loading states
const Wallet: React.FC = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <KeybanProvider
      chain={KeybanChain.polygonAmoy} // Specifies the Polygon Amoy testnet as the blockchain network
      signer={KeybanSigner.ECDSA} // Specifies the ECDSA signer to be used
      storage={KeybanLocalStorage} // Uses local storage to persist wallet data
      apiUrl="https://keyban.localtest.me" // API URL for interacting with the Keyban backend
    >
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        {/* Displays a loading state while fetching data */}
        <WalletContent /> {/* Renders the main content of the wallet */}
      </Suspense>
    </KeybanProvider>
  </ErrorBoundary>
);

export default Wallet;
