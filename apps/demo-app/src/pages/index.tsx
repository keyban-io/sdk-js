import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  KeybanChain,
  useKeybanAccount,
  useKeybanAccountBalance,
} from "@keyban/sdk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { fetchMaticToEuroRate } from "@/utils/apiUtils";
import TransactionList from "../components/TransactionList";
import AccountInfo from "../components/AccountInfo";
import NetworkSelector from "../components/NetworkSelector";
import EnvSelector from "../components/EnvSelector";
import BalanceInfo from "../components/BalanceInfo";
import NFTSection from "../components/NFTSection";
import CryptoSection from "../components/CryptoSection";

import {
  testNFTs,
  testTransactions,
  testEnvs,
  testCryptos,
} from "../lib/testData";
import Modal from "@/components/Modal";
import { useErrorBoundary } from "react-error-boundary";
import {
  Stack,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";

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

  const [selectedChainId, setSelectedChainId] = useState(
    KeybanChain.polygonAmoy,
  );
  const [selectedEnvId, setSelectedEnvId] = useState(testEnvs[0].id);
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

  const handleSelectChain = (chainId: KeybanChain) => {
    setSelectedChainId(chainId);
  };

  const handleSelectEnv = (envId: string) => {
    setSelectedEnvId(envId);
  };

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
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Keyban WAAS Demo</Typography>
        <IconButton color="primary">
          <FontAwesomeIcon icon={faBell} />
        </IconButton>
      </Stack>
      <Stack spacing={2}>
        <AccountInfo keyId={keyId} />
        <NetworkSelector
          selectedChainId={selectedChainId}
          onSelectChain={handleSelectChain}
        />
        <EnvSelector
          envs={testEnvs}
          selectedEnvId={selectedEnvId}
          onSelectEnv={handleSelectEnv}
        />
        <BalanceInfo
          balance={balance}
          euroBalance={(Number(balance) / 1e18) * maticToEuroRate}
          onSend={handleTransferCrypto}
          onRefreshBalance={refreshBalance}
        />
        <NFTSection nfts={testNFTs} />
        <CryptoSection cryptos={testCryptos} onSend={handleOpenModal} />
        <TransactionList transactions={testTransactions} />
        <Button variant="contained">Transaction History</Button>
      </Stack>

      <Modal show={showModal} onClose={handleCloseModal} title="Send Crypto">
        <p>Send functionality coming soon!</p>
      </Modal>
    </Stack>
  );
};

export default WalletDashboardContent;
