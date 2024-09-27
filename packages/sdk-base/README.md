# Keyban SDK Base

## Overview

SDK Base from Keyban MPC wallet is a foundational package designed to simplify the development of web applications with Node.js and React.
This package provides essential configurations and utilities to streamline your project setup and development process.

## Features

- **TypeScript Support**: Fully typed with TypeScript for type safety and improved development experience.
- **Bundling**: Uses tsup for efficient bundling.

## Install

```sh
npm i @keyban/sdk-base
```

## Usage

Here's a basic example of how to use Keyban SDK Base in your project:

```ts
import { KeybanClient } from '@keyban/sdk-base';

const client = new KeybanClient({
  appId: "your keyban app ID";
  accessTokenProvider: async () => "user's access token";
  chain: KeybanChain.Sepolia,
  storage: MyStorage,
});

const account = await client.init();

const balance = await account.getBalance();
const { maxFees, details } = await account.estimateTransfer("0x...address..");
await account.transfer("0x...address...", 1000n);

const balance = await account.getTokenBalances();
const { maxFees, details } = await account.estimateERC20Transfer({
  contractAddress: "0x...",
  to: "0x...",
  value: 1000n,
});
await account.transferERC20({
  contractAddress: "0x...",
  to: "0x...",
  value: 1000n,
});
```
