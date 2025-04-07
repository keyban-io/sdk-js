# Keyban JavaScript SDK

## Overview

The Keyban JavaScript SDK provides the core functionality for Keyban's MPC wallet solution, simplifying the development of web and Node.js applications. It offers essential configurations, utilities, and functions that serve as the foundation for creating decentralized wallet experiences.

## Key Features

- **TypeScript Support**: Fully typed to enhance code quality and development experience.
- **Flexible Storage**: Support for custom storage solutions, with built-in options coming soon.
- **Blockchain Support**: Supports Ethereum testnets and the Polygon Amoy testnet.
- **ERC-20, ERC-721, and ERC-1155 Support**: Transfer and interact with ERC-20 tokens and NFTs (ERC-721 and ERC-1155).
- **Bundling**: Efficiently bundled using `tsup` for optimized builds in development and production.

## Installation

```bash
npm install @keyban/sdk-base
```

## Basic Example

### Initialize the SDK

```ts
import { KeybanClient, KeybanNetwork, KeybanAccount } from '@keyban/sdk-base';

const client = new KeybanClient({
  appId: "your-keyban-app-id",                 // Your Keyban application ID
  network: KeybanNetwork.EthereumAnvil,            // Select the desired blockchain network
});
```

### Retrieve Account Information

```ts
const account: KeybanAccount = await client.initialize();
```

### Estimate Transaction Fees

```ts
const transferEstimate = await account.estimateTransfer("0xRecipientAddress", BigInt('1000000000000000000')); // 1 ETH in wei
```

### Perform Token Transfer

```ts
await account.transfer("0xRecipientAddress", BigInt('1000000000000000000'));
console.log(`Transferred 1 ETH to 0xRecipientAddress`);
```

### Retrieve ERC-20 Token Balances

```ts
const tokenBalances = await client.getTokenBalances(account.address);
console.log('ERC-20 Token Balances:', tokenBalances);
```

### Perform ERC-20 Token Transfer

```ts
const erc20Estimate = await account.estimateERC20Transfer({
  contractAddress: "0xTokenContractAddress",   // ERC-20 contract address
  to: "0xRecipientAddress",                    // Recipient address
  value: BigInt('500000000000000000'),         // Amount to transfer (0.5 tokens in wei)
});
await account.transferERC20({
  contractAddress: "0xTokenContractAddress",
  to: "0xRecipientAddress",
  value: BigInt('500000000000000000'),
});
console.log(`Transferred 0.5 tokens to 0xRecipientAddress`);
```

### Retrieve NFTs Owned by the Account

```ts
const nfts = await client.getNfts(account.address);
console.log('Owned NFTs:', nfts);
```

### Perform NFT Transfer

```ts
const nftEstimate = await account.estimateNftTransfer({
  contractAddress: "0xNftContractAddress",
  to: "0xRecipientAddress",
  tokenId: BigInt(1),                          // Token ID
  standard: 'ERC721',                          // 'ERC721' or 'ERC1155'
});
await account.transferNft({
  contractAddress: "0xNftContractAddress",
  to: "0xRecipientAddress",
  tokenId: BigInt(1),
  standard: 'ERC721',
});
console.log(`Transferred NFT with Token ID 1 to 0xRecipientAddress`);
```

## Supported Blockchains

The Keyban SDK supports the following blockchains:

- **Ethereum anvil**: `KeybanNetwork.EthereumAnvil`
- **Polygon Amoy Testnet**: `KeybanNetwork.PolygonAmoy`
- **Starknet Devnet**: `KeybanNetwork.StarknetDevnet`
- **Starknet Sepolia Testnet**: `KeybanNetwork.StarknetSepolia`
- **Starknet Mainnet**: `KeybanNetwork.StarknetMainnet`

Support for additional blockchains and mainnets will be introduced in future releases.

## Custom Storage and Signing

Developers can define their own storage and signing strategies. The SDK offers flexibility with custom storage mechanisms, and future releases will bring more built-in storage options.

## Documentation

For more detailed API references and advanced features, visit the official [Keyban API Reference Portal](https://docs.keyban.io/api/sdk-base/).
