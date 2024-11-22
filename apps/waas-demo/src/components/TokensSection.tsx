import type React from "react";
import {
  useEffect,
  useRef,
} from "react";

import { useNavigate } from "react-router-dom";

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
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

interface TokensSectionProps {
  pageSize?: number;
  disableInfiniteScroll?: boolean;
}

const TokensSection: React.FC<TokensSectionProps> = ({
  pageSize = 20,
  disableInfiniteScroll = false,
}) => {
  const navigate = useNavigate();

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const observer = useRef<IntersectionObserver | null>(null);
  const lastTokenRef = useRef<HTMLLIElement | null>(null);

  const [tokenBalances, tokenBalancesError, { fetchMore, loading }] =
    useKeybanAccountTokenBalances(account, { first: pageSize });
  if (tokenBalancesError) throw tokenBalancesError;

  const hasNextPage = tokenBalances?.pageInfo.hasNextPage ?? false;

  useEffect(() => {
    if (disableInfiniteScroll || loading) return;

    const loadMoreTokens = async () => {
      if (hasNextPage && !loading) {
        await fetchMore();
        // `tokenBalances` will be updated automatically
      }
    };

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreTokens();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    if (lastTokenRef.current) {
      observer.current.observe(lastTokenRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [fetchMore, hasNextPage, loading, disableInfiniteScroll]);

  const handleSend = ({ token }: KeybanTokenBalance) => {
    navigate("/transfer-erc20", {
      state: { contractAddress: token?.id },
    });
  };

  const tokens =
    tokenBalances?.edges
      .map((edge) => edge.node)
      .filter(
        (node): node is KeybanTokenBalance =>
          node !== null && node.token !== null,
      ) ?? [];

  return (
    <Stack direction="column" spacing={2}>
      {/* Display a message if no tokens are present */}
      {!tokens.length ? (
        <Alert severity="info">
          <Typography variant="h6" component="div">
            No tokens available in this account.
          </Typography>
        </Alert>
      ) : (
        <List>
          {tokens.map((tokenBalance, index) => {
            const isLastItem = index === tokens.length - 1;
            return (
              <ListItem
                key={tokenBalance.id}
                ref={!disableInfiniteScroll && isLastItem ? lastTokenRef : null}
                divider
                disableGutters
                sx={{
                  paddingY: 1,
                  transition: "background-color 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)", // Change la couleur de fond au survol
                    boxShadow: 3, // Ajoute une ombre pour l'emphase
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ paddingLeft: 2 }} // Ajoute un padding à gauche
                  >
                    {tokenBalance.token?.name
                      ? tokenBalance.token.name
                      : tokenBalance.token?.id}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1" component="div">
                      {/* Display the formatted balance */}
                      <FormattedBalance
                        balance={{raw: tokenBalance.balance}}
                        token={tokenBalance.token ?? undefined}
                      />
                    </Typography>
                    <IconButton
                      color="primary"
                      aria-label={`Send ${tokenBalance.token?.symbol}`}
                      onClick={() => handleSend(tokenBalance)}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </IconButton>
                  </Stack>
                </Stack>
              </ListItem>
            );
          })}
        </List>
      )}
    </Stack>
  );
};

export default TokensSection;
