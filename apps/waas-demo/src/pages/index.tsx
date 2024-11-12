import React from "react";

import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { fetchMaticToEuroRate } from "@/utils/apiUtils";
import {
  useKeybanAccount,
  useKeybanAccountBalance,
  useKeybanClient,
} from "@keyban/sdk-react";
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
import TransferList from "../components/TransferList";

const WalletDashboardContent: React.FC = () => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [balance, balanceError] = useKeybanAccountBalance(account);
  if (balanceError) throw balanceError;

  const client = useKeybanClient();

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
    navigate("/transfers");
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
          euroBalance={
            (Number(balance) / 10 ** client.nativeCurrency.decimals) *
            maticToEuroRate
          }
          onSend={handleTransferCrypto}
        />{" "}
        <Divider />
        <TokensSection />
        <Divider />
        <NFTSection />
        <Divider />
        <Typography variant="h6">Last Transfers</Typography>
        <TransferList pageSize={5} disableInfiniteScroll />
        <Button variant="contained" onClick={handleViewTransactions}>
          View all Transactions...
        </Button>
      </Stack>
    </>
  );
};

export default WalletDashboardContent;
