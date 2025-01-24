/**
 * @module Chains
 */

/**
 * @enum {string}
 * The `KeybanChain` enumeration defines the various blockchain networks supported by the Keyban SDK.
 * Each member of the enumeration represents a specific blockchain network identified by its unique name.
 * @remarks
 * Use this enumeration to specify the blockchain network you wish to interact with when utilizing
 * the different functionalities of the Keyban SDK, such as account management, transactions, and NFTs.
 * @example
 * ```typescript
 * import { KeybanClient, KeybanChain } from '@keyban/sdk';
 *
 * const client = new KeybanClient({
 *   apiUrl: "https://api.keyban.io",
 *   appId: "your-app-id",
 *   chain: KeybanChain.EthereumAnvil,
 * });
 * ```
 */
export enum KeybanChain {
  /**
   * Ethereum Anvil Chain.
   * Primarily used for development and testing purposes. This chain allows simulation of
   * transactions and interactions without affecting the main chain.
   */
  EthereumAnvil = "EthereumAnvil",

  /**
   * Polygon Amoy Chain.
   * Represents the Polygon Amoy mainnet, offering fast transactions and reduced fees.
   * Ideal for production applications requiring high performance.
   */
  PolygonAmoy = "PolygonAmoy",

  /**
   * Starknet Devnet Chain.
   */
  StarknetDevnet = "StarknetDevnet",

  /**
   * Starknet Sepolia Chain.
   */
  StarknetSepolia = "StarknetSepolia",
}

/**
 * Represents the unit of fees in a specific blockchain.
 * @property {string} symbol - The symbol of the fee unit (e.g., "gwei").
 * @property {number} decimals - The number of decimal places for the fee unit.
 */
export type FeesUnit = {
  symbol: string;
  decimals: number;
};

/**
 * Represents the native currency of a blockchain network.
 * @property {string} name - The name of the native currency (e.g., "Ether").
 * @property {string} symbol - The symbol of the native currency (e.g., "ETH").
 * @property {number} decimals - The number of decimal places the currency can be divided into.
 * @example
 * const nativeCurrency = {
 *   name: "Ether",
 *   symbol: "ETH",
 *   decimals: 18
 * };
 * @example
 * const nativeCurrency = {
 *   name: "Bitcoin",
 *   symbol: "BTC",
 *   decimals: 8
 * };
 */
export type NativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
};
