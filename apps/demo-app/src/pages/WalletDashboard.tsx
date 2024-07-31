import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  KeybanProvider,
  KeybanSigner,
  useKeyban,
  KeybanLocalStorage,
} from "@keyban/sdk-react";
import type { KeybanAccount } from "@keyban/sdk-react";
import { FormattedBalance } from "@keyban/sdk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCopy, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getErrorMessage } from "@/utils/errorUtils";
import "./WalletDashboard.css";

const WalletDashboardContent: React.FC = () => {
  const keyban = useKeyban();
  const navigate = useNavigate();
  const [account, setAccount] = useState<KeybanAccount | null>(null);
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [network, setNetwork] = useState<string>("Polygon Testnet Amoy");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
          setLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(getErrorMessage(error));
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [keyban.client]);

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNetwork(event.target.value);
  };

  const handleShareAddressClick = () => {
    navigate(`/qr-code?address=${account?.address}`);
  };

  if (loading) {
    return (
      <div className="loading">
        <FontAwesomeIcon icon={faSpinner} spin />
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="wallet-dashboard">
      <div className="header">
        <span>Keyban WAAS Demo</span>
        <span className="notification">
          <FontAwesomeIcon icon={faBell} />
        </span>
      </div>
      <div className="section">
        <div>
          Account:{" "}
          <span className="account">{account?.keyId || "No account"}</span>
        </div>
        <div>
          Address:{" "}
          <span className="address">
            {account?.address || "No address found"}
            <button
              type="button"
              onClick={() =>
                navigator.clipboard.writeText(account?.address || "")
              }
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </span>
        </div>
        <div>
          Network:
          <select value={network} onChange={handleNetworkChange}>
            <option value="Polygon Testnet Amoy">Polygon Testnet Amoy</option>
            <option value="Polygon Mainnet">Polygon Mainnet</option>
          </select>
        </div>
        <button type="button" onClick={handleShareAddressClick}>
          Share address
        </button>
      </div>
      <div className="section">
        <div>
          Native Balance:{" "}
          <span className="balance">
            {balance != null && <FormattedBalance balance={balance} />}
          </span>
        </div>
        <button
          type="button"
          onClick={() => alert("Send functionality coming soon!")}
        >
          Send
        </button>
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
