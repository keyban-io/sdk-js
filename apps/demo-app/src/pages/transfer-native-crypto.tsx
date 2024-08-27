import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {
  useKeybanAccount,
  useKeybanAccountBalance,
  useKeybanClient,
  formatBalance,
} from "@keyban/sdk-react";
import type { Address } from "@keyban/sdk-react";
import {
  Stack,
  Typography,
  IconButton,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import { green } from "@mui/material/colors";

const TransferNativeCrypto: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, setLoading] = useState(true);
  const [isTransferring, setIsTransferring] = useState(false);

  const buttonSx = {
    ...(transactionHash && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
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

  const handleTransfer = async () => {
    setError(null);
    setTransactionHash(null);
    setIsTransferring(true);

    try {
      const valueInWei = BigInt(Number(amount) * 10 ** 18);
      console.log("recipient", recipient);
      console.log("valueInWei", valueInWei);
      const txHash = await account.transfer(recipient as Address, valueInWei);
      console.log("txHash", txHash);
      setTransactionHash(txHash);
    } catch (err) {
      setError(`Transfer failed: ${(err as Error).message}`);
    } finally {
      setIsTransferring(false);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

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
          onChange={(e) => setRecipient(e.target.value)}
          defaultValue={`${account.address}
Account ID:${account.keyId}
Balance: ${formatBalance(client, balance)}`}
        />
        <TextField
          id="recipient-address"
          type="number"
          label="You will send (POL)"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
        />
        <TextField
          id="recipient-address"
          label="To this Address"
          placeholder="0xRecipientAddress"
          onChange={(e) => setRecipient(e.target.value)}
          defaultValue={recipient}
        />
        <Button
          variant="contained"
          onClick={handleTransfer}
          disabled={!!(isTransferring || error || transactionHash)}
          sx={buttonSx}
        >
          Send POL
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
              href={`https://amoy.polygonscan.com/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {transactionHash}
            </Link>
          </Alert>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" onClick={handleBackClick}>
          Back to Dashboard
        </Button>
      </Stack>
    </Stack>
  );
};

export default TransferNativeCrypto;
