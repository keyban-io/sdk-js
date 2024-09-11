import type React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import Modal from '@/components/Modal';
import { fetchMaticToEuroRate } from '@/utils/apiUtils';
import {
  useKeybanAccount,
  useKeybanAccountBalance,
} from '@keyban/sdk-react';
import {
  Button,
  CircularProgress,
  Divider,
  Stack,
} from '@mui/material';

import AccountInfo from '../components/AccountInfo';
import BalanceInfo from '../components/BalanceInfo';
import NFTSection from '../components/NFTSection';
import TokensSection from '../components/TokensSection';
import TransactionList from '../components/TransactionList';
import {
  testNFTs,
  testTransactions,
} from '../lib/testData';

const keyId = "my-ecdsa-key";

const WalletDashboardContent: React.FC = () => {
  const navigate = useNavigate();

  const [account, accountError] = useKeybanAccount(keyId, { suspense: true });
  if (accountError) throw accountError;

  const [balance, balanceError, { refresh: refreshBalance }] =
    useKeybanAccountBalance(account, { suspense: true });
  if (balanceError) throw balanceError;

  const [loading, setLoading] = useState<boolean>(true);
  const { showBoundary } = useErrorBoundary();

  const [maticToEuroRate, setMaticToEuroRate] = useState<number>(0);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMaticToEuroRate()
      .then(setMaticToEuroRate)
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          console.error("Failed to fetch Matic to Euro rate");
        } else showBoundary(error);
      })
      .finally(() => setLoading(false));
  }, [showBoundary]);

  const handleTransferCrypto = () => {
    if (account?.keyId) {
      navigate("/transfer-native-crypto", { state: { keyId: account.keyId } });
    } else {
      console.error("Key ID not found on account");
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Stack spacing={2}>
        <AccountInfo keyId={keyId} />
        <BalanceInfo
          balance={balance}
          euroBalance={(Number(balance) / 1e18) * maticToEuroRate}
          onSend={handleTransferCrypto}
          onRefreshBalance={refreshBalance}
        />{" "}
        <Divider />
        <TokensSection keyId={keyId} onSend={handleOpenModal} />
        <Divider />
        <NFTSection nfts={testNFTs} />
        <Divider />
        <TransactionList transactions={testTransactions} />
        <Button variant="contained">Transaction History</Button>
      </Stack>

      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title="Send non native crypto"
      >
        <p>Send functionality coming soon!</p>
      </Modal>
    </>
  );
};

export default WalletDashboardContent;
