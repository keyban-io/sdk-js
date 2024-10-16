import React from "react";

import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { fetchMaticToEuroRate } from "@/utils/apiUtils";
import { useKeybanAccount, useKeybanAccountBalance } from "@keyban/sdk-react";
import {
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import AccountInfo from "../components/AccountInfo";
import BalanceInfo from "../components/BalanceInfo";
import NFTSection from "../components/NFTSection";
import TokensSection from "../components/TokensSection";
import TransactionList from "../components/TransactionList";
import { testTransactions } from "../lib/testData";

const WalletDashboardContent: React.FC = () => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [balance, balanceError, { refresh: refreshBalance }] =
    useKeybanAccountBalance(account);
  if (balanceError) throw balanceError;

  const [loading, setLoading] = React.useState<boolean>(true);
  const [maticToEuroRate, setMaticToEuroRate] = React.useState<number>(0);
  React.useEffect(() => {
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
    navigate("/transfer-native-crypto");
  };

  const handleViewTransactions = () => {
    navigate("/transactions");
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
        <AccountInfo />
        <BalanceInfo
          balance={balance}
          euroBalance={(Number(balance) / 1e18) * maticToEuroRate}
          onSend={handleTransferCrypto}
          onRefreshBalance={refreshBalance}
        />{" "}
        <Divider />
        <TokensSection />
        <Divider />
        <NFTSection />
        <Divider />
        <Typography variant="h6">Last Transactions</Typography>
        <TransactionList transactions={testTransactions} pageSize={5} />
        <Button variant="contained" onClick={handleViewTransactions}>
          View all Transactions...
        </Button>
      </Stack>
    </>
  );
};

export default WalletDashboardContent;
