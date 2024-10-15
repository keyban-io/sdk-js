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
    transactionHash: "0xa1b2c3d4e5f6070819a0b1c2d3e4f5a6b7c8d9e0", // Transaction Hash
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
    transactionHash: "0xb1c2d3e4f5a6070819a0b1c2d3e4f5a6b7c8d9e1", // Transaction Hash
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
    transactionHash: "0xc2d3e4f5a6070819a0b1c2d3e4f5a6b7c8d9e2", // Transaction Hash
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
    transactionHash: "0xd3e4f5a6070819a0b1c2d3e4f5a6b7c8d9e3", // Transaction Hash
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
    transactionHash: "0xe4f5a6070819a0b1c2d3e4f5a6b7c8d9e4", // Transaction Hash
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
    transactionHash: "0xf5a6070819a0b1c2d3e4f5a6b7c8d9e5", // Transaction Hash
    transactionFee: "18900000000000000", // Transaction Fee
    confirmations: 15, // Confirmations
  },
  // Seventh transaction: Sending ERC-721 NFT
  {
    date: "2024-10-13T07:00:00.000000Z", // Timestamp
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    status: "success", // Status: success
    type: "ERC-721", // Type: ERC-721 (NFT transfer)
    gasPrice: "900000000", // Gas Price
    gasUsed: "100000", // Gas Used
    transactionHash: "0x06a7070819a0b1c2d3e4f5a6b7c8d9e6", // Transaction Hash
    transactionFee: "90000000000000000", // Transaction Fee
    confirmations: 30, // Confirmations
    contractAddress: "0xdef456...789abc", // ERC-721 contract address
    tokenId: "123457", // NFT Token ID
    tokenName: "Vintage Vinyl Record", // Optional: Name of the NFT
  },
  // Eighth transaction: Receiving ERC-1155 NFT
  {
    date: "2024-10-13T06:00:00.000000Z", // Timestamp
    from: "0x7890...qrst", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 3, // Quantity of ERC-1155 tokens
    status: "success", // Status: success
    type: "ERC-1155", // Type: ERC-1155 (NFT transfer)
    gasPrice: "950000000", // Gas Price
    gasUsed: "110000", // Gas Used
    transactionHash: "0x1f2a3070819a0b1c2d3e4f5a6b7c8d9e7", // Transaction Hash
    transactionFee: "104500000000000000", // Transaction Fee
    confirmations: 22, // Confirmations
    contractAddress: "0xghi789...012def", // ERC-1155 contract address
    tokenId: "789013", // NFT Token ID
    tokenName: "Exclusive Access Token", // Optional: Name of the NFT
  },
  // Ninth transaction: Sending ERC-20
  {
    date: "2024-10-13T11:00:00.000000Z", // Timestamp
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    amount: 1000000000000000000, // Amount in Tokens (1 ERC-20 token)
    status: "success", // Status: success
    type: "ERC-20", // Type: ERC-20 (token transfer)
    gasPrice: "900000000", // Gas Price
    gasUsed: "52000", // Gas Used
    transactionHash: "0x3b4a6070819a0b1c2d3e4f5a6b7c8d9e8", // Transaction Hash
    transactionFee: "50000000000000000", // Transaction Fee
    confirmations: 25, // Confirmations
    contractAddress: "0xabc123...456def", // ERC-20 contract address
    tokenSymbol: "KT", // ERC-20 token symbol
  },
  // Tenth transaction: Receiving ERC-20
  {
    date: "2024-10-13T10:00:00.000000Z", // Timestamp
    from: "0x7890...qrst", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 4000000000000000000, // Amount in Tokens (4 ERC-20 tokens)
    status: "success", // Status: success
    type: "ERC-20", // Type: ERC-20 (token transfer)
    gasPrice: "1000000000", // Gas Price
    gasUsed: "50000", // Gas Used
    transactionHash: "0x5c6b6070819a0b1c2d3e4f5a6b7c8d9e9", // Transaction Hash
    transactionFee: "45000000000000000", // Transaction Fee
    confirmations: 18, // Confirmations
    contractAddress: "0xabc123...456def", // ERC-20 contract address
    tokenSymbol: "KT", // ERC-20 token symbol
  },
  // Eleventh transaction: Sending native crypto (ETH)
  {
    date: "2024-10-13T09:00:00.000000Z", // Timestamp
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    amount: 2000000000000000000, // Amount in Wei (2.0 ETH)
    status: "success", // Status: success
    type: "ETH", // Type: ETH (native currency)
    gasPrice: "875175002", // Gas Price
    gasUsed: "21000", // Gas Used
    transactionHash: "0x7f8c6070819a0b1c2d3e4f5a6b7c8d9e0", // Transaction Hash
    transactionFee: "18378675031000", // Transaction Fee
    confirmations: 20, // Confirmations
  },
  // Twelfth transaction: Receiving native crypto (ETH)
  {
    date: "2024-10-13T08:00:00.000000Z", // Timestamp
    from: "0x1234...abcd", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 2500000000000000000, // Amount in Wei (2.5 ETH)
    status: "success", // Status: success
    type: "ETH", // Type: ETH (native currency)
    gasPrice: "900000000", // Gas Price
    gasUsed: "21000", // Gas Used
    transactionHash: "0x9a0b6070819a0b1c2d3e4f5a6b7c8d9e1", // Transaction Hash
    transactionFee: "18900000000000000", // Transaction Fee
    confirmations: 15, // Confirmations
  },
  // Thirteenth transaction: Sending ERC-721 NFT (Most recent)
  {
    date: "2024-10-14T07:00:00.000000Z", // Timestamp
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    status: "success", // Status: success
    type: "ERC-721", // Type: ERC-721 (NFT transfer)
    gasPrice: "900000000", // Gas Price
    gasUsed: "100000", // Gas Used
    transactionHash: "0x1a2b3c4d5e6070819a0b1c2d3e4f5a6b7c8d9f0", // Transaction Hash
    transactionFee: "90000000000000000", // Transaction Fee
    confirmations: 30, // Confirmations
    contractAddress: "0xdef456...789abc", // ERC-721 contract address
    tokenId: "123456", // NFT Token ID
    tokenName: "Refurbished Refrigerator", // Optional: Name of the NFT
  },
  // Fourteenth transaction: Receiving ERC-1155 NFT
  {
    date: "2024-10-14T06:00:00.000000Z", // Timestamp
    from: "0x7890...qrst", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 2, // Quantity of ERC-1155 tokens
    status: "success", // Status: success
    type: "ERC-1155", // Type: ERC-1155 (NFT transfer)
    gasPrice: "950000000", // Gas Price
    gasUsed: "110000", // Gas Used
    transactionHash: "0x2b3c4d5e6070819a0b1c2d3e4f5a6b7c8d9f1", // Transaction Hash
    transactionFee: "104500000000000000", // Transaction Fee
    confirmations: 22, // Confirmations
    contractAddress: "0xghi789...012def", // ERC-1155 contract address
    tokenId: "789012", // NFT Token ID
    tokenName: "Mystery Discount Token", // Optional: Name of the NFT
  },
  // Fifteenth transaction: Sending ERC-20
  {
    date: "2024-10-14T11:00:00.000000Z", // Timestamp (most recent)
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    amount: 2000000000000000000, // Amount in Tokens (2 ERC-20 tokens)
    status: "success", // Status: success
    type: "ERC-20", // Type: ERC-20 (token transfer)
    gasPrice: "900000000", // Gas Price
    gasUsed: "52000", // Gas Used
    transactionHash: "0x3c4d5e6070819a0b1c2d3e4f5a6b7c8d9f2", // Transaction Hash
    transactionFee: "50000000000000000", // Transaction Fee
    confirmations: 25, // Confirmations
    contractAddress: "0xabc123...456def", // ERC-20 contract address
    tokenSymbol: "KT", // ERC-20 token symbol
  },
  // Sixteenth transaction: Receiving ERC-20
  {
    date: "2024-10-14T10:00:00.000000Z", // Timestamp
    from: "0x7890...qrst", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 3000000000000000000, // Amount in Tokens (3 ERC-20 tokens)
    status: "success", // Status: success
    type: "ERC-20", // Type: ERC-20 (token transfer)
    gasPrice: "1000000000", // Gas Price
    gasUsed: "50000", // Gas Used
    transactionHash: "0x4d5e6070819a0b1c2d3e4f5a6b7c8d9f3", // Transaction Hash
    transactionFee: "45000000000000000", // Transaction Fee
    confirmations: 18, // Confirmations
    contractAddress: "0xabc123...456def", // ERC-20 contract address
    tokenSymbol: "KT", // ERC-20 token symbol
  },
  // Seventeenth transaction: Sending native crypto (ETH)
  {
    date: "2024-10-14T09:00:00.000000Z", // Timestamp
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    amount: 1000000000000000000, // Amount in Wei (1.0 ETH)
    status: "success", // Status: success
    type: "ETH", // Type: ETH (native currency)
    gasPrice: "875175002", // Gas Price
    gasUsed: "21000", // Gas Used
    transactionHash: "0x5e6070819a0b1c2d3e4f5a6b7c8d9e4f", // Transaction Hash
    transactionFee: "18378675031000", // Transaction Fee
    confirmations: 20, // Confirmations
  },
  // Eighteenth transaction: Receiving native crypto (ETH)
  {
    date: "2024-10-14T08:00:00.000000Z", // Timestamp (oldest)
    from: "0x1234...abcd", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 1500000000000000000, // Amount in Wei (1.5 ETH)
    status: "success", // Status: success
    type: "ETH", // Type: ETH (native currency)
    gasPrice: "900000000", // Gas Price
    gasUsed: "21000", // Gas Used
    transactionHash: "0x7f8a9b0c1d2e3f4a5b6c7d8e9a0b1c2", // Transaction Hash
    transactionFee: "18900000000000000", // Transaction Fee
    confirmations: 15, // Confirmations
  },
  // Nineteenth transaction: Sending ERC-721 NFT (Most recent)
  {
    date: "2024-10-14T07:00:00.000000Z", // Timestamp
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    status: "success", // Status: success
    type: "ERC-721", // Type: ERC-721 (NFT transfer)
    gasPrice: "900000000", // Gas Price
    gasUsed: "100000", // Gas Used
    transactionHash: "0x8b9a0c1d2e3f4a5b6c7d8e9a0b1c2d3", // Transaction Hash
    transactionFee: "90000000000000000", // Transaction Fee
    confirmations: 30, // Confirmations
    contractAddress: "0xdef456...789abc", // ERC-721 contract address
    tokenId: "123457", // NFT Token ID
    tokenName: "Vintage Vinyl Record", // Optional: Name of the NFT
  },
  // Twentieth transaction: Receiving ERC-1155 NFT
  {
    date: "2024-10-14T06:00:00.000000Z", // Timestamp
    from: "0x7890...qrst", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 3, // Quantity of ERC-1155 tokens
    status: "success", // Status: success
    type: "ERC-1155", // Type: ERC-1155 (NFT transfer)
    gasPrice: "950000000", // Gas Price
    gasUsed: "110000", // Gas Used
    transactionHash: "0x9c0b1d2e3f4a5b6c7d8e9a0b1c2d3e4", // Transaction Hash
    transactionFee: "104500000000000000", // Transaction Fee
    confirmations: 22, // Confirmations
    contractAddress: "0xghi789...012def", // ERC-1155 contract address
    tokenId: "789013", // NFT Token ID
    tokenName: "Exclusive Access Token", // Optional: Name of the NFT
  },
  // Twenty-first transaction: Sending ERC-20
  {
    date: "2024-10-13T11:00:00.000000Z", // Timestamp
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    amount: 1000000000000000000, // Amount in Tokens (1 ERC-20 token)
    status: "success", // Status: success
    type: "ERC-20", // Type: ERC-20 (token transfer)
    gasPrice: "900000000", // Gas Price
    gasUsed: "52000", // Gas Used
    transactionHash: "0xa0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d", // Transaction Hash
    transactionFee: "50000000000000000", // Transaction Fee
    confirmations: 25, // Confirmations
    contractAddress: "0xabc123...456def", // ERC-20 contract address
    tokenSymbol: "KT", // ERC-20 token symbol
  },
  // Twenty-second transaction: Receiving ERC-20
  {
    date: "2024-10-13T10:00:00.000000Z", // Timestamp
    from: "0x7890...qrst", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 4000000000000000000, // Amount in Tokens (4 ERC-20 tokens)
    status: "success", // Status: success
    type: "ERC-20", // Type: ERC-20 (token transfer)
    gasPrice: "1000000000", // Gas Price
    gasUsed: "50000", // Gas Used
    transactionHash: "0xb1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e", // Transaction Hash
    transactionFee: "45000000000000000", // Transaction Fee
    confirmations: 18, // Confirmations
    contractAddress: "0xabc123...456def", // ERC-20 contract address
    tokenSymbol: "KT", // ERC-20 token symbol
  },
  // Twenty-third transaction: Sending native crypto (ETH)
  {
    date: "2024-10-13T09:00:00.000000Z", // Timestamp
    from: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Sender)
    to: "0x5678...mnop", // Any address (Receiver)
    amount: 2000000000000000000, // Amount in Wei (2.0 ETH)
    status: "success", // Status: success
    type: "ETH", // Type: ETH (native currency)
    gasPrice: "875175002", // Gas Price
    gasUsed: "21000", // Gas Used
    transactionHash: "0xc1d2e3f4a5b6c7d8e9a0b1c2d3e4f5a", // Transaction Hash
    transactionFee: "18378675031000", // Transaction Fee
    confirmations: 20, // Confirmations
  },
  // Twenty-fourth transaction: Receiving native crypto (ETH)
  {
    date: "2024-10-13T08:00:00.000000Z", // Timestamp
    from: "0x1234...abcd", // Any address (Sender)
    to: "0x19a333edf90cf8d2972c264f6d5845f083839aec", // Claire's wallet address (Receiver)
    amount: 2500000000000000000, // Amount in Wei (2.5 ETH)
    status: "success", // Status: success
    type: "ETH", // Type: ETH (native currency)
    gasPrice: "900000000", // Gas Price
    gasUsed: "21000", // Gas Used
    transactionHash: "0xd1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a", // Transaction Hash
    transactionFee: "18900000000000000", // Transaction Fee
    confirmations: 15, // Confirmations
  },
];
