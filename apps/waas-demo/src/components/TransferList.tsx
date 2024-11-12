import type React from "react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { format } from "date-fns";

import {
  useKeybanAccount,
  useKeybanAccountTransferHistory,
  useKeybanClient,
} from "@keyban/sdk-react";
import {
  Button,
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
    gasPrice: string;
    fees: string;
    success: boolean;
  } | null;
  type: string;
  value: string;
  from: {
    id: string;
  } | null;
  to: {
    id: string;
  } | null;
  token: {
    id: string;
    type: string | null;
    name: string | null;
    symbol: string | null;
    decimals: number | null;
    iconUrl: string | null;
  } | null;
  nft: {
    id: string;
    tokenId: string;
    metadata: any;
    collection: {
      id: string;
      type: string | null;
      name: string | null;
      symbol: string | null;
      decimals: number | null;
      iconUrl: string | null;
    } | null;
  } | null;
}

interface TransferListProps {
  pageSize?: number;
  disableLoadMore?: boolean; // Nouveau prop pour désactiver le "Load More"
}

const TransferList: React.FC<TransferListProps> = ({
  pageSize = 20,
  disableLoadMore = false,
}) => {
  const theme = useTheme();
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [transferHistory, transferHistoryError, { fetchMore }] =
    useKeybanAccountTransferHistory(account, { first: pageSize });
  if (transferHistoryError) throw transferHistoryError;

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const lastTransferRef = useRef<HTMLTableRowElement | null>(null);

  const client = useKeybanClient();

  useEffect(() => {
    if (transferHistory) {
      setTransfers(
        transferHistory.edges
          .map((edge) => edge.node)
          .filter((node): node is Transfer => node !== null),
      );
      setHasNextPage(transferHistory.pageInfo.hasNextPage);
      setEndCursor(transferHistory.pageInfo.endCursor);
    }
  }, [transferHistory]);

  const loadMoreTransfers = async () => {
    if (hasNextPage && endCursor) {
      await fetchMore();
      if (transferHistory) {
        setTransfers((prevTransfers) => [
          ...prevTransfers,
          ...transferHistory.edges
            .map((edge) => edge.node)
            .filter((node): node is Transfer => node !== null),
        ]);
        setHasNextPage(transferHistory.pageInfo.hasNextPage);
        setEndCursor(transferHistory.pageInfo.endCursor);
      }
    }
  };

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
        (Number(transfer?.value) || 0) /
        10 ** (transfer?.token?.decimals ?? client.nativeCurrency.decimals);
      return `${amountInETH.toFixed(4)} ${client.nativeCurrency.symbol}`;
    }
    if (transfer.type === "erc20") {
      const amountInTokens =
        (Number(transfer?.value) || 0) /
        10 ** (transfer?.token?.decimals ?? client.nativeCurrency.decimals);
      return `${amountInTokens.toFixed(4)} ${transfer.token?.symbol ?? ""}`;
    }
    if (transfer.type === "erc721") {
      return `Token ID: ${transfer?.nft?.tokenId}`;
    }
    if (transfer.type === "erc1155") {
      return `${transfer.value} Token ID: ${transfer?.nft?.tokenId}`;
    }
    return `${transfer.value ?? ""}`;
  };

  const formatDate = (date: string) => format(new Date(date), "PPpp"); // Exemple : '14 oct. 2024 à 8:51 AM'

  const getStatus = (transfer: Transfer | null) => {
    if (!transfer || !account) return "Unknown";

    const { from, to } = transfer;
    const accountAddress = account.address.toLowerCase();
    if (to?.id.toLowerCase() === accountAddress) return "Received";
    if (from?.id?.toLowerCase() === accountAddress) return "Sent";
    return "Unknown";
  };

  // const formatGasPrice = (gasPrice: string) => {
  //   const gasPriceInGwei = Number.parseInt(gasPrice) / 1e9;
  //   return `${gasPriceInGwei.toFixed(2)} Gwei`;
  // };

  const formatTransactionFee = (fee: string) => {
    const feeInWei = BigInt(fee);
    const feeInNative = Number(feeInWei) / 10 ** client.nativeCurrency.decimals;
    const formattedFee = feeInNative.toLocaleString(navigator.language, {
      minimumFractionDigits: 8,
      maximumFractionDigits: 18,
    });

    return `${formattedFee} ${client.nativeCurrency.symbol}`;
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
              const date = transfer?.transaction?.date
                ? formatDate(transfer.transaction?.date)
                : "Unknown";
              const transactionFee = formatTransactionFee(
                transfer?.transaction?.fees ?? "0",
              );

              let indexerUrl = "";
              try {
                indexerUrl = getIndexerUrl(client.chain, transfer.id ?? "");
              } catch (error) {
                console.error("Error generating indexer URL:", error);
              }

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
                  ref={index === transfers.length - 1 ? lastTransferRef : null}
                >
                  <TableCell align="center">{date}</TableCell>
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
                    {transfer.transaction?.gasPrice}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {hasNextPage && !disableLoadMore && (
        <Button
          variant="contained"
          onClick={loadMoreTransfers}
          sx={{ alignSelf: "center", marginTop: 2 }}
        >
          Load More
        </Button>
      )}
    </Stack>
  );
};

export default TransferList;
