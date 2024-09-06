import type React from "react";

import {
  Paper,
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

interface Transaction {
  date: string;
  type: string;
  crypto: string;
  toFrom: string;
  amount: string;
  status: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return theme.palette.warning.main;
      case "Sent":
        return theme.palette.success.main;
      case "Received":
        return theme.palette.primary.main;
      default:
        return theme.palette.error.main;
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">To/From</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Crypto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              hover
              sx={{
                "&:hover": {
                  backgroundColor: "var(--table-row-hover-background-color)",
                },
              }}
            >
              <TableCell align="center">{transaction.date}</TableCell>
              <TableCell align="center">
                <Tooltip title={transaction.toFrom} arrow>
                  <Typography variant="body2" noWrap>
                    {transaction.toFrom}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body2"
                  style={{ color: getStatusColor(transaction.status) }}
                >
                  {transaction.status}
                </Typography>
              </TableCell>
              <TableCell align="center">{transaction.amount}</TableCell>
              <TableCell align="center">{transaction.crypto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;
