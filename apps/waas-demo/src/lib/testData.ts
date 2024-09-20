export const testNFTs = [
  {
    id: "1",
    name: "NFT Artwork 1",
    imageUrl: "./images/nft-1.webp",
  },
  {
    id: "2",
    name: "NFT Artwork 2",
    imageUrl: "./images/nft-2.webp",
  },
  {
    id: "3",
    name: "NFT Artwork 3",
    imageUrl: "./images/nft-3.webp",
  },
  {
    id: "4",
    name: "NFT Artwork 4",
    imageUrl: "./images/nft-4.webp",
  },
  {
    id: "5",
    name: "NFT Artwork 5",
    imageUrl: "./images/nft-5.webp",
  },
];

export const testTransactions = [
  // Transactions existantes
  {
    date: "2024-07-21",
    crypto: "Non-Native",
    toFrom: "0x1234...abcd",
    amount: "5 DAI",
    status: "Sent",
  },
  {
    date: "2024-07-20",
    crypto: "Native",
    toFrom: "0x5678...efgh",
    amount: "0.1 POL",
    status: "Pending",
  },
  {
    date: "2024-07-20",
    crypto: "NFT",
    toFrom: "0x9abc...def0",
    amount: "Cool Art 1",
    status: "Received",
  },
  {
    date: "2024-07-19",
    crypto: "Non-Native",
    toFrom: "0x4567...ijkl",
    amount: "0.5 ETH",
    status: "Received",
  },
  // Nouveaux cas ajoutés pour couvrir davantage de scénarios
  {
    date: "2024-07-18",
    crypto: "Native",
    toFrom: "0x9876...mnop",
    amount: "20 POL",
    status: "Sent",
  },
  {
    date: "2024-07-17",
    crypto: "NFT",
    toFrom: "0xabcd...efgh",
    amount: "Rare NFT 1",
    status: "Pending",
  },
  {
    date: "2024-07-16",
    crypto: "Native",
    toFrom: "0x1234...abcd",
    amount: "10 POL",
    status: "Received",
  },
  {
    date: "2024-07-15",
    crypto: "NFT",
    toFrom: "0x5678...ijkl",
    amount: "Legendary NFT",
    status: "Sent",
  },
  {
    date: "2024-07-14",
    crypto: "Non-Native",
    toFrom: "0x9876...mnop",
    amount: "100 USDC",
    status: "Pending",
  },
  {
    date: "2024-07-13",
    crypto: "Non-Native",
    toFrom: "0x4321...dcba",
    amount: "0.2 BTC",
    status: "Received",
  },
  {
    date: "2024-07-12",
    crypto: "Native",
    toFrom: "0xabcd...efgh",
    amount: "3 POL",
    status: "Sent",
  },
  // Cas avec un statut non géré
  {
    date: "2024-07-11",
    crypto: "Non-Native",
    toFrom: "0x5678...ijkl",
    amount: "Unknown Amount",
    status: "Unknown",
  },
];
