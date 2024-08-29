import type React from "react";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormattedBalance,
  useKeybanAccount,
  useKeybanAccountTokenBalances,
} from "@keyban/sdk-react";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

interface CryptoSectionProps {
  keyId: string;
  onSend: () => void;
}

const CryptoSection: React.FC<CryptoSectionProps> = ({ keyId, onSend }) => {
  const [account, accountError] = useKeybanAccount(keyId, { suspense: true });
  if (accountError) throw accountError;
  const [tokenBalances, tokenBalancesError] = useKeybanAccountTokenBalances(
    account,
    { suspense: true },
  );
  if (tokenBalancesError) throw tokenBalancesError;

  return (
    <Stack direction="column" spacing={2}>
      {tokenBalances.map((balance) => (
        <Card key={balance.token.address}>
          <CardContent>
            <Stack
              alignItems="center"
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="div">
                {balance.token.name}
              </Typography>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" component="div">
                  <FormattedBalance balance={balance} />
                </Typography>
                <IconButton
                  color="primary"
                  aria-label={`Send ${balance.token.symbol}`}
                  onClick={() => onSend()}
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </IconButton>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default CryptoSection;
