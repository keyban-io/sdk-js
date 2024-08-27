import type React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Typography,
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
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Crypto</TableCell>
            <TableCell align="center">To/From</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow
              key={index}
              hover
              sx={{
                "&:hover": {
                  backgroundColor: "var(--table-row-hover-background-color)",
                },
              }}
            >
              <TableCell align="center">{transaction.date}</TableCell>
              <TableCell align="center">{transaction.type}</TableCell>
              <TableCell align="center">{transaction.crypto}</TableCell>
              <TableCell align="center">
                <Tooltip title={transaction.toFrom} arrow>
                  <Typography variant="body2" noWrap>
                    {transaction.toFrom}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell align="center">{transaction.amount}</TableCell>
              <TableCell align="center">
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      transaction.status === "Pending"
                        ? "orange"
                        : transaction.status === "Sent"
                          ? "green"
                          : "red",
                  }}
                >
                  {transaction.status}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;
