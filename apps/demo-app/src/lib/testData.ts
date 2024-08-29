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
  {
    date: "2024-07-21",
    type: "Sent",
    crypto: "Non-Native",
    toFrom: "0x1234...abcd",
    amount: "5 DAI",
    status: "Sent",
  },
  {
    date: "2024-07-20",
    type: "Pending",
    crypto: "Native",
    toFrom: "0x5678...efgh",
    amount: "0.1 POL",
    status: "Pending",
  },
  {
    date: "2024-07-20",
    type: "Received",
    crypto: "NFT",
    toFrom: "0x9abc...def0",
    amount: "Cool Art 1",
    status: "Received",
  },
  {
    date: "2024-07-19",
    type: "Received",
    crypto: "Non-Native",
    toFrom: "0x4567...ijkl",
    amount: "0.5 ETH",
    status: "Received",
  },
];

export const testEnvs = [
  {
    id: "1",
    name: "Dev",
    apiUrl: "https://keyban.localtest.me",
  },
  {
    id: "2",
    name: "Testing",
    apiUrl: "https://testing.keyban.io",
  },
];
