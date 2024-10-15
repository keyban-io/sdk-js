import type React from "react";
import {
  useEffect,
  useRef,
} from "react";

import { format } from "date-fns";

import {
  useKeybanAccount,
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
  date: string;
  from: string;
  to: string;
  amount?: number; // Optionnel, surtout pour ERC-721
  status: string;
  type: string; // "ETH", "ERC-20", "ERC-721", ou "ERC-1155"
  gasPrice: string;
  gasUsed: string;
  transactionHash: string;
  transactionFee: string;
  confirmations: number;
  contractAddress?: string; // Optionnel
  tokenSymbol?: string; // Optionnel pour les tokens
  tokenId?: string; // Optionnel, pour les NFTs
  tokenName?: string; // Optionnel, pour les NFTs
}

interface TransactionListProps {
  transactions: Transaction[];
  pageSize?: number;
  currentPage?: number;
  onLoadMore?: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  pageSize = 50,
  currentPage = 1,
  onLoadMore,
}) => {
  const theme = useTheme();
  const [account, accountError] = useKeybanAccount({ suspense: true });
  if (accountError) throw accountError;

  const observer = useRef<IntersectionObserver | null>(null);
  const lastTransactionRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    if (onLoadMore) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      });

      if (lastTransactionRef.current) {
        observer.current.observe(lastTransactionRef.current);
      }
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [onLoadMore]);

  const client = useKeybanClient();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "sent - pending":
      case "received - pending":
        return theme.palette.warning.main;
      case "sent - success":
      case "received - success":
        return theme.palette.success.main;
      case "sent - failed":
      case "received - failed":
        return theme.palette.error.main;
      default:
        return theme.palette.text.primary;
    }
  };

  const formatAmount = (transaction: Transaction) => {
    if (transaction.type === "ETH") {
      const amountInETH = (transaction.amount ?? 0) / 1e18;
      return `${amountInETH.toFixed(4)} ETH`;
    }
    if (transaction.type === "ERC-20") {
      const amountInTokens = (transaction.amount ?? 0) / 1e18;
      return `${amountInTokens.toFixed(4)} ${transaction.tokenSymbol ?? ""}`;
    }
    if (transaction.type === "ERC-721") {
      return `Token ID: ${transaction.tokenId}`;
    }
    if (transaction.type === "ERC-1155") {
      return `Amount: ${transaction.amount} Token ID: ${transaction.tokenId}`;
    }
    return `${transaction.amount ?? ""}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PPpp"); // Exemple : '14 oct. 2024 à 8:51 AM'
  };

  const getStatus = (transaction: Transaction) => {
    const direction =
      transaction.to.toLowerCase() === account.address.toLowerCase()
        ? "Received"
        : transaction.from.toLowerCase() === account.address.toLowerCase()
          ? "Sent"
          : "Unknown";

    const status =
      transaction.status.charAt(0).toUpperCase() +
      transaction.status.slice(1).toLowerCase();

    if (direction === "Unknown") {
      return status;
    }
    return `${direction} - ${status}`;
  };

  const formatGasPrice = (gasPrice: string) => {
    const gasPriceInGwei = Number.parseInt(gasPrice) / 1e9;
    return `${gasPriceInGwei.toFixed(2)} Gwei`;
  };

  const formatTransactionFee = (fee: string) => {
    const feeInETH = Number.parseInt(fee) / 1e18;
    return `${feeInETH.toFixed(6)} ETH`;
  };

  const shortenAddress = (address: string, chars = 4) => {
    if (address.length <= chars * 2 + 2) {
      return address;
    }
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  };

  const getAssetType = (transaction: Transaction) => {
    if (transaction.type === "ETH") {
      return "Native";
    }
    if (transaction.type === "ERC-20") {
      return "Token";
    }
    if (transaction.type === "ERC-721" || transaction.type === "ERC-1155") {
      return "NFT";
    }

    return "Unknown";
  };

  const getCryptoDisplay = (transaction: Transaction) => {
    if (transaction.type === "ETH") {
      return "ETH";
    }
    if (transaction.type === "ERC-20") {
      return transaction.tokenSymbol ?? "ERC-20";
    }
    if (transaction.type === "ERC-721" || transaction.type === "ERC-1155") {
      return transaction.tokenName ?? transaction.type;
    }
    return transaction.type;
  };

  const paginatedTransactions = transactions.slice(0, currentPage * pageSize);

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
              <TableCell align="center">Gas Price</TableCell>
              <TableCell align="center">Gas Used</TableCell>
              <TableCell align="center">Transaction Fee</TableCell>
              <TableCell align="center">Confirmations</TableCell>
              <TableCell align="center">Transaction Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((transaction, index) => {
              const status = getStatus(transaction);
              const amount = formatAmount(transaction);
              const date = formatDate(transaction.date);
              const gasPrice = formatGasPrice(transaction.gasPrice);
              const transactionFee = formatTransactionFee(
                transaction.transactionFee,
              );

              let indexerUrl = "";
              try {
                indexerUrl = getIndexerUrl(
                  client.chain,
                  transaction.transactionHash,
                );
              } catch (error) {
                console.error("Error generating indexer URL:", error);
              }

              return (
                <TableRow
                  key={transaction.transactionHash}
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
                    <Tooltip title={transaction.from} arrow>
                      <Typography variant="body2" noWrap>
                        {shortenAddress(transaction.from)}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={transaction.to} arrow>
                      <Typography variant="body2" noWrap>
                        {shortenAddress(transaction.to)}
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
                    {getCryptoDisplay(transaction)}
                  </TableCell>
                  <TableCell align="center">
                    {getAssetType(transaction)}
                  </TableCell>
                  <TableCell align="center">{gasPrice}</TableCell>
                  <TableCell align="center">{transaction.gasUsed}</TableCell>
                  <TableCell align="center">{transactionFee}</TableCell>
                  <TableCell align="center">
                    {transaction.confirmations}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={transaction.transactionHash} arrow>
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
                            {shortenAddress(transaction.transactionHash, 6)}
                          </Typography>
                        ) : (
                          <Typography variant="body2" noWrap>
                            {shortenAddress(transaction.transactionHash, 6)}
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
