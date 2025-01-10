import "./Wallet.css";

import React from "react";
import config from "./config";

import {
  FormattedBalance,
  useKeybanAccount,
  useKeybanAccountBalance,
} from "@keyban/sdk-react";

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

// Main Wallet Component
// This component wraps the WalletContent with the KeybanProvider and handles errors and loading states
export default function Wallet() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <WalletContent />
    </React.Suspense>
  );
}
