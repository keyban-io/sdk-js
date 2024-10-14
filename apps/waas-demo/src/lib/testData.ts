export const testTransactions = [
  // First transaction: Sending ERC-721 NFT (Most recent)
  {
    date: "2024-10-14T07:00:00.000000Z", // Timestamp
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    status: "success", // Status: success
    type: "ERC-721", // Type: ERC-721 (NFT transfer)
    gasPrice: "900000000", // Gas Price
    gasUsed: "100000", // Gas Used
    transactionHash: "0xabc123...nft1", // Transaction Hash
    transactionFee: "90000000000000000", // Transaction Fee
    confirmations: 30, // Confirmations
    contractAddress: "0xdef456...789abc", // ERC-721 contract address
    tokenId: "123456", // NFT Token ID
    tokenName: "Refurbished Refrigerator", // Optional: Name of the NFT
  },
  // Second transaction: Receiving ERC-1155 NFT
  {
    date: "2024-10-14T06:00:00.000000Z", // Timestamp
    from: "0x7890...qrst", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 2, // Quantity of ERC-1155 tokens
    status: "success", // Status: success
    type: "ERC-1155", // Type: ERC-1155 (NFT transfer)
    gasPrice: "950000000", // Gas Price
    gasUsed: "110000", // Gas Used
    transactionHash: "0xdef456...nft2", // Transaction Hash
    transactionFee: "104500000000000000", // Transaction Fee
    confirmations: 22, // Confirmations
    contractAddress: "0xghi789...012def", // ERC-1155 contract address
    tokenId: "789012", // NFT Token ID
    tokenName: "Mystery Discount Token", // Optional: Name of the NFT
  },
  // Third transaction: Sending ERC-20
  {
    date: "2024-10-14T11:00:00.000000Z", // Timestamp (most recent)
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    amount: 2000000000000000000, // Amount in Tokens (2 ERC-20 tokens)
    status: "success", // Status: success
    type: "ERC-20", // Type: ERC-20 (token transfer)
    gasPrice: "900000000", // Gas Price
    gasUsed: "52000", // Gas Used
    transactionHash: "0x9fabc...1243", // Transaction Hash
    transactionFee: "50000000000000000", // Transaction Fee
    confirmations: 25, // Confirmations
    contractAddress: "0xabc123...456def", // ERC-20 contract address
    tokenSymbol: "KT", // ERC-20 token symbol
  },
  // Fourth transaction: Receiving ERC-20
  {
    date: "2024-10-14T10:00:00.000000Z", // Timestamp
    from: "0x7890...qrst", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 3000000000000000000, // Amount in Tokens (3 ERC-20 tokens)
    status: "success", // Status: success
    type: "ERC-20", // Type: ERC-20 (token transfer)
    gasPrice: "1000000000", // Gas Price
    gasUsed: "50000", // Gas Used
    transactionHash: "0x7cdef...5678", // Transaction Hash
    transactionFee: "45000000000000000", // Transaction Fee
    confirmations: 18, // Confirmations
    contractAddress: "0xabc123...456def", // ERC-20 contract address
    tokenSymbol: "KT", // ERC-20 token symbol
  },
  // Fifth transaction: Sending native crypto (ETH)
  {
    date: "2024-10-14T09:00:00.000000Z", // Timestamp
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    amount: 1000000000000000000, // Amount in Wei (1.0 ETH)
    status: "success", // Status: success
    type: "ETH", // Type: ETH (native currency)
    gasPrice: "875175002", // Gas Price
    gasUsed: "21000", // Gas Used
    transactionHash: "0x6aa8d...225e12345", // Transaction Hash
    transactionFee: "18378675031000", // Transaction Fee
    confirmations: 20, // Confirmations
  },
  // Sixth transaction: Receiving native crypto (ETH)
  {
    date: "2024-10-14T08:00:00.000000Z", // Timestamp (oldest)
    from: "0x1234...abcd", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 1500000000000000000, // Amount in Wei (1.5 ETH)
    status: "success", // Status: success
    type: "ETH", // Type: ETH (native currency)
    gasPrice: "900000000", // Gas Price
    gasUsed: "21000", // Gas Used
    transactionHash: "0xabcde...12345", // Transaction Hash
    transactionFee: "18900000000000000", // Transaction Fee
    confirmations: 15, // Confirmations
  },
];
