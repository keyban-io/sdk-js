import type React from 'react';

import {
  formatBalance,
  type KeybanClient,
  type KeybanTokenBalance,
} from '@keyban/sdk-react';
import {
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';

interface TransferAlertProps {
  client: KeybanClient;
  isEstimatingFees: boolean;
  amount: string | null;
  recipient: string;
  rawMaxFees: string | null;
  tokenBalance?: KeybanTokenBalance; // Optional for ERC-20 tokens
}

const TransferAlert: React.FC<TransferAlertProps> = ({
  client,
  isEstimatingFees,
  amount,
  recipient,
  rawMaxFees,
  tokenBalance,
}) => {
  if (isEstimatingFees) {
    return <CircularProgress size={24} />;
  }

  // Si amount ou recipient ou maxFees est manquant, on retourne null
  if (!amount || !recipient || !rawMaxFees) {
    return null;
  }

  try {
    const decimals = tokenBalance
      ? tokenBalance.token.decimals
      : client.nativeCurrency.decimals;

    // Conversion du montant et des frais en bigint
    const amountInBigInt = BigInt(Number(amount) * 10 ** decimals);
    const feesInBigInt = BigInt(Number(rawMaxFees));

    // Calcul du total (montant + frais)
    const total = amountInBigInt + feesInBigInt;

    return (
      <Alert severity="info">
        {tokenBalance ? (
          <>
            <Typography>
              You are about to send{" "}
              {formatBalance(client, {
                balance: amountInBigInt,
                token: tokenBalance.token,
              })}{" "}
              to {recipient}.
            </Typography>
            <Typography>
              Maximum estimated transaction fees:{" "}
              {formatBalance(client, feesInBigInt)}.
            </Typography>
          </>
        ) : (
          <>
            <Typography>
              You are about to send {formatBalance(client, amountInBigInt)} to{" "}
              {recipient}.
            </Typography>
            <Typography>
              Maximum estimated transaction fees:{" "}
              {formatBalance(client, feesInBigInt)}.
            </Typography>
            <Typography>
              Total (including fees): {formatBalance(client, total)}.
            </Typography>
          </>
        )}
      </Alert>
    );
  } catch (error) {
    console.error("Error calculating amounts or fees", error);
    return (
      <Alert severity="error">
        <Typography>
          There was an error calculating the transaction details. Please check
          the amounts.
        </Typography>
      </Alert>
    );
  }
};

export default TransferAlert;
