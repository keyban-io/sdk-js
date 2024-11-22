import type React from "react";
import { useEffect, useState } from "react";

import { type Location, useLocation, useNavigate } from "react-router-dom";

import TransferAlert from "@/components/TransferAlert";
import { useDebounce } from "@/hooks/useDebounce";
import { useTransferReducer } from "@/hooks/useTransferReducer";
import { getIndexerUrl } from "@/lib/getIndexerUrl";
import type { Address } from "@keyban/sdk-react";
import {
  FormattedBalance,
  useKeybanAccount,
  useKeybanAccountBalance,
  useKeybanAccountTokenBalances,
  useKeybanClient,
} from "@keyban/sdk-react";
import {
  Alert,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const TransferERC20: React.FC = () => {
  const location: Location<{ contractAddress: Address }> = useLocation();
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const debouncedAmount = useDebounce(amount, 300);
  const debouncedRecipient = useDebounce(recipient, 300);

  const {
    state: transferState,
    dispatch,
    handleSuccess,
    resetForm,
    transactionHistory,
  } = useTransferReducer();

  const keybanClient = useKeybanClient();

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [balance, balanceError] = useKeybanAccountBalance(account);
  if (balanceError) throw balanceError;

  const [tokenBalances, tokenBalancesError] =
    useKeybanAccountTokenBalances(account);
  if (tokenBalancesError) throw tokenBalancesError;

  const token = tokenBalances?.nodes.find(
    (node) => node?.token?.id === location.state.contractAddress,
  );

  useEffect(() => {
    const estimateFeesAsync = async () => {
      if (
        !debouncedAmount ||
        !debouncedRecipient ||
        !token ||
        !location.state.contractAddress ||
        !account
      )
        return;

      dispatch({ type: "START_FEE_ESTIMATION" });

      try {
        const valueInWei = BigInt(
          Number(debouncedAmount) * 10 ** (token.token?.decimals ?? 0),
        );
        const estimation = await account.estimateERC20Transfer({
          contractAddress: location.state.contractAddress as Address,
          to: debouncedRecipient as Address,
          value: valueInWei,
        });
        dispatch({
          type: "FEE_ESTIMATION_SUCCESS",
          payload: `${estimation.maxFees}`,
        });
      } catch (err) {
        dispatch({
          type: "FEE_ESTIMATION_FAIL",
          payload: `Failed to estimate fees: ${(err as Error).message}`,
        });
      }
    };

    estimateFeesAsync();

    // Ajout de toutes les dépendances
  }, [
    debouncedAmount,
    debouncedRecipient,
    token,
    account,
    dispatch,
    location.state.contractAddress,
  ]);

  const handleTransfer = async () => {
    dispatch({ type: "START_TRANSFER" });
    try {
      if (amount && account && token) {
        const value = BigInt(
          Number(amount) * 10 ** (token.token?.decimals ?? 0),
        );
        const txHash = await account.transferERC20({
          contractAddress: location.state.contractAddress as Address,
          to: recipient as Address,
          value: value,
        });
        handleSuccess(txHash);
        resetForm();
      }
    } catch (err) {
      dispatch({
        type: "TRANSFER_FAIL",
        payload: `Transfer failed: ${(err as Error).message}`,
      });
    }
  };

  return (
    <Stack spacing={2}>
      <Typography>
        From this address: {account.address}
        <br />
        {token?.token?.name} Balance:{" "}
        <FormattedBalance
          balance={{ raw: token?.balance ?? "0" }}
          token={token?.token ?? undefined}
        />
        <br />
        Native Balance (for the fees):{" "}
        <FormattedBalance balance={{ raw: balance, isNative: true }} />
      </Typography>

      <TextField
        id="amount"
        type="number"
        label={`You will send ${token?.token?.name}`}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0"
        value={amount}
      />

      <TextField
        id="recipient-address"
        label="To this Address"
        placeholder="0xRecipientAddress"
        onChange={(e) => setRecipient(e.target.value)}
        value={recipient}
      />

      {token && (
        <TransferAlert
          isEstimatingFees={transferState.isEstimatingFees}
          amount={amount}
          recipient={recipient}
          rawMaxFees={transferState.feeEstimate}
          tokenBalance={token}
        />
      )}

      <Button
        variant="contained"
        onClick={handleTransfer}
        disabled={transferState.isTransferring || !amount || !recipient}
      >
        {transferState.isTransferring ? (
          <>
            Transferring...
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          </>
        ) : (
          "Send"
        )}
      </Button>

      {transactionHistory.length > 0 && (
        <Alert severity="success">
          <Typography>Recent Transactions:</Typography>
          {transactionHistory.map((txHash, index) => (
            <Typography key={txHash}>
              Transaction {index + 1}:{" "}
              <Link
                underline="always"
                href={getIndexerUrl(keybanClient.chain, txHash)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {txHash}
              </Link>
            </Typography>
          ))}
        </Alert>
      )}

      {transferState.error && (
        <Alert severity="error">
          <Typography>{transferState.error}</Typography>
        </Alert>
      )}

      <Button variant="contained" onClick={() => navigate("/")}>
        Back to Dashboard
      </Button>
    </Stack>
  );
};

export default TransferERC20;
