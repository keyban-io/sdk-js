import type React from 'react';
import {
  useEffect,
  useReducer,
  useState,
} from 'react';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import type { Address } from '@keyban/sdk-react';
import {
  formatBalance,
  useFormattedBalance,
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

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value === debouncedValue) return;
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);

  return debouncedValue;
}

interface TransferState {
  isTransferring: boolean;
  isEstimatingFees: boolean;
  feeEstimate: string | null;
  transactionHash: string | null;
  error: string | null;
}

type TransferAction =
  | { type: "START_TRANSFER" }
  | { type: "TRANSFER_SUCCESS"; payload: string }
  | { type: "TRANSFER_FAIL"; payload: string }
  | { type: "START_FEE_ESTIMATION" }
  | { type: "FEE_ESTIMATION_SUCCESS"; payload: string }
  | { type: "FEE_ESTIMATION_FAIL"; payload: string }
  | { type: "RESET_FORM" };

function reducer(state: TransferState, action: TransferAction): TransferState {
  switch (action.type) {
    case "START_TRANSFER":
      return {
        ...state,
        isTransferring: true,
        error: null,
        transactionHash: null,
      };
    case "TRANSFER_SUCCESS":
      return {
        ...state,
        isTransferring: false,
        transactionHash: action.payload,
      };
    case "TRANSFER_FAIL":
      return { ...state, isTransferring: false, error: action.payload };
    case "START_FEE_ESTIMATION":
      return { ...state, isEstimatingFees: true };
    case "FEE_ESTIMATION_SUCCESS":
      return { ...state, isEstimatingFees: false, feeEstimate: action.payload };
    case "FEE_ESTIMATION_FAIL":
      return {
        ...state,
        isEstimatingFees: false,
        feeEstimate: null,
        error: action.payload,
      };
    case "RESET_FORM":
      return {
        ...state,
        isTransferring: false,
        isEstimatingFees: false,
        feeEstimate: null,
        error: null,
      };
    default:
      throw new Error();
  }
}

const initialState: TransferState = {
  isTransferring: false,
  isEstimatingFees: false,
  feeEstimate: null,
  transactionHash: null,
  error: null,
};

const TransferNativeCrypto: React.FC = () => {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const debouncedAmount = useDebounce(amount, 300);
  const debouncedRecipient = useDebounce(recipient, 300);

  const [account, accountError] = useKeybanAccount(locationState?.keyId, {
    suspense: true,
  });
  if (accountError) throw accountError;

  const [balance, balanceError] = useKeybanAccountBalance(account, {
    suspense: true,
  });
  if (balanceError) throw balanceError;

  const client = useKeybanClient();

  const [transferState, dispatch] = useReducer(reducer, initialState);
  const [transactionHistory, setTransactionHistory] = useState<string[]>([]); // Liste des transactions précédentes

  const formattedAmount = useFormattedBalance(
    BigInt(Math.floor(Number(amount) * 10 ** 18)),
  );

  useEffect(() => {
    const estimateFeesAsync = async () => {
      if (!debouncedAmount || !debouncedRecipient) {
        dispatch({ type: "FEE_ESTIMATION_FAIL", payload: "" });
        return;
      }
      dispatch({ type: "START_FEE_ESTIMATION" });
      try {
        const valueInWei = BigInt(Number(debouncedAmount) * 10 ** 18);
        const estimation =
          account &&
          (await account.estimateTransfer(
            debouncedRecipient as Address,
            valueInWei,
          ));
        dispatch({
          type: "FEE_ESTIMATION_SUCCESS",
          payload: `${formatBalance(client, estimation.maxFees)}`,
        });
      } catch (err) {
        dispatch({
          type: "FEE_ESTIMATION_FAIL",
          payload: `Failed to estimate fees: ${(err as Error).message}`,
        });
      }
    };

    estimateFeesAsync();
  }, [debouncedAmount, debouncedRecipient, account, client]);

  const handleTransfer = async () => {
    dispatch({ type: "START_TRANSFER" });
    try {
      const valueInWei = BigInt(Number(amount) * 10 ** 18);
      if (account) {
        const txHash = await account.transfer(recipient as Address, valueInWei);
        dispatch({ type: "TRANSFER_SUCCESS", payload: txHash });
        setTransactionHistory([...transactionHistory, txHash]); // Ajouter la transaction au tableau
      }
      // Réinitialise les champs de saisie après un transfert réussi
      setRecipient("");
      setAmount("");
      dispatch({ type: "RESET_FORM" });
    } catch (err) {
      dispatch({
        type: "TRANSFER_FAIL",
        payload: `Transfer failed: ${(err as Error).message}`,
      });
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const renderAlert = (formattedAmount: string) => {
    if (transferState.isEstimatingFees) {
      return <CircularProgress size={24} />;
    }

    if (amount && recipient && transferState.feeEstimate) {
      const feeEstimateFormatted = Number.parseFloat(transferState.feeEstimate);

      return (
        <Alert severity="info">
          <Typography>
            You are about to send {formattedAmount} to {recipient}.
          </Typography>
          <Typography>
            Maximum estimated transaction fees: {transferState.feeEstimate}.
          </Typography>
          <Typography>
            Total amount (including fees):{" "}
            {Number.parseFloat(amount) + feeEstimateFormatted}{" "}
            {client.nativeCurrency.symbol}
          </Typography>
        </Alert>
      );
    }

    return null;
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
        label="To this Address"
        placeholder="0xRecipientAddress"
        onChange={(e) => setRecipient(e.target.value)}
        value={recipient}
      />

      {renderAlert(formattedAmount)}

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

      {/* Affiche l'historique des transactions précédentes */}
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

      <Button variant="contained" onClick={handleBackClick}>
        Back to Dashboard
      </Button>
    </Stack>
  );
};

export default TransferNativeCrypto;
