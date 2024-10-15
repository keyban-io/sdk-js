import type React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Button,
  Stack,
  Typography,
} from "@mui/material";

import TransactionList from "../components/TransactionList";
import { testTransactions } from "../lib/testData";

const TransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(
    testTransactions.slice(0, 50),
  );
  const [page, setPage] = useState(1);

  const handleBackClick = () => {
    navigate("/");
  };

  const loadMoreTransactions = () => {
    const nextPage = page + 1;
    const newTransactions = testTransactions.slice(0, nextPage * 50);
    setTransactions(newTransactions);
    setPage(nextPage);
  };

  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h6" align="center">
        Transaction List
      </Typography>
      <TransactionList
        transactions={transactions}
        pageSize={15}
        currentPage={page}
        onLoadMore={loadMoreTransactions}
      />
      <div
        style={{
          position: "sticky",
          bottom: 0,
          alignSelf: "center",
          marginTop: "auto",
        }}
      >
        <Button variant="contained" onClick={handleBackClick}>
          Back to Dashboard
        </Button>
      </div>
    </Stack>
  );
};

export default TransactionsPage;
