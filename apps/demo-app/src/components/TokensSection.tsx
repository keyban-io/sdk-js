import type React from 'react';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormattedBalance,
  useKeybanAccount,
  useKeybanAccountTokenBalances,
} from '@keyban/sdk-react';
import {
  Alert,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

interface TokensSectionProps {
  keyId: string;
  onSend: () => void;
}

const TokensSection: React.FC<TokensSectionProps> = ({ keyId, onSend }) => {
  const [account, accountError] = useKeybanAccount(keyId, { suspense: true });
  if (accountError) throw accountError;

  const [tokenBalances, tokenBalancesError] = useKeybanAccountTokenBalances(
    account,
    { suspense: true },
  );
  if (tokenBalancesError) throw tokenBalancesError;

  return (
    <Stack direction="column" spacing={2}>
      {/* Afficher un message si aucun token n'est présent */}
      {tokenBalances.length === 0 ? (
        <Alert severity="info">
          <Typography variant="h6" component="div">
            No tokens available in this account.
          </Typography>
          <Typography variant="body2">
            It looks like this account doesn't have any tokens.
          </Typography>
        </Alert>
      ) : (
        tokenBalances.map((balance) => (
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
        ))
      )}
    </Stack>
  );
};

export default TokensSection;
