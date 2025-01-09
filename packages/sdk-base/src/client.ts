/**
 * @module Client
 */
import type { NormalizedCacheObject } from "@apollo/client/cache";
import type { ApolloClient } from "@apollo/client/core";

import { KeybanAccount } from "~/account";
import type { KeybanApiStatus } from "~/api";
import { createApolloClient } from "~/apollo";
import { type FeesUnit, NativeCurrency } from "~/chains";
import { KeybanChain } from "~/index";
import { RpcClient } from "~/rpc";

/**
 * Represents a storage provider for the client share.
 *
 * The purpose of `ClientShareProvider` is to provide an interface that allows integrators
 * to save and restore the client share of their customers. The integrator has the
 * responsibility to securely store the client share.
 * @remark: The client share is not considered sensitive data because only the client
 * can use it, and its usage is secured by strong authentication between the client
 * and the Keyban services.
 *
 * ### Example Implementation
 *
 * Below is a basic implementation of the `ClientShareProvider` using a custom fetch-based provider:
 *
 * ```typescript
 * class ClientShareProvider extends FetchBaseProvider{
 *
 *   // Retrieving data (GET)
 *   async get(): Promise<string | null> {
 *     return this.fetch("/api/clientShare", {
 *       method: "GET",
 *     });
 *   }
 *
 *   // Sending/Saving data (POST or PUT)
 *   async set(clientShare: string): Promise<void> {
 *     await this.fetch("/api/clientShare", {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: clientShare,
 *     });
 *   }
 * }
 *
 * export default ClientShareProvider;
 * ```
 *
 * This implementation assumes the existence of an API endpoint `/api/clientShare`
 * to manage the client share on the server side. The integrator should ensure that
 * the endpoint is appropriately secured.
 */
export interface ClientShareProvider {
  /**
   * Retrieves the client share information.
   * @returns A promise that resolves to a string containing the client share, or null if not available.
   */
  get(): Promise<string | null>;
  /**
   * Sets the client share information.
   * @param clientShare - The client share string to set.
   * @returns A promise that resolves when the client share has been set.
   */
  set(clientShare: string): Promise<unknown>;
}

/**
 * Configuration options for initializing the Keyban client.
 */
export type KeybanClientConfig = {
  /**
   * The base URL of the API. Optional. Defaults to "https://api.keyban.io" if not provided.
   */
  apiUrl?: string;

  /**
   * The application ID.
   */
  appId: string;

  /**
   * The client share provider.
   */
  clientShareProvider: ClientShareProvider;

  /**
   * The blockchain configuration for Keyban.
   */
  chain: KeybanChain;
};

export abstract class KeybanClientBase {
  /**
   * The Keyban API URL, defaulting to "https://api.keyban.io".
   */
  apiUrl: string;

  /**
   * The application ID used for authentication with the Keyban API.
   */
  appId: string;

  /**
   * The blockchain used by Keyban.
   */
  chain: KeybanChain;

  protected clientShareProvider: ClientShareProvider;
  protected rpcClient: RpcClient;

  /**
   * The Apollo GraphQL client used for making API requests.
   */
  apolloClient: ApolloClient<NormalizedCacheObject>;

  /**
   * Creates a new instance of `KeybanClient`.
   * @param config - The configuration object to initialize the client.
   * @throws {SdkError} If the configuration is invalid.
   * @example
   * ```typescript
   * const client = new KeybanClient({
   *   apiUrl: "https://api.keyban.io",
   *   appId: "your-app-id",
   *   clientShareProvider: () => "your-client-shares-provider",
   *   chain: KeybanChain.KeybanTestnet,
   * });
   * ```
   */
  constructor(config: KeybanClientConfig) {
    const {
      apiUrl = "https://api.keyban.io",
      appId,
      clientShareProvider,
      chain,
    } = config;

    this.apiUrl = apiUrl;
    this.appId = appId;
    this.chain = chain;
    this.clientShareProvider = clientShareProvider;

    const rpcUrl = new URL("/signer-client/", apiUrl);
    rpcUrl.searchParams.set("appId", appId);
    this.rpcClient = new RpcClient(rpcUrl);

    const indexerPrefix = {
      [KeybanChain.KeybanTestnet]: "subql-anvil.",
      [KeybanChain.PolygonAmoy]: "subql-polygon-amoy.",
      [KeybanChain.Starknet]: "subql-???.",
    }[chain];
    this.apolloClient = createApolloClient(
      new URL(apiUrl.replace("api.", indexerPrefix)),
    );
  }

  get nativeCurrency(): NativeCurrency {
    return {
      [KeybanChain.KeybanTestnet]: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      [KeybanChain.PolygonAmoy]: {
        name: "POL",
        symbol: "POL",
        decimals: 18,
      },
      [KeybanChain.Starknet]: {
        name: "???",
        symbol: "???",
        decimals: 18,
      },
    }[this.chain];
  }

  get feesUnit(): FeesUnit {
    return {
      [KeybanChain.KeybanTestnet]: {
        symbol: "gwei",
        decimals: 9,
      },
      [KeybanChain.PolygonAmoy]: {
        symbol: "gwei",
        decimals: 9,
      },
      [KeybanChain.Starknet]: {
        symbol: "????",
        decimals: 9,
      },
    }[this.chain];
  }

  /**
   * Performs a health check on the Keyban API to determine its operational status.
   * @returns A promise resolving to the API status, either `"operational"` or `"down"`.
   * @example
   * ```typescript
   * const status = await client.apiStatus();
   * console.log(`API Status: ${status}`);
   * ```
   * @throws {Error} Throws an error if the health check request fails.
   * @see {@link KeybanApiStatus}
   */
  async apiStatus(): Promise<KeybanApiStatus> {
    return fetch(`${this.apiUrl}/health`)
      .then((res) => (res.ok ? "operational" : "down"))
      .catch((err) => {
        console.error("Failed to perform health check", err);
        return "down";
      });
  }

  async login() {
    window.location.href = await this.rpcClient.call(
      "auth",
      "getLoginUrl",
      window.location.href,
    );
  }

  async logout() {
    window.location.href = await this.rpcClient.call(
      "auth",
      "getLogoutUrl",
      window.location.href,
    );
  }

  async isAuthenticated() {
    return this.rpcClient.call("auth", "isAuthenticated");
  }

  /**
   * Initializes a `KeybanAccount` associated with the current client.
   * This method sets up the account by retrieving or generating the client share,
   * and prepares the account for transactions and other operations.
   * @returns A promise that resolves to an instance of `KeybanAccount`.
   * @throws {SdkError} If initialization fails due to signing errors.
   * @example
   * ```typescript
   * const account = await client.initialize();
   * console.log(`Account address: ${account.address}`);
   * ```
   * @see {@link KeybanAccount}
   */
  abstract initialize(): Promise<KeybanAccount>;
}

/**
 * Main client for interacting with the Keyban API and associated services.
 * This class provides methods to initialize accounts, retrieve balances, query NFTs,
 * and interact with the Keyban blockchain.
 * @remarks
 * The `KeybanClient` serves as the primary interface for developers to interact with
 * the Keyban ecosystem. It handles authentication, communication with the Keyban API,
 * and provides utility methods for common tasks.
 * @example
 * ```typescript
 * // Initialize the client
 * const client = new KeybanClient({
 *   apiUrl: "https://api.keyban.io",
 *   appId: "your-app-id",
 *   accessTokenProvider: () => "your-access-token",
 *   chain: KeybanChain.KeybanTestnet,
 * });
 *
 * // Initialize an account
 * const account = await client.initialize();
 * ```
 * @see {@link KeybanAccount}
 */
export class KeybanClient extends KeybanClientBase {
  #client: Promise<KeybanClientBase>;

  constructor(config: KeybanClientConfig) {
    super(config);

    this.#client = {
      [KeybanChain.KeybanTestnet]: () =>
        import("~/evm").then(
          ({ KeybanEvmClient }) => new KeybanEvmClient(config),
        ),
      [KeybanChain.PolygonAmoy]: () =>
        import("~/evm").then(
          ({ KeybanEvmClient }) => new KeybanEvmClient(config),
        ),
      [KeybanChain.Starknet]: () =>
        import("~/starknet").then(
          ({ KeybanStarknetClient }) => new KeybanStarknetClient(config),
        ),
    }[this.chain]();
  }

  async initialize() {
    return this.#client.then((client) => client.initialize());
  }
}
