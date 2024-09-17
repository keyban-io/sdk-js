import type React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import { useErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

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
  Typography,
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

  if (loading) {
    return (
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Stack>
    );
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
        <TokensSection keyId={keyId} />
        <Divider />
        <NFTSection nfts={testNFTs} />
        <Divider />
        <TransactionList transactions={testTransactions} />
        <Button variant="contained">Transaction History</Button>
      </Stack>
    </>
  );
};

export default WalletDashboardContent;
