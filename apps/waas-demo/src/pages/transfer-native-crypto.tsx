import type { Address } from "@keyban/sdk-react";
import {
  FormattedBalance,
  useKeybanAccount,
  useKeybanAccountBalance,
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
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TransferAlert from "~/components/TransferAlert";
import { useDebounce } from "~/hooks/useDebounce";
import { useTransferReducer } from "~/hooks/useTransferReducer";
import { getIndexerUrl } from "~/lib/getIndexerUrl"; // Import de la fonction

const TransferNativeCrypto: React.FC = () => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const debouncedRecipient = useDebounce(recipient, 300);

  const {
    state: transferState,
    dispatch,
    handleSuccess,
    resetForm,
    transactionHistory,
  } = useTransferReducer();

  const client = useKeybanClient();
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [balance, balanceError] = useKeybanAccountBalance(account);
  if (balanceError) throw balanceError;

  useEffect(() => {
    const estimateFeesAsync = async () => {
      if (!debouncedRecipient) {
        dispatch({ type: "FEE_ESTIMATION_FAIL", payload: "" });
        return;
      }

      dispatch({ type: "START_FEE_ESTIMATION" });
      try {
        const estimation =
          account &&
          (await account.estimateTransfer(debouncedRecipient as Address));
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
  }, [debouncedRecipient, account, dispatch]);

  const handleTransfer = async () => {
    dispatch({ type: "START_TRANSFER" });
    try {
      const valueInWei = BigInt(
        Number(amount) * 10 ** client.nativeCurrency.decimals,
      );
      const txHash = await account.transfer(
        debouncedRecipient as Address,
        valueInWei,
      );
      handleSuccess(txHash);
      resetForm();
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
        Balance: <FormattedBalance balance={{ raw: balance, isNative: true }} />
      </Typography>

      <TextField
        id="amount"
        type="number"
        label={`You will send ${client.nativeCurrency.symbol}`}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0"
        value={amount}
      />

      <TextField
        id="recipient-address"
        label="Recipient Address"
        placeholder="0xRecipientAddress"
        onChange={(e) => setRecipient(e.target.value)}
        value={recipient}
      />

      <TransferAlert
        isEstimatingFees={transferState.isEstimatingFees}
        amount={amount}
        recipient={recipient}
        rawMaxFees={transferState.feeEstimate}
      />

      <Button
        variant="contained"
        onClick={handleTransfer}
        disabled={transferState.isTransferring || !amount || !recipient}
      >
        {transferState.isTransferring ? (
          <>
            Transferring...{" "}
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
                href={getIndexerUrl(client.network, txHash)} // Utilisation dynamique de l'indexeur
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

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        color="secondary"
      >
        Back to Dashboard
      </Button>
    </Stack>
  );
};

export default TransferNativeCrypto;
