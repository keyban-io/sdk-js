import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  KeybanProvider,
  KeybanSigner,
  useKeyban,
  KeybanLocalStorage,
} from '@keyban/sdk-react';
import type { KeybanAccount } from '@keyban/sdk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { getErrorMessage } from '@/utils/errorUtils';
import { fetchMaticToEuroRate } from '@/utils/apiUtils';
import Loading from '@/components/Loading';
import CustomError from '@/components/CustomError';
import './WalletDashboard.css';
import TransactionList from '../../components/TransactionList/TransactionList';
import AccountInfo from '../../components/AccountInfo/AccountInfo';
import NetworkSelector from '../../components/NetworkSelector/NetworkSelector';
import BalanceInfo from '../../components/BalanceInfo/BalanceInfo';
import NFTSection from '../../components/NFTSection/NFTSection';
import CryptoSection from '../../components/CryptoSection/CryptoSection';

interface Transaction {
  id: string;
  date: string;
  type: string;
  crypto: string;
  toFrom: string;
  amount: string;
  status: string;
}

const WalletDashboardContent: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-07-21',
      type: 'Sent',
      crypto: 'Non-Native',
      toFrom: '0x...',
      amount: '5 DAI',
      status: 'Sent',
    },
    {
      id: '2',
      date: '2024-07-20',
      type: 'Pending',
      crypto: 'Native',
      toFrom: '0x...',
      amount: '0.1 MATIC',
      status: 'Pending',
    },
    {
      id: '3',
      date: '2024-07-20',
      type: 'Received',
      crypto: 'NFT',
      toFrom: '0x...',
      amount: 'Cool Art 1',
      status: 'Received',
    },
    {
      id: '4',
      date: '2024-07-19',
      type: 'Received',
      crypto: 'Non-Native',
      toFrom: '0x...',
      amount: '0.5 ETH',
      status: 'Received',
    },
  ];
  const keyban = useKeyban();
  const navigate = useNavigate();
  const [account, setAccount] = useState<KeybanAccount | null>(null);
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [network, setNetwork] = useState<string>('Polygon Testnet Amoy');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hintVisible, setHintVisible] = useState<boolean>(false);
  const [hintPosition, setHintPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [euroBalance, setEuroBalance] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [account, rate] = await Promise.all([
          keyban.client.initialize('my-ecdsa-key-id').then((account) => {
            setAccount(account);
            return account.getBalance();
          }),
          fetchMaticToEuroRate().catch(setEuroBalance.bind(null, 0)),
        ]);

        if (isMounted) {
          const balanceInEuro = (Number(account) / 1e18) * rate;
          setBalance(account);
          setEuroBalance(balanceInEuro);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(getErrorMessage(error));
          setLoading(false);
        }
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
      <AccountInfo
        account={account}
        onCopyClick={handleCopyClick}
        onShareClick={handleShareAddressClick}
      />
      <NetworkSelector
        network={network}
        onNetworkChange={handleNetworkChange}
      />
      <BalanceInfo balance={balance} euroBalance={euroBalance} />
      <button
        type="button"
        onClick={() => alert('Send functionality coming soon!')}
      >
        Send
        <FontAwesomeIcon className="fa" icon={faPaperPlane} />
      </button>
      <NFTSection />
      <CryptoSection />
      <TransactionList transactions={transactions} />
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
