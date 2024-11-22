import type React from "react";

import {
  FormattedBalance,
  type KeybanTokenBalance,
  useKeybanClient,
} from "@keyban/sdk-react";
import {
  Alert,
  CircularProgress,
  Typography,
} from "@mui/material";

interface TransferAlertProps {
  isEstimatingFees: boolean;
  amount: string | null;
  recipient: string;
  rawMaxFees: string | null;
  tokenBalance?: KeybanTokenBalance; // Optional for ERC-20 tokens
}

const TransferAlert: React.FC<TransferAlertProps> = ({
  isEstimatingFees,
  amount,
  recipient,
  rawMaxFees,
  tokenBalance,
}) => {
  const client = useKeybanClient();

  if (isEstimatingFees) {
    return <CircularProgress size={24} />;
  }

  // Si amount ou recipient ou maxFees est manquant, on retourne null
  if (!amount || !recipient || !rawMaxFees) {
    return null;
  }

  try {
    const decimals = tokenBalance? tokenBalance.token?.decimals?? 0 : client.nativeCurrency.decimals;

    // Conversion du montant et des frais en bigint
    const amountInBigInt = BigInt(Number(amount) * 10 ** decimals);
    const feesInBigInt = BigInt(rawMaxFees);

    // Calcul du total (montant + frais)
    const total = amountInBigInt + feesInBigInt;

    return (
      <Alert severity="info">
        {tokenBalance ? (
          <>
            <Typography>
              You are about to send{" "}
              <FormattedBalance
                balance={{
                  raw: amountInBigInt,
                }}
                token={tokenBalance.token?? undefined}

              />{" "}
              to {recipient}.
            </Typography>
            <Typography>
              Maximum estimated transaction fees:{" "}
              <FormattedBalance balance={{raw: rawMaxFees, isFees: true}} />.
            </Typography>
          </>
        ) : (
          <>
            <Typography>
              You are about to send{" "}
              <FormattedBalance balance={{raw: amountInBigInt, isNative: true}} /> to {recipient}.
            </Typography>
            <Typography>
              Maximum estimated transaction fees:{" "}
              <FormattedBalance balance={{raw: rawMaxFees, isFees: true}} />.
            </Typography>
            <Typography>
              Total (including fees): <FormattedBalance balance={{raw: total, isNative: true}} />.
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
