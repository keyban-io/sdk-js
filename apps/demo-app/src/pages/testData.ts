export const testNFTs = [
  {
    id: '1',
    name: 'NFT Artwork 1',
    imageUrl: 'https://via.placeholder.com/200x200.png?text=NFT+1',
  },
  {
    id: '2',
    name: 'NFT Artwork 2',
    imageUrl: 'https://via.placeholder.com/200x200.png?text=NFT+2',
  },
  {
    id: '3',
    name: 'NFT Artwork 3',
    imageUrl: 'https://via.placeholder.com/200x200.png?text=NFT+3',
  },
  {
    id: '4',
    name: 'NFT Artwork 4',
    imageUrl: 'https://via.placeholder.com/200x200.png?text=NFT+4',
  },
];

export const testTransactions = [
  {
    date: '2024-07-21',
    type: 'Sent',
    crypto: 'Non-Native',
    toFrom: '0x1234...abcd',
    amount: '5 DAI',
    status: 'Sent',
  },
  {
    date: '2024-07-20',
    type: 'Pending',
    crypto: 'Native',
    toFrom: '0x5678...efgh',
    amount: '0.1 MATIC',
    status: 'Pending',
  },
  {
    date: '2024-07-20',
    type: 'Received',
    crypto: 'NFT',
    toFrom: '0x9abc...def0',
    amount: 'Cool Art 1',
    status: 'Received',
  },
  {
    date: '2024-07-19',
    type: 'Received',
    crypto: 'Non-Native',
    toFrom: '0x4567...ijkl',
    amount: '0.5 ETH',
    status: 'Received',
  },
];

export const testNetworks = [
  {
    id: '1',
    name: 'Ethereum Mainnet',
  },
  {
    id: '2',
    name: 'Polygon',
  },
  {
    id: '3',
    name: 'Binance Smart Chain',
  },
];

export const testCryptos = [
  {
    name: 'AAVE',
    balance: 0.005,
  },
  {
    name: 'LINK',
    balance: 0.2,
  },
];
