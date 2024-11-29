# Keyban JavaScript SDK

## Overview

The Keyban JavaScript SDK provides the core functionality for Keyban's MPC wallet solution, simplifying the development of web and Node.js applications. It offers essential configurations, utilities, and functions that serve as the foundation for creating decentralized wallet experiences.

## Key Features

- **TypeScript Support**: Fully typed to enhance code quality and development experience.
- **Flexible Storage**: Developers can use custom storage solutions, with more options planned in future releases.
- **Blockchain Support**: Supports Polygon Amoy testnet (Mainnet support to be added in future releases).
- **Bundling**: Efficiently bundled using `tsup` for optimized builds in development and production.

## Installation

```bash
npm install @keyban/sdk-base
```

## Basic Example

The following example demonstrates how to initialize the SDK, retrieve account information, estimate transaction fees, and perform token transfers.

```ts
import { KeybanClient } from '@keyban/sdk-base';

const client = new KeybanClient({
  appId: "your-keyban-app-id",  // Your Keyban application ID
  accessTokenProvider: async () => "user's access token",  // Function to provide the access token
  chain: KeybanChain.PolygonAmoy,  // Polygon testnet is supported for now
  storage: MyStorage,  // Custom storage solution (more options coming soon)
});

const account = await client.init();

// Fetch native balance
const balance = await account.getBalance();

// Estimate transaction fees and perform a native token transfer
const { maxFees, details } = await account.estimateTransfer("0x...address..");
await account.transfer("0x...address...", 1000n);  // Transfer native tokens

// Retrieve ERC20 token balances
const tokenBalance = await account.getTokenBalances();

// Estimate fees and perform an ERC20 token transfer
const { maxFees: erc20MaxFees, details: erc20Details } = await account.estimateERC20Transfer({
  contractAddress: "0x...",  // ERC20 contract address
  to: "0x...",  // Recipient address
  value: 1000n,  // Amount to transfer
});
await account.transferERC20({
  contractAddress: "0x...",
  to: "0x...",
  value: 1000n,
});
```

### Supported Blockchains

In this initial release, only Ethereum testnets are supported:

- **Polygon Testnet**: `KeybanChain.PolygonAmoy`

Support for Ethereum Mainnet will be introduced in future releases.

### Custom Storage and Signing

Developers can define their own storage and signing strategies. The SDK offers flexibility with the `IKeybanStorage` interface, enabling integration with custom storage mechanisms. Future releases will bring more built-in storage options.

## Documentation

For more detailed API references and advanced features, visit the official [Keyban API Reference Portal](https://docs.demo.keyban.io/api/References).
