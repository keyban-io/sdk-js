import {
  FormattedBalance,
  KeybanAssetTransfer,
  KeybanToken,
  useKeybanAccount,
  useKeybanAccountTransferHistory,
  useKeybanClient,
} from "@keyban/sdk-react";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { format, formatDistanceToNow } from "date-fns";
import type React from "react";
import { useEffect, useRef } from "react";

import { getIndexerUrl } from "../lib/getIndexerUrl";

interface TransferListProps {
  pageSize?: number;
  disableInfiniteScroll?: boolean;
}

const TransferList: React.FC<TransferListProps> = ({
  pageSize = 20,
  disableInfiniteScroll = false,
}) => {
  const theme = useTheme();
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const observer = useRef<IntersectionObserver | null>(null);
  const lastTransferRef = useRef<HTMLTableRowElement | null>(null);

  const client = useKeybanClient();

  const [transferHistory, transferHistoryError, { fetchMore, loading }] =
    useKeybanAccountTransferHistory(account, { first: pageSize });
  if (transferHistoryError) throw transferHistoryError;

  const hasNextPage = transferHistory.hasNextPage;

  useEffect(() => {
    const loadMoreTransfers = async () => {
      if (hasNextPage) {
        fetchMore?.();
        // `transferHistory` sera mis à jour automatiquement
      }
    };

    if (disableInfiniteScroll || loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          await loadMoreTransfers();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    if (lastTransferRef.current) {
      observer.current.observe(lastTransferRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [fetchMore, hasNextPage, loading, disableInfiniteScroll]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "sent - pending":
      case "received - pending":
        return theme.palette.warning.main;
      case "sent":
      case "received":
        return theme.palette.success.main;
      case "sent - failed":
      case "received - failed":
        return theme.palette.error.main;
      default:
        return theme.palette.text.primary;
    }
  };

  const formatHuman = (date: string) =>
    formatDistanceToNow(new Date(`${date}`), {
      includeSeconds: true,
      addSuffix: true,
    });

  const formatDate = (date: string) => format(new Date(date), "PPpp");

  const getStatus = (transfer: KeybanAssetTransfer) => {
    if (!account) return "Unknown";

    const { fromId, toId } = transfer;
    const accountAddress = account.address.toLowerCase();
    if (toId?.toLowerCase() === accountAddress) return "Received";
    if (fromId?.toLowerCase() === accountAddress) return "Sent";
    return "Unknown";
  };

  const getTxHash = (nftId: string | undefined) => {
    if (!nftId) return { txHash: "", rawTokenAddress: "", tokenId: "" };
    const [txHash, rawTokenAddress, tokenId] = nftId.split(":") || [];
    return { txHash: txHash ?? "", rawTokenAddress, tokenId };
  };

  const shortenAddress = (address: string, chars = 4) => {
    if (address.length <= chars * 2 + 2) {
      return address;
    }
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  };

  const getAssetType = (transfer: KeybanAssetTransfer) => {
    if (transfer?.type === "native") {
      return "Native";
    }
    if (transfer.type === "erc20") {
      return "Token";
    }
    if (transfer.type === "erc721" || transfer.type === "erc1155") {
      return "NFT";
    }

    return "Unknown";
  };

  const getCryptoDisplay = (transfer: KeybanAssetTransfer) => {
    if (transfer.type === "native") {
      return client.nativeCurrency.symbol;
    }
    if (transfer.type === "erc20") {
      return transfer?.token?.symbol ?? "erc20";
    }
    if (transfer.type === "erc721" || transfer.type === "erc1155") {
      return transfer.token?.name ?? transfer.type;
    }
    return transfer.type;
  };

  return (
    <Stack spacing={2}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Crypto</TableCell>
              <TableCell align="center">Asset Type</TableCell>
              <TableCell align="center">Transaction Fee</TableCell>
              <TableCell align="center">Transaction Hash</TableCell>
              <TableCell align="center">Gas Used</TableCell>
              <TableCell align="center">Gas Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transferHistory.nodes.map((transfer, index) => {
              const status = getStatus(transfer);
              const dateHuman = transfer?.transaction?.date
                ? formatHuman(transfer.transaction?.date)
                : "Unknown";
              const date = transfer?.transaction?.date
                ? formatDate(transfer.transaction?.date)
                : "Unknown";

              let indexerUrl = "";
              try {
                indexerUrl = getIndexerUrl(client.network, transfer.id ?? "");
              } catch (error) {
                console.error("Error generating indexer URL:", error);
              }

              const isLastItem = index === transferHistory.nodes.length - 1;

              return (
                <TableRow
                  key={transfer.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        "var(--table-row-hover-background-color)",
                    },
                  }}
                  ref={
                    !disableInfiniteScroll && isLastItem
                      ? lastTransferRef
                      : null
                  }
                >
                  <TableCell align="center">
                    <Tooltip title={date} arrow>
                      <Typography variant="body2" noWrap>
                        {dateHuman}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={transfer?.fromId} arrow>
                      <Typography variant="body2" noWrap>
                        {transfer?.fromId
                          ? shortenAddress(transfer.fromId)
                          : ""}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={transfer.toId ?? ""} arrow>
                      <Typography variant="body2" noWrap>
                        {transfer.toId ? shortenAddress(transfer.toId) : ""}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      style={{ color: getStatusColor(status) }}
                    >
                      {status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <FormattedBalance
                      balance={{
                        raw: transfer.value,
                        decimals: transfer.decimals ?? undefined,
                        isNative: transfer.type === "native",
                      }}
                      token={transfer.token as KeybanToken}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {getCryptoDisplay(transfer)}
                  </TableCell>
                  <TableCell align="center">{getAssetType(transfer)}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <FormattedBalance
                      balance={{
                        isFees: true,
                        raw: transfer.transaction?.fees ?? "0",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={getTxHash(transfer.id).txHash ?? ""} arrow>
                      <div>
                        {indexerUrl ? (
                          <Typography
                            variant="body2"
                            noWrap
                            component="a"
                            href={indexerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "none",
                              color: theme.palette.primary.main,
                            }}
                          >
                            {transfer.id
                              ? shortenAddress(getTxHash(transfer.id).txHash, 6)
                              : ""}
                          </Typography>
                        ) : (
                          <Typography variant="body2" noWrap>
                            {transfer.id ? shortenAddress(transfer.id, 6) : ""}
                          </Typography>
                        )}
                      </div>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    {transfer.transaction?.gasUsed}
                  </TableCell>
                  <TableCell align="center">
                    {transfer.transaction?.gasPrice}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default TransferList;
