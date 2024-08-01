// src/pages/WalletDashboard.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  KeybanProvider,
  KeybanSigner,
  useKeyban,
  KeybanLocalStorage,
  FormattedBalance,
} from "@keyban/sdk-react";
import type { KeybanAccount } from "@keyban/sdk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCopy,
  faQrcode,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { getErrorMessage } from "@/utils/errorUtils";
import { fetchMaticToEuroRate } from "@/utils/apiUtils";
import { formatEthereumAddress } from "@/utils/formatEthereumAddress";
import Loading from "@/components/Loading";
import CustomError from "@/components/CustomError";
import "./WalletDashboard.css";

const WalletDashboardContent: React.FC = () => {
  const keyban = useKeyban();
  const navigate = useNavigate();
  const [account, setAccount] = useState<KeybanAccount | null>(null);
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [network, setNetwork] = useState<string>("Polygon Testnet Amoy");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hintVisible, setHintVisible] = useState<boolean>(false);
  const [hintPosition, setHintPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [euroBalance, setEuroBalance] = useState<number | null>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [account, rate] = await Promise.all([
          keyban.client.initialize("my-ecdsa-key-id").then((account) => {
            setAccount(account);
            return account.getBalance();
          }),
          fetchMaticToEuroRate().catch(setEuroBalance.bind(null, null)),
        ]);

        if (isMounted) {
          const balanceInEuro = (Number(account) / 1e18) * rate;
          setBalance(account);
          setEuroBalance(balanceInEuro);
          setLoading(false);
        }
      } catch (error) {
        setError(getErrorMessage(error));
        setLoading(false);
      }
    };

    fetchData();

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

  const handleCopyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      const buttonRect = event.currentTarget.getBoundingClientRect();
      setHintPosition({ x: buttonRect.right, y: buttonRect.top });
      setHintVisible(true);
      setTimeout(() => {
        setHintVisible(false);
      }, 2000); // Hint will disappear after 2 seconds
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <CustomError message={error} />;
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
        <div className="account-address-container">
          <div className="account">{account?.keyId || "No account"}</div>
          <span className="account-address">
            {account
              ? formatEthereumAddress(account.address)
              : "No address found"}
          </span>
          <button
            type="button"
            onClick={handleCopyClick}
            ref={copyButtonRef}
            className="copy-button"
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>
        <div className="network-select">
          <label htmlFor="network">Network:</label>
          <select id="network" value={network} onChange={handleNetworkChange}>
            <option value="Polygon Testnet Amoy">Polygon Testnet Amoy</option>
            <option value="Polygon Mainnet">Polygon Mainnet</option>
          </select>
        </div>
        <button type="button" onClick={handleShareAddressClick}>
          Share address
          <FontAwesomeIcon className="fa" icon={faQrcode} />
        </button>
      </div>
      <div className="section">
        <div className="balance-container">
          <span className="balance">
            {balance != null && <FormattedBalance balance={balance} />}
          </span>
          <span className="euro-balance">
            {euroBalance != null && <span>€{euroBalance.toFixed(2)}</span>}
          </span>
        </div>
        <button
          type="button"
          onClick={() => alert("Send functionality coming soon!")}
        >
          Send
          <FontAwesomeIcon className="fa" icon={faPaperPlane} />
        </button>
      </div>
      <div className="section">
        <div>NFTs (Total: 5)</div>
        <button type="button">View NFTs</button>
      </div>
      <div className="section">
        <div>Non-Native Cryptocurrencies</div>
        <div className="crypto">
          - AAVE: 0.005{" "}
          <button type="button">
            Send <FontAwesomeIcon className="fa" icon={faPaperPlane} />
          </button>
        </div>
        <div className="crypto">
          - LINK: 0.2{" "}
          <button type="button">
            Send <FontAwesomeIcon className="fa" icon={faPaperPlane} />
          </button>
        </div>
        <button type="button">View All</button>
      </div>
      <button type="button">Transaction History</button>
      {hintVisible && (
        <div
          className="copy-hint"
          style={{ top: hintPosition.y - 20, left: hintPosition.x + 10 }}
        >
          Copied!
        </div>
      )}
    </div>
  );
};

const WalletDashboard: React.FC = () => (
  <KeybanProvider signer={KeybanSigner.ECDSA} storage={KeybanLocalStorage}>
    <WalletDashboardContent />
  </KeybanProvider>
);

export default WalletDashboard;
