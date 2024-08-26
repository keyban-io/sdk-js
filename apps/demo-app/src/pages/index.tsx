import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useKeybanAccount, useKeybanAccountBalance } from "@keyban/sdk-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { fetchMaticToEuroRate } from "@/utils/apiUtils";
import Loading from "@/components/Loading";
import styled from "@emotion/styled";
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
  testNetworks,
  testEnvs,
  testCryptos,
} from "../lib/testData";
import Modal from "@/components/Modal";
import { useErrorBoundary } from "react-error-boundary";
import { Stack, Typography, IconButton, Button } from "@mui/material";

const CopyHint = styled.div`
  position: absolute;
  background-color: var(--primary);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8em;
`;

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
  const [hintVisible, setHintVisible] = useState<boolean>(false);
  const [hintPosition, setHintPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [maticToEuroRate, setMaticToEuroRate] = useState<number>(0);

  const [selectedNetworkId, setSelectedNetworkId] = useState(
    testNetworks[0].id,
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

  const handleSelectNetwork = (networkId: string) => {
    setSelectedNetworkId(networkId);
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

  const handleRenameKeyId = (newKeyId: string) => {
    if (account) {
      console.warn(`Renaming Key ID ${newKeyId} is not implemented.`);
    }
  };

  if (loading) {
    return <Loading />;
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
        <AccountInfo
          account={account}
          onCopyClick={handleCopyClick}
          onShareClick={handleShareAddressClick}
          onRenameKeyId={handleRenameKeyId}
        />
        <NetworkSelector
          networks={testNetworks}
          selectedNetworkId={selectedNetworkId}
          onSelectNetwork={handleSelectNetwork}
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
        {hintVisible && (
          <CopyHint
            style={{ top: hintPosition.y - 20, left: hintPosition.x + 10 }}
          >
            Copied!
          </CopyHint>
        )}
      </Stack>

      <Modal show={showModal} onClose={handleCloseModal} title="Send Crypto">
        <p>Send functionality coming soon!</p>
      </Modal>
    </Stack>
  );
};

export default WalletDashboardContent;
