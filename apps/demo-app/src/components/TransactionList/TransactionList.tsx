// src/components/TransactionList.tsx
import React from 'react';
import './TransactionList.css';

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

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="transaction-list">
      <div className="transaction-header">
        <span>Date</span>
        <span>Type</span>
        <span>Crypto</span>
        <span>To/From</span>
        <span>Amount</span>
        <span>Status</span>
      </div>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="transaction-item">
          <span>{transaction.date}</span>
          <span>{transaction.type}</span>
          <span>{transaction.crypto}</span>
          <span>{transaction.toFrom}</span>
          <span>{transaction.amount}</span>
          <span>{transaction.status}</span>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
