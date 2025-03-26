/**
 * @module Client
 */
import type { NormalizedCacheObject } from "@apollo/client/cache";
import type { ApolloClient } from "@apollo/client/core";

import { KeybanAccount } from "~/account";
import type { KeybanApiStatus } from "~/api";
import { createApolloClient } from "~/apollo";
import {
  AuthConnection,
  KeybanClientShareProvider,
  KeybanNetwork,
} from "~/index";
import { type FeesUnit, NativeCurrency } from "~/network";
import { RpcClient } from "~/rpc";

/**
 * Represents a storage provider for the client share.
 *
 * The purpose of `ClientShareProvider` is to provide an interface that allows integrators
 * to save and restore the client share of their customers. The integrator has the
 * responsibility to securely store the client share.
 * @remarks
 * The client share is not considered sensitive data because only the client
 * can use it, and its usage is secured by strong authentication between the client
 * and the Keyban services.
 *
 * ### Example Implementation
 *
 * Below is a basic implementation of a `CustomClientShareProvider` using a fetch-based provider:
 *
 * ```typescript
 * class CustomClientShareProvider implements ClientShareProvider {
 *    // Retrieves the client share data.
 *    // @returns - A promise resolving to the client share string or `null` if unavailable.
 *   async get(): Promise<string | null> {
 *     try {
 *       const response = await fetch("/api/clientShare", {
 *         method: "GET",
 *         headers: { "Content-Type": "application/json" },
 *       });
 *
 *       if (!response.ok) {
 *         console.error("Failed to fetch client share:", response.statusText);
 *         return null;
 *       }
 *
 *       return response.text();
 *     } catch (error) {
 *       console.error("Error retrieving client share:", error);
 *       return null;
 *     }
 *   }
 *
 *
 *   // Saves the client share data.
 *   // @param clientShare - The client share string to store.
 *   // @returns - A promise that resolves when the operation is complete.
 *   async set(clientShare: string): Promise<void> {
 *     try {
 *       const response = await fetch("/api/clientShare", {
 *         method: "POST",
 *         headers: { "Content-Type": "application/json" },
 *         body: JSON.stringify({ clientShare }),
 *       });
 *
 *       if (!response.ok) {
 *         throw new Error(`Failed to save client share: ${response.statusText}`);
 *       }
 *     } catch (error) {
 *       console.error("Error saving client share:", error);
 *       throw error;
 *     }
 *   }
 * }
 * ```
 *
 * This implementation assumes the existence of an API endpoint `/api/clientShare`
 * to manage the client share on the server side. The integrator should ensure that
 * the endpoint is appropriately secured.
 */
export interface ClientShareProvider {
  /**
   * Retrieves the client share information.
   * @returns - A promise that resolves to a string containing the client share, or null if not available.
   */
  get(): Promise<string | null>;
  /**
   * Sets the client share information.
   * @param clientShare - The client share string to set.
   * @returns - A promise that resolves when the client share has been set.
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
  apiUrl?: URL | string;

  /**
   * The application ID.
   */
  appId: string;

  /**
   * The blockchain configuration for Keyban.
   */
  network: KeybanNetwork;

  /**
   * The client share provider.
   */
  clientShareProvider: ClientShareProvider;
};

export type MetadataConfig = {
  network: { rpcUrl: string; indexerUrl: string };
  auth: { domain: string; clientId: string };
};

export abstract class KeybanClientBase {
  /**
   * The Keyban API URL, defaulting to "https://api.keyban.io".
   */
  apiUrl: URL;

  /**
   * The application ID used for authentication with the Keyban API.
   */
  appId: string;

  /**
   * The blockchain used by Keyban.
   */
  network: KeybanNetwork;

  /**
   * The Apollo GraphQL client used for making API requests.
   */
  apolloClient: ApolloClient<NormalizedCacheObject>;

  protected clientShareProvider: ClientShareProvider;
  protected metadataConfig: Promise<MetadataConfig>;

  constructor(
    config: KeybanClientConfig,
    metadataConfig?: Promise<MetadataConfig>,
  ) {
    this.apiUrl = new URL(config.apiUrl ?? "https://api.keyban.io");
    this.appId = config.appId;
    this.network = config.network;

    this.clientShareProvider = config.clientShareProvider;
    if (this.clientShareProvider instanceof KeybanClientShareProvider)
      this.clientShareProvider.registerClient(this);

    const indexerPrefix = {
      [KeybanNetwork.EthereumAnvil]: "subql-ethereum-anvil.",
      [KeybanNetwork.PolygonAmoy]: "subql-polygon-amoy.",
      [KeybanNetwork.StarknetDevnet]: "subql-starknet-devnet.",
      [KeybanNetwork.StarknetSepolia]: "subql-starknet-sepolia.",
      [KeybanNetwork.StarknetMainnet]: "subql-starknet-mainnet.",
      [KeybanNetwork.StellarTestnet]: "subql-stellar-testnet.",
    }[this.network];
    this.apolloClient = createApolloClient(
      new URL(this.apiUrl.origin.replace("api.", indexerPrefix)),
    );

    const metadataUrl = new URL(`/v1/metadata`, this.apiUrl);
    metadataUrl.searchParams.set("network", this.network);
    this.metadataConfig =
      metadataConfig ?? fetch(metadataUrl).then((res) => res.json());
  }

  protected get rpcClient() {
    return RpcClient.getInstance(this);
  }

  /**
   * Retrieves the native currency details associated with the current chain.
   *
   * This getter returns an object that includes the native currency's name, symbol, and decimal precision for the respective blockchain
   * as defined by the `this.chain` property. Each blockchain in the supported list (e.g., EthereumAnvil, PolygonAmoy, StarknetDevnet, etc.)
   * has its unique configuration, which is used to construct the returned object.
   * @returns The native currency information for the current chain.
   */
  get nativeCurrency(): NativeCurrency {
    return {
      [KeybanNetwork.EthereumAnvil]: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      [KeybanNetwork.PolygonAmoy]: {
        name: "POL",
        symbol: "POL",
        decimals: 18,
      },
      [KeybanNetwork.StarknetDevnet]: {
        name: "Starknet Token",
        symbol: "STRK",
        decimals: 18,
      },
      [KeybanNetwork.StarknetSepolia]: {
        name: "StarkNet Token",
        symbol: "STRK",
        decimals: 18,
      },
      [KeybanNetwork.StarknetMainnet]: {
        name: "StarkNet Token",
        symbol: "STRK",
        decimals: 18,
      },
      [KeybanNetwork.StellarTestnet]: {
        name: "Stellar Token",
        symbol: "XLM",
        decimals: 6,
      },
    }[this.network];
  }

  /**
   * Retrieves the fee unit configuration based on the current blockchain chain.
   *
   * This getter returns an object that maps supported blockchain chains to their respective
   * fee unit details, including the currency symbol and the number of decimal places.
   * The fee unit is selected according to the chain specified in `this.chain`.
   * @remarks
   * Supported configurations include:
   * - EthereumAnvil & PolygonAmoy with unit "gwei" and 9 decimals.
   * - StarknetDevnet, StarknetSepolia, & StarknetMainnet with unit "FRI" and 18 decimals.
   * - StellarTestnet with unit "stroop" and 6 decimals.
   * @returns An object containing the fee unit configuration for the active chain.
   */
  get feesUnit(): FeesUnit {
    return {
      [KeybanNetwork.EthereumAnvil]: {
        symbol: "gwei",
        decimals: 9,
      },
      [KeybanNetwork.PolygonAmoy]: {
        symbol: "gwei",
        decimals: 9,
      },
      [KeybanNetwork.StarknetDevnet]: {
        symbol: "FRI",
        decimals: 18,
      },
      [KeybanNetwork.StarknetSepolia]: {
        symbol: "FRI",
        decimals: 18,
      },
      [KeybanNetwork.StarknetMainnet]: {
        symbol: "FRI",
        decimals: 18,
      },
      [KeybanNetwork.StellarTestnet]: {
        symbol: "stroop",
        decimals: 6,
      },
    }[this.network];
  }

  /**
   * Performs a health check on the Keyban API to determine its operational status.
   * @returns - A promise resolving to the API status, either `"operational"` or `"down"`.
   * @example
   * ```typescript
   * const status = await client.apiStatus();
   * console.log(`API Status: ${status}`);
   * ```
   * @throws {Error} Throws an error if the health check request fails.
   * @see {@link KeybanApiStatus}
   */
  async apiStatus(): Promise<KeybanApiStatus> {
    return fetch(new URL("/health/ready", this.apiUrl))
      .then((res) => (res.ok ? "operational" : "down"))
      .catch((err) => {
        console.error("Failed to perform health check", err);
        return "down";
      });
  }

  /**
   * Initiates the login process by opening a popup window for user authentication.
   * @param [connection] - Optional authentication connection details.
   * @returns - A promise that resolves when the user is authenticated or the popup is closed.
   */
  async login(connection?: AuthConnection) {
    const loginUrl = await this.rpcClient.call(
      "auth",
      "getLoginUrl",
      connection,
    );

    const width = 500;
    const height = 685;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const popup = window.open(
      loginUrl,
      `keyban:auth:${this.appId}`,
      `left=${left},top=${top},width=${width},height=${height},popup,resizable,scrollbars`,
    );

    // Setup our handler for when user is fully authenticated
    const authenticatedPromise = new Promise<void>((resolve) => {
      const handler = (event: MessageEvent) => {
        if (event.origin !== this.apiUrl.origin) return;
        if (event.data !== "keyban:auth:isAuthenticated") return;

        window.removeEventListener("message", handler);

        resolve();
      };

      window.addEventListener("message", handler);
    });

    // Wait for popup to be closed
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (!popup?.closed) return;

        clearInterval(interval);
        resolve();
      }, 100);
    });

    // Wait for user to be authenticated or timeout
    await Promise.race([
      authenticatedPromise,
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);
  }

  async logout() {
    const logoutUrl = await this.rpcClient.call(
      "auth",
      "getLogoutUrl",
      window.location.href,
    );

    const width = 500;
    const height = 685;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const popup = window.open(
      logoutUrl,
      `keyban:auth:${this.appId}`,
      `left=${left},top=${top},width=${width},height=${height},popup,resizable,scrollbars`,
    );

    // Wait for popup to be closed
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (!popup?.closed) return;

        clearInterval(interval);
        resolve();
      }, 100);
    });
  }

  /**
   * Checks whether the client is authenticated.
   * @returns A Promise that resolves to the result of the authentication check.
   */
  async isAuthenticated() {
    return this.rpcClient.call("auth", "isAuthenticated");
  }

  /**
   * Retrieves the current user information.
   * @returns A Promise resolving with the user data retrieved from the server.
   */
  async getUser() {
    return this.rpcClient.call("auth", "getUser");
  }

  /**
   * Claims a TPP for a given recipient.
   * @param tppId - The identifier of the Tokenized Product Passport (TPP) to claim.
   * @param recipient - The recipient (the address) for which the claim is to be made.
   * @returns A promise that resolves with the result of the RPC call.
   */
  async tppClaim(tppId: string, recipient: string) {
    return this.rpcClient.call("tpp", "claim", tppId, recipient);
  }

  /**
   * Initializes a `KeybanAccount` associated with the current client.
   * This method sets up the account by retrieving or generating the client share,
   * and prepares the account for transactions and other operations.
   * @returns - A promise that resolves to an instance of `KeybanAccount`.
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
 *   network: KeybanNetwork.EthereumAnvil,
 * });
 *
 * // Initialize an account
 * const account = await client.initialize();
 * ```
 * @see {@link KeybanAccount}
 */
export class KeybanClient extends KeybanClientBase {
  #client: Promise<KeybanClientBase>;

  #pendingAccounts: Map<string, Promise<KeybanAccount>> = new Map();

  /**
   * Creates a new instance of `KeybanClient`.
   * @param config - The configuration object to initialize the client.
   * @throws {SdkError} If the configuration is invalid.
   * @example
   * ```typescript
   * const client = new KeybanClient({
   *   apiUrl: "https://api.keyban.io",
   *   appId: "your-app-id",
   *   network: KeybanNetwork.EthereumAnvil,
   * });
   * ```
   */
  constructor(config: KeybanClientConfig) {
    super(config);

    this.#client = {
      [KeybanNetwork.EthereumAnvil]: () =>
        import("~/evm").then(
          ({ KeybanEvmClient }) =>
            new KeybanEvmClient(config, this.metadataConfig),
        ),
      [KeybanNetwork.PolygonAmoy]: () =>
        import("~/evm").then(
          ({ KeybanEvmClient }) =>
            new KeybanEvmClient(config, this.metadataConfig),
        ),
      [KeybanNetwork.StarknetDevnet]: () =>
        import("~/starknet").then(
          ({ StarknetClient }) =>
            new StarknetClient(config, this.metadataConfig),
        ),
      [KeybanNetwork.StarknetSepolia]: () =>
        import("~/starknet").then(
          ({ StarknetClient }) =>
            new StarknetClient(config, this.metadataConfig),
        ),
      [KeybanNetwork.StarknetMainnet]: () =>
        import("~/starknet").then(
          ({ StarknetClient }) =>
            new StarknetClient(config, this.metadataConfig),
        ),
      [KeybanNetwork.StellarTestnet]: () =>
        import("~/stellar").then(
          ({ StellarClient }) => new StellarClient(config, this.metadataConfig),
        ),
    }[this.network]();
  }

  async initialize() {
    const sub = "WHATEVER";

    const pending = this.#pendingAccounts.get(sub);
    if (pending) return pending;

    const promise = this.#client.then((client) => client.initialize());

    this.#pendingAccounts.set(sub, promise);
    promise.catch(() => {}).finally(() => this.#pendingAccounts.delete(sub));

    return promise;
  }
}
