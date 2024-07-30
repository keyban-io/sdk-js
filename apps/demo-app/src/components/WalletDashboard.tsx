import type React from "react";
import { useState, useEffect } from "react";
import {
  KeybanProvider,
  KeybanSigner,
  useKeyban,
  KeybanLocalStorage,
} from "@keyban/sdk-react";
import type { KeybanAccount } from "@keyban/sdk-react";
import { FormattedBalance } from "@keyban/sdk-react";
import "./WalletDashboard.css";

const WalletDashboardContent: React.FC = () => {
  const keyban = useKeyban();
  const [account, setAccount] = useState<KeybanAccount | null>(null);
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [network, setNetwork] = useState<string>("Polygon Testnet Amoy");

  useEffect(() => {
    let isMounted = true;
    keyban.client
      .initialize("my-ecdsa-key-id")
      .then((account) => {
        if (isMounted) {
          setAccount(account);
          return account.getBalance();
        }
      })
      .then((balance) => {
        if (isMounted) {
          setBalance(balance);
        }
      })
      .catch((error) => {
        console.error("Error fetching account balance:", error);
      });

    return () => {
      isMounted = false;
    };
  }, [keyban.client]);

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNetwork(event.target.value);
  };

  return (
    <div className="wallet-dashboard">
      <div className="header">
        <span>Keyban WAAS Demo</span>
        <span className="notification">🔔</span>
      </div>
      <div className="section">
        <div>
          Account: : {account?.keyId || "Loading..."}{" "}
          <button type="button">Rename</button>
        </div>
        <div>
          Address:{" "}
          <span className="address">{account?.address || "Loading..."}</span>
        </div>
        <div>
          Network:
          <select value={network} onChange={handleNetworkChange}>
            <option value="Polygon Testnet Amoy">Polygon Testnet Amoy</option>
            <option value="Polygon Mainnet">Polygon Mainnet</option>
          </select>
        </div>
        <button type="button">Share address</button>
      </div>
      <div className="section">
        <div>
          Native Balance:{" "}
          <span className="balance">
            {balance ? <FormattedBalance balance={balance} /> : "Loading..."}
          </span>
        </div>
        <button type="button">Send</button>
      </div>
      <div className="section">
        <div>NFTs (Total: 5)</div>
        <button type="button">View NFTs</button>
      </div>
      <div className="section">
        <div>Non-Native Cryptocurrencies</div>
        <div className="crypto">
          - AAVE: 0.005 <button type="button">Send</button>
        </div>
        <div className="crypto">
          - LINK: 0.2 <button type="button">Send</button>
        </div>
        <button type="button">View All</button>
      </div>
      <button type="button">Transaction History</button>
    </div>
  );
};

const WalletDashboard: React.FC = () => (
  <KeybanProvider signer={KeybanSigner.ECDSA} storage={KeybanLocalStorage}>
    <WalletDashboardContent />
  </KeybanProvider>
);

export default WalletDashboard;
