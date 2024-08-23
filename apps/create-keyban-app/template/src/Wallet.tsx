import React from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import {
  KeybanProvider,
  KeybanLocalStorage,
  FormattedBalance,
  useKeybanAccount,
  useKeybanAccountBalance,
} from "@keyban/sdk-react";
import { KeybanSigner, KeybanChain } from "@keyban/sdk-base";
import { Suspense } from "react";

const keyId = "a-random-ecdsa-key";

// ErrorFallback Component
function ErrorFallback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
}

// WalletContent Component
const WalletContent: React.FC = () => {
  const [account, accountError] = useKeybanAccount(keyId, { suspense: true });
  if (accountError) throw accountError;

  const [balance, balanceError, { refresh: refreshBalance }] =
    useKeybanAccountBalance(account, { suspense: true });
  if (balanceError) throw balanceError;

  return (
    <div>
      <div>Account ID: {keyId || "No account"}</div>
      <div>Address: {account?.address || "No address found"}</div>
      <div>
        <FormattedBalance balance={balance} />
        <button onClick={refreshBalance}>refresh</button>
      </div>
    </div>
  );
};

// Main Wallet component
const Wallet: React.FC = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <KeybanProvider
      chain={KeybanChain.polygonAmoy}
      signer={KeybanSigner.ECDSA}
      storage={KeybanLocalStorage}
      apiUrl="https://keyban.localtest.me"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <WalletContent />
      </Suspense>
    </KeybanProvider>
  </ErrorBoundary>
);

export default Wallet;
