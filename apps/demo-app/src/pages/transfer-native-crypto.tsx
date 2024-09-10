import type React from 'react';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const TransferNativeCrypto: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, setLoading] = useState(true);
  const [isTransferring, setIsTransferring] = useState(false);
  const [feeEstimate, setFeeEstimate] = useState<string | null>(null);
  const [isEstimatingFees, setIsEstimatingFees] = useState(false);

  const debouncedAmount = useDebounce(amount, 300);
  const debouncedRecipient = useDebounce(recipient, 300);

  const buttonSx = {
    ...(transactionHash && {
      bgcolor: theme.palette.success.main,
      "&:hover": {
        bgcolor: theme.palette.success.dark,
      },
    }),
  };

  const [account, accountError] = useKeybanAccount(state?.keyId, {
    suspense: true,
  });
  if (accountError) throw accountError;

  const [balance, balanceError] = useKeybanAccountBalance(account, {
    suspense: true,
  });
  if (balanceError) throw balanceError;
  const client = useKeybanClient();

  useEffect(() => {
    if (account) {
      setLoading(false);
    }
  }, [account]);

  const estimateFees = useCallback(
    async (recipient: Address, amount: string) => {
      if (!amount || !recipient) {
        setFeeEstimate(null);
        return;
      }
      setIsEstimatingFees(true);
      try {
        const valueInWei = BigInt(Number(amount) * 10 ** 18);
        const estimation = await account.estimateTransfer(
          recipient,
          valueInWei,
        );
        setFeeEstimate(`${formatBalance(client, estimation.maxFees)}`);
      } catch (err) {
        console.error("Failed to estimate fees", err);
        setFeeEstimate(null);
      } finally {
        setIsEstimatingFees(false);
      }
    },
    [account, client],
  );

  useEffect(() => {
    if (debouncedAmount && debouncedRecipient) {
      estimateFees(debouncedRecipient as Address, debouncedAmount);
    }
  }, [debouncedAmount, debouncedRecipient, estimateFees]);

  const handleTransfer = async () => {
    setError(null);
    setTransactionHash(null);

    setIsTransferring(true);

    try {
      const valueInWei = BigInt(Number(amount) * 10 ** 18);
      const txHash = await account.transfer(recipient as Address, valueInWei);
      setTransactionHash(txHash);
      setRecipient("");
      setAmount("");
    } catch (err) {
      setError(`Transfer failed: ${(err as Error).message}`);
    } finally {
      setIsTransferring(false);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  // Ensure hooks are called consistently
  const formattedAmount = useFormattedBalance(
    amount ? BigInt(Math.floor(Number(amount) * 10 ** 18)) : BigInt(0),
  );
  const feeEstimateFormatted = feeEstimate ? Number.parseFloat(feeEstimate) : 0;

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Keyban WAAS Demo</Typography>
        <IconButton color="primary">
          <FontAwesomeIcon icon={faBell} />
        </IconButton>
      </Stack>
      <Stack spacing={2}>
        <TextField
          disabled
          multiline
          maxRows={3}
          id="from-address"
          label="From this address"
          defaultValue={`${account.address}
Account ID:${account.keyId}
Balance: ${formatBalance(client, balance)}`}
        />
        <TextField
          id="amount"
          type="number"
          label={`You will send ${client.nativeCurrency.symbol}`}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
        />
        <TextField
          id="recipient-address"
          label="To this Address"
          placeholder="0xRecipientAddress"
          onChange={(e) => setRecipient(e.target.value)}
          value={recipient}
        />
        {isEstimatingFees ? (
          <CircularProgress size={24} />
        ) : (
          amount &&
          recipient &&
          feeEstimate && (
            <Alert severity="info">
              <Typography>
                You are about to send {formattedAmount} to {recipient}.
              </Typography>
              <Typography>
                Maximum estimated transaction fees: {feeEstimate}.
              </Typography>
              <Typography>
                Total amount (including fees):{" "}
                {Number.parseFloat(amount) + feeEstimateFormatted}{" "}
                {client.nativeCurrency.symbol}
              </Typography>
            </Alert>
          )
        )}

        <Button
          variant="contained"
          onClick={handleTransfer}
          disabled={isTransferring || !amount || !recipient || !!error}
          sx={buttonSx}
        >
          {isTransferring ? "Transferring..." : "Send"}
          {isTransferring && (
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
          )}
        </Button>

        {transactionHash && (
          <Alert severity="success">
            Transaction successful! Hash:{" "}
            <Link
              underline="always"
              href={`https://blockscout.keyban.localtest.me/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {transactionHash}
            </Link>
          </Alert>
        )}

        {error && (
          <Alert severity="error">
            <Typography>{error}</Typography>
          </Alert>
        )}
        <Button variant="contained" onClick={handleBackClick}>
          Back to Dashboard
        </Button>
      </Stack>
    </Stack>
  );
};

export default TransferNativeCrypto;
