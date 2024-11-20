// src/pages/index.tsx

import type React from "react";
import { useEffect, useState } from "react";

import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import { fetchCryptoToEuroRate } from "@/utils/apiUtils";
import {
  faCoins,
  faCube,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

interface CryptoToEuroRate {
  [symbol: string]: number;
}

const WalletDashboardContent: React.FC = () => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [balance, balanceError] = useKeybanAccountBalance(account);
  if (balanceError) throw balanceError;

  const client = useKeybanClient();

  const [loading, setLoading] = useState<boolean>(true);
  const [cryptoToEuroRate, setCryptoToEuroRate] = useState<CryptoToEuroRate>(
    {},
  );

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const rate = await fetchCryptoToEuroRate(client.nativeCurrency.symbol);
        setCryptoToEuroRate((prevRates) => ({
          ...prevRates,
          [client.nativeCurrency.symbol]: rate,
        }));
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("No mapping found")
        ) {
          console.error(
            `No mapping found for symbol: ${client.nativeCurrency.symbol}`,
          );
        } else if (
          error instanceof Error &&
          error.message.includes("API request failed")
        ) {
          console.error(
            `Failed to fetch ${client.nativeCurrency.symbol} to Euro rate: ${error.message}`,
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [client.nativeCurrency.symbol]);

  const handleTransferCrypto = () => {
    navigate("/transfer-native-crypto");
  };

  const handleViewTransfers = () => {
    navigate("/transfers");
  };

  const handleViewTokens = () => {
    navigate("/tokens");
  };

  const handleViewNfts = () => {
    navigate("/nfts");
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

  // Vérifier si le taux de conversion est disponible
  const euroBalance =
    cryptoToEuroRate[client.nativeCurrency.symbol] &&
    (Number(balance.raw) / 10 ** balance.decimals) *
      cryptoToEuroRate[client.nativeCurrency.symbol];

  return (
    <>
      <Stack spacing={2}>
        <AccountInfo />
        <BalanceInfo
          balance={balance}
          euroBalance={euroBalance}
          onSend={handleTransferCrypto}
        />
        <Divider />
        <Typography variant="h6" color="primary">
          <FontAwesomeIcon icon={faCoins} style={{ marginRight: "8px" }} />
          Tokens with Recent Transactions
        </Typography>
        <TokensSection pageSize={5} disableInfiniteScroll />
        <Button variant="contained" onClick={handleViewTokens}>
          View all Tokens...
        </Button>
        <Divider />
        <Typography variant="h6" color="primary">
          <FontAwesomeIcon icon={faCube} style={{ marginRight: "8px" }} />
          NFTs with Recent Transactions
        </Typography>
        <NFTSection pageSize={5} disableInfiniteScroll />
        <Button variant="contained" onClick={handleViewNfts}>
          View all NFTs...
        </Button>
        <Divider />
        <Typography variant="h6" color="primary">
          <FontAwesomeIcon
            icon={faMoneyBillTransfer}
            style={{ marginRight: "8px" }}
          />
          Latest Transfers
        </Typography>
        <TransferList pageSize={5} disableInfiniteScroll />
        <Button variant="contained" onClick={handleViewTransfers}>
          View all Transfers...
        </Button>
      </Stack>
    </>
  );
};

export default WalletDashboardContent;
