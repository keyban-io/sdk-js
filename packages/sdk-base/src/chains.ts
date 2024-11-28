import * as chains from "viem/chains";

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
 *   accessTokenProvider: () => "your-access-token",
 *   chain: KeybanChain.KeybanTestnet,
 * });
 * ```
 */
export enum KeybanChain {
  /**
   * Keyban Testnet Chain.
   * Primarily used for development and testing purposes. This chain allows simulation of
   * transactions and interactions without affecting the main chain.
   * @example
   * ```typescript
   * const testnetChain = KeybanChain.KeybanTestnet;
   * ```
   */
  KeybanTestnet = "KeybanTestnet",

  /**
   * Polygon Amoy Chain.
   * Represents the Polygon Amoy mainnet, offering fast transactions and reduced fees.
   * Ideal for production applications requiring high performance.
   * @example
   * ```typescript
   * const polygonChain = KeybanChain.PolygonAmoy;
   * ```
   */
  PolygonAmoy = "PolygonAmoy",
}

export interface FeesUnit {
  symbol: string;
  decimals: number;
}

export const viemChainsMap: { [C in KeybanChain]: chains.Chain } = {
  [KeybanChain.KeybanTestnet]: chains.anvil,
  [KeybanChain.PolygonAmoy]: chains.polygonAmoy,
};

export const feesUnitChainsMap: { [C in KeybanChain]: FeesUnit } = {
  [KeybanChain.KeybanTestnet]: {
    symbol: "gwei",
    decimals: 9,
  },
  [KeybanChain.PolygonAmoy]: {
    symbol: "gwei",
    decimals: 9,
  },
};
