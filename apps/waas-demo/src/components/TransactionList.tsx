import type React from "react";
import { useRef } from "react";

import { format } from "date-fns";

import {
  useKeybanAccount,
  useKeybanAccountTransactionHistory,
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

interface Transaction {
  id: string;
  type: string;
  blockNumber: string;
  value: string;
  timestamp: string;
  success: boolean;
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

interface TransactionListProps {
  pageSize?: number;
  currentPage?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({
  pageSize = 50,
  currentPage = 1,
}) => {
  const theme = useTheme();
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [txHistory, txHistoryError] =
    useKeybanAccountTransactionHistory(account);
  if (txHistoryError) throw txHistoryError;

  const lastTransactionRef = useRef<HTMLTableRowElement | null>(null);

  const client = useKeybanClient();

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

  const formatAmount = (transaction: Transaction | null) => {
    if (!transaction) return "";

    if (transaction?.type === "native") {
      const amountInETH =
        (Number(transaction?.value) || 0) /
        10 ** (transaction?.token?.decimals ?? client.nativeCurrency.decimals);
      return `${amountInETH.toFixed(4)} ${client.nativeCurrency.symbol}`;
    }
    if (transaction.type === "erc20") {
      const amountInTokens =
        (Number(transaction?.value) || 0) /
        10 ** (transaction?.token?.decimals ?? client.nativeCurrency.decimals);
      return `${amountInTokens.toFixed(4)} ${transaction.token?.symbol ?? ""}`;
    }
    if (transaction.type === "erc721") {
      return `Token ID: ${transaction?.nft?.tokenId}`;
    }
    if (transaction.type === "erc1155") {
      return `${transaction.value} Token ID: ${transaction?.nft?.tokenId}`;
    }
    return `${transaction.value ?? ""}`;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(Number(timestamp) * 1000);
    return format(date, "PPpp"); // Exemple : '14 oct. 2024 à 8:51 AM'
  };

  const getStatus = (transaction: Transaction | null) => {
    if (!transaction || !account) return "Unknown";

    const { from, to } = transaction;
    const accountAddress = account.address.toLowerCase();
    if (to?.id.toLowerCase() === accountAddress) return "Received";
    if (from?.id?.toLowerCase() === accountAddress) return "Sent";
    return "Unknown";
  };

  // const formatGasPrice = (gasPrice: string) => {
  //   const gasPriceInGwei = Number.parseInt(gasPrice) / 1e9;
  //   return `${gasPriceInGwei.toFixed(2)} Gwei`;
  // };

  // const formatTransactionFee = (fee: string) => {
  //   const feeInETH = Number.parseInt(fee) / 1e18;
  //   return `${feeInETH.toFixed(6)} ETH`;
  // };

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

  const getAssetType = (transaction: Transaction | null) => {
    if (!transaction) return "Unknown";
    if (transaction?.type === "native") {
      return "Native";
    }
    if (transaction.type === "erc20") {
      return "Token";
    }
    if (transaction.type === "erc721" || transaction.type === "erc1155") {
      return "NFT";
    }

    return "Unknown";
  };

  const getCryptoDisplay = (transaction: Transaction | null) => {
    if (!transaction) return "Unknown";
    if (transaction.type === "native") {
      return client.nativeCurrency.symbol;
    }
    if (transaction.type === "erc20") {
      return transaction?.token?.symbol ?? "erc20";
    }
    if (transaction.type === "erc721" || transaction.type === "erc1155") {
      return transaction.token?.name ?? transaction.type;
    }
    return transaction.type;
  };

  const paginatedTransactions = txHistory?.edges.slice(
    0,
    currentPage * pageSize,
  );

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
              {/* <TableCell align="center">Gas Price</TableCell>
              <TableCell align="center">Gas Used</TableCell>
              <TableCell align="center">Transaction Fee</TableCell>
              <TableCell align="center">Confirmations</TableCell> */}
              <TableCell align="center">Transaction Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions?.map((transaction, index) => {
              const status = getStatus(transaction?.node);
              const amount = formatAmount(transaction.node);
              const date = transaction?.node?.timestamp
                ? formatDate(transaction.node.timestamp)
                : "Unknown";
              // const gasPrice = formatGasPrice(transaction.node.gasPrice);
              // const transactionFee = formatTransactionFee(
              //   transaction.node.transactionFee,
              // );

              let indexerUrl = "";
              try {
                indexerUrl = getIndexerUrl(
                  client.chain,
                  transaction.node?.id ?? "",
                );
              } catch (error) {
                console.error("Error generating indexer URL:", error);
              }

              return (
                <TableRow
                  key={transaction.node?.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        "var(--table-row-hover-background-color)",
                    },
                  }}
                  ref={
                    index === paginatedTransactions.length - 1
                      ? lastTransactionRef
                      : null
                  }
                >
                  <TableCell align="center">{date}</TableCell>
                  <TableCell align="center">
                    <Tooltip title={transaction?.node?.from?.id} arrow>
                      <Typography variant="body2" noWrap>
                        {transaction?.node?.from?.id
                          ? shortenAddress(transaction.node.from.id)
                          : ""}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={transaction.node?.to?.id ?? ""} arrow>
                      <Typography variant="body2" noWrap>
                        {transaction.node?.to?.id
                          ? shortenAddress(transaction.node.to.id)
                          : ""}
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
                    {getCryptoDisplay(transaction.node)}
                  </TableCell>
                  <TableCell align="center">
                    {getAssetType(transaction.node)}
                  </TableCell>
                  {/* <TableCell align="center">{gasPrice}</TableCell> */}
                  {/* <TableCell align="center">{transaction.gasUsed}</TableCell> */}
                  {/* <TableCell align="center">{transactionFee}</TableCell> */}
                  {/* <TableCell align="center">
                    {transaction.confirmations}
                  </TableCell> */}
                  <TableCell align="center">
                    <Tooltip
                      title={getTxHash(transaction.node?.id)?.txHash ?? null}
                      arrow
                    >
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
                            {transaction.node?.id
                              ? shortenAddress(
                                  getTxHash(transaction.node.id).txHash,
                                  6,
                                )
                              : ""}
                          </Typography>
                        ) : (
                          <Typography variant="body2" noWrap>
                            {transaction.node?.id
                              ? shortenAddress(
                                  getTxHash(transaction.node.id).txHash,
                                  6,
                                )
                              : ""}
                          </Typography>
                        )}
                      </div>
                    </Tooltip>
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

export default TransactionList;
