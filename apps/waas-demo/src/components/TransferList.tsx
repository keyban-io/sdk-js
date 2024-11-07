import type React from "react";
import { useRef } from "react";

import { format } from "date-fns";

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
  currentPage?: number;
}

const TransferList: React.FC<TransferListProps> = ({
  pageSize = 50,
  currentPage = 1,
}) => {
  const theme = useTheme();
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [transferHistory, transferHistoryError] =
    useKeybanAccountTransferHistory(account);
  if (transferHistoryError) throw transferHistoryError;
  console.log("transferHistory", transferHistory);

  const lastTransferRef = useRef<HTMLTableRowElement | null>(null);

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
    console.log("transfer fee", fee);

    // Convertir la chaîne "fee" en BigInt
    const feeInWei = BigInt(fee);

    // Obtenir la valeur en devise native en utilisant BigInt pour éviter la perte de précision
    const feeInNative = Number(feeInWei) / 10 ** client.nativeCurrency.decimals;

    // Formater la valeur en utilisant un maximum de chiffres après la virgule
    const formattedFee = feeInNative.toLocaleString("fr-FR", {
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

  const paginatedTransfers = transferHistory?.edges.slice(
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
              <TableCell align="center">Gas Used</TableCell> */}
              <TableCell align="center">Transaction Fee</TableCell>
              {/* <TableCell align="center">Confirmations</TableCell> */}
              <TableCell align="center">Transaction Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransfers?.map((transfer, index) => {
              const status = getStatus(transfer?.node);
              const amount = formatAmount(transfer.node);
              const date = transfer?.node?.transaction?.date
                ? formatDate(transfer.node.transaction?.date)
                : "Unknown";
              // const gasPrice = formatGasPrice(transaction.node.gasPrice);
              const transactionFee = formatTransactionFee(
                transfer?.node?.transaction?.fees ?? "0",
              );

              let indexerUrl = "";
              try {
                indexerUrl = getIndexerUrl(
                  client.chain,
                  transfer.node?.id ?? "",
                );
              } catch (error) {
                console.error("Error generating indexer URL:", error);
              }

              return (
                <TableRow
                  key={transfer.node?.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        "var(--table-row-hover-background-color)",
                    },
                  }}
                  ref={
                    index === paginatedTransfers.length - 1
                      ? lastTransferRef
                      : null
                  }
                >
                  <TableCell align="center">{date}</TableCell>
                  <TableCell align="center">
                    <Tooltip title={transfer?.node?.from?.id} arrow>
                      <Typography variant="body2" noWrap>
                        {transfer?.node?.from?.id
                          ? shortenAddress(transfer.node.from.id)
                          : ""}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={transfer.node?.to?.id ?? ""} arrow>
                      <Typography variant="body2" noWrap>
                        {transfer.node?.to?.id
                          ? shortenAddress(transfer.node.to.id)
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
                    {getCryptoDisplay(transfer.node)}
                  </TableCell>
                  <TableCell align="center">
                    {getAssetType(transfer.node)}
                  </TableCell>
                  {/* <TableCell align="center">{gasPrice}</TableCell> */}
                  {/* <TableCell align="center">{transaction.gasUsed}</TableCell> */}
                  <TableCell align="center">{transactionFee}</TableCell>
                  {/* <TableCell align="center">
                    {transaction.confirmations}
                  </TableCell> */}
                  <TableCell align="center">
                    <Tooltip
                      title={getTxHash(transfer.node?.id)?.txHash ?? null}
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
                            {transfer.node?.id
                              ? shortenAddress(
                                  getTxHash(transfer.node.id).txHash,
                                  6,
                                )
                              : ""}
                          </Typography>
                        ) : (
                          <Typography variant="body2" noWrap>
                            {transfer.node?.id
                              ? shortenAddress(
                                  getTxHash(transfer.node.id).txHash,
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

export default TransferList;
