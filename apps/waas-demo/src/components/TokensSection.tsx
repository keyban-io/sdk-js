import type React from "react";
import {
  useEffect,
  useRef,
  useState,
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

  const [tokens, setTokens] = useState<KeybanTokenBalance[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastTokenRef = useRef<HTMLDivElement | null>(null);

  const [tokenBalances, tokenBalancesError, { fetchMore, loading }] =
    useKeybanAccountTokenBalances(account, { first: pageSize });
  if (tokenBalancesError) throw tokenBalancesError;

  useEffect(() => {
    if (tokenBalances) {
      setHasNextPage(tokenBalances.pageInfo.hasNextPage);

      setTokens((prevTokens) => {
        const newTokens = tokenBalances.edges
          .map((edge) => edge.node)
          .filter(
            (node): node is KeybanTokenBalance =>
              node !== null && node.token !== null,
          );

        // Avoid duplicates by checking IDs
        const existingIds = new Set(prevTokens.map((t) => t.id));
        const combinedTokens = [
          ...prevTokens,
          ...newTokens.filter((t) => !existingIds.has(t.id)),
        ];

        return combinedTokens;
      });
    }
  }, [tokenBalances]);

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
                sx={{ paddingY: 1 }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ width: "100%" }}
                >
                  <Typography variant="h6" component="div">
                    {tokenBalance.token?.name
                      ? tokenBalance.token.name
                      : tokenBalance.token?.id}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1" component="div">
                      {/* Display the formatted balance */}
                      <FormattedBalance balance={tokenBalance.balance} token={tokenBalance.token?? undefined} />
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
