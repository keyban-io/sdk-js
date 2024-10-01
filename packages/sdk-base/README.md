# Keyban SDK Base

## Overview

Keyban SDK Base is a foundational package designed to simplify the development of web applications with Node.js and React. It provides essential configurations and utilities for working with Keyban's MPC wallet solution, streamlining project setup and development.

## Features

- **TypeScript Support**: Fully typed with TypeScript for type safety and improved development experience.
- **Flexible Storage**: While additional storage options will be introduced in future releases, you can start with a custom or local storage solution.
- **Blockchain Support**: Supports testnet blockchain networks such as Ethereum Sepolia (Mainnet not yet available).
- **Bundling**: Uses `tsup` for efficient bundling.

## Install

```bash
npm i @keyban/sdk-base
```

## Usage

Here's a basic example of how to use Keyban SDK Base in your project:

```ts
import { KeybanClient } from '@keyban/sdk-base';

const client = new KeybanClient({
  appId: "your keyban app ID",  // Use your Keyban app ID here
  accessTokenProvider: async () => "user's access token",  // Define how to retrieve the access token
  chain: KeybanChain.Sepolia,  // For now, only Sepolia testnet is supported
  storage: MyStorage,  // Use a custom storage solution (future options will be available)
});

const account = await client.init();

// Get account balance
const balance = await account.getBalance();

// Estimate fees and transfer native currency
const { maxFees, details } = await account.estimateTransfer("0x...address..");
await account.transfer("0x...address...", 1000n);  // Transfer native currency

// Get token balances
const tokenBalance = await account.getTokenBalances();

// Estimate fees and transfer ERC20 tokens
const { maxFees: erc20MaxFees, details: erc20Details } = await account.estimateERC20Transfer({
  contractAddress: "0x...",  // Contract address of the ERC20 token
  to: "0x...",  // Recipient address
  value: 1000n,  // Amount to transfer
});
await account.transferERC20({
  contractAddress: "0x...",  // Contract address of the ERC20 token
  to: "0x...",  // Recipient address
  value: 1000n,  // Amount to transfer
});
```

### Available Chains

In this initial release, only testnets are supported:
- `KeybanChain.Sepolia` (Ethereum testnet)

Ethereum Mainnet will be available in future releases.

### Custom Storage and Signing

You can implement your own storage solution by conforming to the `IKeybanStorage` interface. Additional storage mechanisms will be introduced in future updates, allowing you to have greater flexibility when managing user data.

## Documentation

For detailed documentation and API references, visit the official [Keyban API Reference Portal](https://docs.demo.keyban.io/api/References).
