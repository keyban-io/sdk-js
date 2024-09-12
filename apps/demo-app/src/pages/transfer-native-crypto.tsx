import type React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import TransferAlert from '@/components/TransferAlert';
import { useDebounce } from '@/hooks/useDebounce';
import { useTransferReducer } from '@/hooks/useTransferReducer';
import type { Address } from '@keyban/sdk-react';
import {
  formatBalance,
  useKeybanAccount,
  useKeybanAccountBalance,
  useKeybanClient,
} from '@keyban/sdk-react';
import {
  Alert,
  Button,
  CircularProgress,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const TransferNativeCrypto: React.FC = () => {
  const { state: locationState } = useLocation();
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

  const client = useKeybanClient();
  const [account, accountError] = useKeybanAccount(locationState?.keyId, {
    suspense: true,
  });
  if (accountError) throw accountError;

  const [balance, balanceError] = useKeybanAccountBalance(account, {
    suspense: true,
  });
  if (balanceError) throw balanceError;

  useEffect(() => {
    const estimateFeesAsync = async () => {
      if (!debouncedAmount || !debouncedRecipient) {
        dispatch({ type: "FEE_ESTIMATION_FAIL", payload: "" });
        return;
      }

      dispatch({ type: "START_FEE_ESTIMATION" });
      try {
        const valueInWei = BigInt(
          Number(debouncedAmount) * 10 ** client.nativeCurrency.decimals,
        );
        const estimation =
          account &&
          (await account.estimateTransfer(
            debouncedRecipient as Address,
            valueInWei,
          ));
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
  }, [debouncedAmount, debouncedRecipient, account, client, dispatch]);

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
        Account ID: {account.keyId}
        <br />
        Balance: {formatBalance(client, balance)}
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
        client={client}
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
                href={`https://blockscout.keyban.localtest.me/tx/${txHash}`}
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

export default TransferNativeCrypto;
