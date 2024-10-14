export const testTransactions = [
  // First transaction: Incoming native cryptocurrency transfer
  {
    date: "2024-10-14T08:51:16.000000Z", // Timestamp
    from: "0x1234...abcd", // From: Any value (Sender's address)
    to: "0x01ab11cc058405747b9c10fe4ec93e4115f533ce", // To: Claire's wallet address (Receiver's address)
    value: 1500000000000000000, // Value in Wei (1.5 ETH)
    status: "success", // Status: success
    type: "ETH", // Type: ETH (native currency)
    gasPrice: "875175001", // Gas Price (dynamic field)
    gasUsed: "21000", // Gas Used (dynamic field)
    transactionHash: "0x5efd6...225e42277", // Transaction Hash (dynamic field)
    transactionFee: "18378675021000", // Transaction Fee (dynamic field)
    confirmations: 32, // Confirmations (dynamic field)
  },
  // Second transaction: Outgoing native cryptocurrency transfer
  {
    date: "2024-10-14T09:10:45.000000Z", // Timestamp
    from: "0x01ab11cc058405747b9c10fe4ec93e4115f533ce", // From: Claire's wallet address (Sender's address)
    to: "0x5678...mnop", // To: Any value (Receiver's address)
    value: 1000000000000000000, // Value in Wei (1.0 ETH)
    status: "success", // Status: success
    type: "ETH", // Type: ETH (native currency)
    gasPrice: "875175002", // Gas Price (dynamic field)
    gasUsed: "21000", // Gas Used (dynamic field)
    transactionHash: "0x6aa8d...225e12345", // Transaction Hash (dynamic field)
    transactionFee: "18378675031000", // Transaction Fee (dynamic field)
    confirmations: 30, // Confirmations (dynamic field)
  },
];
