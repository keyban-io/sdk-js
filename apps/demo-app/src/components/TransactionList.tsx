import type React from 'react';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';

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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
`;

const TableHeader = styled.th`
  background-color: var(--table-header-background-color);
  color: var(--table-header-color);
  padding: 0.5rem;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
`;

const TableCell = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  text-align: center; /* Center align all table cells for better alignment */
`;

const TransactionRow = styled.tr`
  &:hover {
    background-color: var(--table-row-hover-background-color);
  }
`;

const Status = styled.span<{ status: string }>`
  color: ${(props) =>
    props.status === 'Pending'
      ? 'orange'
      : props.status === 'Sent'
        ? 'green'
        : 'red'};
`;

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Date</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>Crypto</TableHeader>
          <TableHeader>To/From</TableHeader>
          <TableHeader>Amount</TableHeader>
          <TableHeader>Status</TableHeader>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <TransactionRow key={index}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.type}</TableCell>
            <TableCell>{transaction.crypto}</TableCell>
            <TableCell>
              <Tooltip title={transaction.toFrom} arrow>
                <span>{transaction.toFrom}</span>
              </Tooltip>
            </TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>
              <Status status={transaction.status}>{transaction.status}</Status>
            </TableCell>
          </TransactionRow>
        ))}
      </tbody>
    </Table>
  );
};

export default TransactionList;
