import type React from "react";

import { useNavigate } from "react-router-dom"; // Ajout pour la navigation

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FormattedBalance,
  type KeybanTokenBalance,
  useKeybanAccount,
  useKeybanAccountTokenBalances,
} from "@keyban/sdk-react";
import {
  Alert,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const TokensSection: React.FC = () => {
  const navigate = useNavigate(); // Hook de navigation

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [tokenBalances, tokenBalancesError] =
    useKeybanAccountTokenBalances(account);
  if (tokenBalancesError) throw tokenBalancesError;

  const handleSend = ({ token }: KeybanTokenBalance) => {
    navigate("/transfer-erc20", {
      state: { contractAddress: token.address },
    });
  };

  return (
    <Stack direction="column" spacing={2}>
      {/* Afficher un message si aucun token n'est présent */}
      {tokenBalances.length === 0 ? (
        <Alert severity="info">
          <Typography variant="h6" component="div">
            No tokens available in this account.
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
                  {balance.token.name
                    ? balance.token.name
                    : balance.token.address}
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
                    onClick={() => handleSend(balance)} // Appelle la fonction avec l'adresse du token
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
