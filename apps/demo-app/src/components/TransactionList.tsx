import React from 'react';
import styled from 'styled-components';

interface Transaction {
  id: string;
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

const TransactionListWrapper = styled.div`
  padding: 20px;
  background-color: var(--primary-lightest);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
`;

const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-weight: bold;
  border-bottom: 1px solid var(--border-color);
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
`;

const TransactionField = styled.span`
  flex: 1;
  text-align: center;
`;

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <TransactionListWrapper>
      <TransactionHeader>
        <TransactionField>Date</TransactionField>
        <TransactionField>Type</TransactionField>
        <TransactionField>Crypto</TransactionField>
        <TransactionField>To/From</TransactionField>
        <TransactionField>Amount</TransactionField>
        <TransactionField>Status</TransactionField>
      </TransactionHeader>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id}>
          <TransactionField>{transaction.date}</TransactionField>
          <TransactionField>{transaction.type}</TransactionField>
          <TransactionField>{transaction.crypto}</TransactionField>
          <TransactionField>{transaction.toFrom}</TransactionField>
          <TransactionField>{transaction.amount}</TransactionField>
          <TransactionField>{transaction.status}</TransactionField>
        </TransactionItem>
      ))}
    </TransactionListWrapper>
  );
};

export default TransactionList;
