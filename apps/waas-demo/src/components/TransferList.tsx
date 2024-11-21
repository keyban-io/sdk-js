import type React from "react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  format,
  formatDistanceToNow,
} from "date-fns";

import {
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

import { getIndexerUrl } from "../lib/getIndexerUrl";

interface Transfer {
  id: string;
  transaction: {
    id: string;
    blockNumber: string;
    blockHash: string;
    date: string;
    gasUsed: string;
    gasPrice: {
      raw: string;
      decimals: number | null;
    };
    fees: {
      raw: string;
      decimals: number | null;
    };
    success: boolean;
  } | null;
  type: string;
  value: {
    raw: string;
    decimals: number | null;
  };
  from: {
    id: string;
  } | null;
  to: {
    id: string;
  } | null;
  token: {
    id: string;
    type: string;
    name: string | null;
    symbol: string | null;
    decimals: number | null;
    iconUrl: string | null;
  } | null;
  nft: {
    id: string;
    tokenId: string;
    metadata: Record<string, unknown>;
    collection: {
      id: string;
      type: string;
      name: string | null;
      symbol: string | null;
      decimals: number | null;
      iconUrl: string | null;
    } | null;
  } | null;
}

interface TransferListProps {
  pageSize?: number;
  disableInfiniteScroll?: boolean; // Prop pour désactiver le défilement infini
}

const TransferList: React.FC<TransferListProps> = ({
  pageSize = 20,
  disableInfiniteScroll = false,
}) => {
  const theme = useTheme();
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastTransferRef = useRef<HTMLTableRowElement | null>(null);

  const client = useKeybanClient();

  const [transferHistory, transferHistoryError, { fetchMore, loading }] =
    useKeybanAccountTransferHistory(account, { first: pageSize });
  if (transferHistoryError) throw transferHistoryError;

  useEffect(() => {
    if (transferHistory) {
      setHasNextPage(transferHistory.pageInfo.hasNextPage);

      setTransfers((prevTransfers) => {
        // Concaténer les nouveaux transferts aux précédents
        const newTransfers = transferHistory.edges
          .map((edge) => edge.node)
          .filter((node): node is Transfer => node !== null);

        // Éviter les duplications en vérifiant les IDs
        const existingIds = new Set(prevTransfers.map((t) => t.id));
        const combinedTransfers = [
          ...prevTransfers,
          ...newTransfers.filter((t) => !existingIds.has(t.id)),
        ];

        return combinedTransfers;
      });
    }
  }, [transferHistory]);

  useEffect(() => {
    const loadMoreTransfers = async () => {
      if (hasNextPage) {
        await fetchMore();
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

  const formatAmount = (transfer: Transfer | null) => {
    if (!transfer) return "";

    if (transfer?.type === "native") {
      const amountInETH =
        (Number(transfer?.value.raw) || 0) /
        10 ** (transfer?.value?.decimals ?? client.nativeCurrency.decimals);
      return `${amountInETH.toFixed(4)} ${client.nativeCurrency.symbol}`;
    }
    if (transfer.type === "erc20") {
      const amountInTokens =
        (Number(transfer?.value.raw) || 0) /
        10 ** (transfer?.value?.decimals ?? transfer?.token?.decimals ?? 0);
      return `${amountInTokens.toFixed(4)} ${transfer.token?.symbol ?? ""}`;
    }
    if (transfer.type === "erc721") {
      return `Token ID: ${transfer?.nft?.tokenId}`;
    }
    if (transfer.type === "erc1155") {
      return `${transfer.value.raw} Token ID: ${transfer?.nft?.tokenId}`;
    }
    return `${transfer.value.raw ?? ""}`;
  };

  const formatHuman = (date: string) =>
    formatDistanceToNow(new Date(`${date}`), {
      includeSeconds: true,
      addSuffix: true,
    });

  const formatDate = (date: string) => format(new Date(date), "PPpp"); // Exemple : '14 oct. 2024 à 8:51 AM'

  const getStatus = (transfer: Transfer | null) => {
    if (!transfer || !account) return "Unknown";

    const { from, to } = transfer;
    const accountAddress = account.address.toLowerCase();
    if (to?.id.toLowerCase() === accountAddress) return "Received";
    if (from?.id?.toLowerCase() === accountAddress) return "Sent";
    return "Unknown";
  };

  const formatTransactionFee = (fee: string) => {
    const feeInWei = BigInt(fee);
    const feeInFeesUnit = Number(feeInWei) / 10 ** client.feesUnit.decimals;
    const formattedFee = feeInFeesUnit.toLocaleString(navigator.language, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 18,
    });

    return `${formattedFee} ${client.feesUnit.symbol}`;
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

  const getAssetType = (transfer: Transfer | null) => {
    if (!transfer) return "Unknown";
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

  const getCryptoDisplay = (transfer: Transfer | null) => {
    if (!transfer) return "Unknown";
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
            {transfers.map((transfer, index) => {
              const status = getStatus(transfer);
              const amount = formatAmount(transfer);
              const dateHuman = transfer?.transaction?.date
                ? formatHuman(transfer.transaction?.date)
                : "Unknown";
              const date = transfer?.transaction?.date
                ? formatDate(transfer.transaction?.date)
                : "Unknown";
              const transactionFee = formatTransactionFee(
                transfer?.transaction?.fees.raw ?? "0",
              );

              let indexerUrl = "";
              try {
                indexerUrl = getIndexerUrl(client.chain, transfer.id ?? "");
              } catch (error) {
                console.error("Error generating indexer URL:", error);
              }

              const isLastItem = index === transfers.length - 1;

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
                    <Tooltip title={transfer?.from?.id} arrow>
                      <Typography variant="body2" noWrap>
                        {transfer?.from?.id
                          ? shortenAddress(transfer.from.id)
                          : ""}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={transfer.to?.id ?? ""} arrow>
                      <Typography variant="body2" noWrap>
                        {transfer.to?.id ? shortenAddress(transfer.to.id) : ""}
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
                  <TableCell align="center">{amount}</TableCell>
                  <TableCell align="center">
                    {getCryptoDisplay(transfer)}
                  </TableCell>
                  <TableCell align="center">{getAssetType(transfer)}</TableCell>
                  <TableCell align="center">{transactionFee}</TableCell>
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
                    {transfer.transaction?.gasPrice.raw}
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
