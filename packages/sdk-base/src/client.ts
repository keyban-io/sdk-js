import type { NormalizedCacheObject } from "@apollo/client/cache";
import type { ApolloClient } from "@apollo/client/core";
import type { Chain, PublicClient, Transport } from "viem";
import {
  createPublicClient,
  createWalletClient,
  hashMessage,
  hashTypedData,
  http,
  isAddress,
  keccak256,
  parseSignature,
  serializeTransaction,
} from "viem";
import { publicKeyToAddress, toAccount } from "viem/accounts";

import { KeybanAccount } from "~/account";
import type { KeybanApiStatus } from "~/api";
import { createApolloClient } from "~/apollo";
import { type FeesUnit, feesUnitChainsMap, viemChainsMap } from "~/chains";
import { SdkError, SdkErrorTypes } from "~/errors";
import {
  walletAssetTransfersDocument,
  walletBalanceDocument,
  walletNftDocument,
  walletNftsDocument,
  walletTokenBalancesDocument,
} from "~/graphql";
import { type Address, KeybanChain } from "~/index";
import { RpcClient } from "~/rpc";
import { parseJwt } from "~/utils/jwt";

/**
 * Configuration options for the Keyban client.
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
   * A function that provides the access token, either synchronously or asynchronously.
   */
  accessTokenProvider: () => string | Promise<string>;

  /**
   * The blockchain configuration for Keyban.
   */
  chain: KeybanChain;
};

/**
 * Arguments for paginating a collection.
 *
 * @property {number} [first] - The maximum number of items to retrieve in the current page.
 * @property {string} [after] - A cursor representing the starting point for the next page of items.
 */
export type PaginationArgs = {
  first?: number;
  after?: string;
};

/**
 * Main client for interacting with the Keyban API and associated services.
 * This class provides methods to initialize accounts, retrieve balances, query NFTs,
 * and interact with the Keyban blockchain.
 *
 * @remarks
 * The `KeybanClient` serves as the primary interface for developers to interact with
 * the Keyban ecosystem. It handles authentication, communication with the Keyban API,
 * and provides utility methods for common tasks.
 *
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
 *
 * // Get balance
 * const balance = await client.getBalance(account.address);
 * console.log(`Balance: ${balance}`);
 * ```
 *
 * @see {@link KeybanAccount}
 * @see {@link useKeybanClient}
 */
export class KeybanClient {
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

  /**
   * Represents the native currency of a blockchain network.
   *
   * @property {string} name - The name of the native currency (e.g., "Ether").
   * @property {string} symbol - The symbol of the native currency (e.g., "ETH").
   * @property {number} decimals - The number of decimal places the currency can be divided into.
   *
   * @example
   * const nativeCurrency = {
   *   name: "Ether",
   *   symbol: "ETH",
   *   decimals: 18
   * };
   *
   * @example
   * const nativeCurrency = {
   *   name: "Bitcoin",
   *   symbol: "BTC",
   *   decimals: 8
   * };
   */
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };

  /**
   * The unit used for fees on the selected blockchain.
   */
  feesUnit: FeesUnit;

  /**
   * Function that provides the access token for authentication.
   * @private
   */
  #accessTokenProvider: () => string | Promise<string>;

  /**
   * The iframe rpc client
   * @private
   */
  #rpcClient: RpcClient;

  /**
   * The Apollo GraphQL client used for making API requests.
   */
  apolloClient: ApolloClient<NormalizedCacheObject>;

  /**
   * The transport layer used for blockchain communication.
   * @private
   */
  #transport: Promise<Transport>;

  /**
   * The public client used for interacting with the blockchain.
   * @private
   */
  #publicClient: Promise<PublicClient<Transport, Chain>>;

  /**
   * Map to keep track of pending account initializations.
   * @private
   */
  #pendingAccounts: Map<string, Promise<KeybanAccount>> = new Map();

  /**
   * Creates a new instance of `KeybanClient`.
   *
   * @param {KeybanClientConfig} config - The configuration object to initialize the client.
   *
   * @throws {SdkError} If the configuration is invalid.
   *
   * @example
   * ```typescript
   * const client = new KeybanClient({
   *   apiUrl: "https://api.keyban.io",
   *   appId: "your-app-id",
   *   accessTokenProvider: () => "your-access-token",
   *   chain: KeybanChain.KeybanTestnet,
   * });
   * ```
   */
  constructor({
    apiUrl,
    appId,
    accessTokenProvider,
    chain,
  }: KeybanClientConfig) {
    apiUrl ??= "https://api.keyban.io";

    this.apiUrl = apiUrl;
    this.appId = appId;
    this.chain = chain;
    this.nativeCurrency = viemChainsMap[this.chain].nativeCurrency;
    this.feesUnit = feesUnitChainsMap[this.chain];

    this.#accessTokenProvider = accessTokenProvider;

    this.#rpcClient = new RpcClient(new URL("/signer-client", apiUrl));

    const indexerPrefix = {
      [KeybanChain.KeybanTestnet]: "subql-anvil.",
      [KeybanChain.PolygonAmoy]: "subql-polygon-amoy.",
    }[chain];
    this.apolloClient = createApolloClient(
      new URL(apiUrl.replace("api.", indexerPrefix)),
      this.#accessTokenProvider,
    );

    const metadataUrl = new URL("/metadata", apiUrl);
    metadataUrl.searchParams.set("chainType", chain);
    this.#transport = fetch(metadataUrl)
      .then((res) => res.json())
      .then(({ rpcUrl }) => http(rpcUrl));

    this.#publicClient = this.#transport.then((transport) =>
      createPublicClient({
        chain: viemChainsMap[this.chain],
        transport,
      }),
    );
  }

  /**
   * Initializes a `KeybanAccount` associated with the current client.
   * This method sets up the account by retrieving or generating the client share,
   * and prepares the account for transactions and other operations.
   *
   * @returns A promise that resolves to an instance of `KeybanAccount`.
   *
   * @throws {StorageError} If there is an error retrieving or saving the client share.
   * @throws {SdkError} If initialization fails due to signing errors.
   *
   * @example
   * ```typescript
   * const account = await client.initialize();
   * console.log(`Account address: ${account.address}`);
   * ```
   *
   * @see {@link KeybanAccount}
   */
  async initialize(): Promise<KeybanAccount> {
    const accessToken = await this.#accessTokenProvider();
    const { sub } = parseJwt(accessToken);

    const pending = this.#pendingAccounts.get(sub);
    if (pending) return pending;

    const promise = (async () => {
      await this.#rpcClient.call(
        "ecdsa",
        "dkg",
        this.appId,
        await this.#accessTokenProvider(),
      );

      const publicKey = await this.#rpcClient.call(
        "ecdsa",
        "publicKey",
        this.appId,
        accessToken,
      );

      const account = toAccount({
        address: publicKeyToAddress(publicKey),
        signMessage: async ({ message }) => {
          const hash = hashMessage(message, "hex");
          return this.#rpcClient.call(
            "ecdsa",
            "sign",
            this.appId,
            await this.#accessTokenProvider(),
            hash,
          );
        },
        signTransaction: async (transaction, options) => {
          const serializer = options?.serializer ?? serializeTransaction;

          // For EIP-4844 Transactions, we want to sign the transaction payload body (tx_payload_body) without the sidecars (i.e., without the network wrapper).
          // See: https://github.com/ethereum/EIPs/blob/e00f4daa66bd56e2dbd5f1d36d09fd613811a48b/EIPS/eip-4844.md#networking
          const signableTransaction =
            transaction.type === "eip4844"
              ? { ...transaction, sidecars: false }
              : transaction;

          const signature = await this.#rpcClient
            .call(
              "ecdsa",
              "sign",
              this.appId,
              await this.#accessTokenProvider(),
              keccak256(serializer(signableTransaction)),
            )
            .then(parseSignature);

          return serializer(transaction, signature);
        },
        signTypedData: async (typedDataDefinition) => {
          const hash = hashTypedData(typedDataDefinition);
          return this.#rpcClient.call(
            "ecdsa",
            "sign",
            this.appId,
            await this.#accessTokenProvider(),
            hash,
          );
        },
      });

      // Assign the public key to the account
      account.publicKey = publicKey;

      const publicClient = await this.#publicClient;
      const walletClient = createWalletClient({
        chain: publicClient.chain,
        transport: await this.#transport,
        account,
      });

      return new KeybanAccount(sub, this, publicClient, walletClient);
    })();

    this.#pendingAccounts.set(sub, promise);
    promise.catch(() => {}).finally(() => this.#pendingAccounts.delete(sub));

    return promise;
  }

  /**
   * Retrieves the native token balance for a given address.
   *
   * @param address - The Ethereum address for which to retrieve the balance.
   *
   * @returns A promise resolving to the balance as a string (representing a BigInt in wei).
   *
   * @throws {SdkError} Throws `SdkErrorTypes.AddressInvalid` if the provided address is invalid.
   *
   * @example
   * ```typescript
   * const balance = await client.getBalance("0x123...");
   * console.log(`Balance: ${balance}`);
   * ```
   */
  async getBalance(address: Address): Promise<string> {
    if (!isAddress(address)) {
      throw new SdkError(
        SdkErrorTypes.AddressInvalid,
        "KeybanClient.getBalance",
      );
    }

    const { data } = await this.apolloClient.query({
      query: walletBalanceDocument,
      variables: { walletId: address },
    });

    return data.res?.balance ?? "0";
  }

  /**
   * Retrieves the ERC20 token balances for a given address.
   *
   * @param address - The Ethereum address for which to retrieve the token balances.
   * @param pagination - Optional pagination arguments.
   *
   * @returns A promise resolving to the token balances, including token details and balances.
   *
   * @throws {SdkError} Throws `SdkErrorTypes.AddressInvalid` if the provided address is invalid.
   *
   * @example
   * ```typescript
   * const tokenBalances = await client.getTokenBalances("0x123...", { first: 10 });
   * console.log(tokenBalances);
   * ```
   *
   * @see {@link PaginationArgs}
   */
  async getTokenBalances(address: Address, pagination?: PaginationArgs) {
    if (!isAddress(address)) {
      throw new SdkError(
        SdkErrorTypes.AddressInvalid,
        "KeybanClient.getTokenBalances",
      );
    }

    const { data } = await this.apolloClient.query({
      query: walletTokenBalancesDocument,
      variables: { walletId: address, ...pagination },
    });

    return data.res;
  }

  /**
   * Retrieves the NFTs (ERC721 and ERC1155 tokens) owned by a given address.
   *
   * @param address - The Ethereum address of the owner.
   * @param pagination - Optional pagination arguments.
   *
   * @returns A promise resolving to the list of NFTs, including metadata and collection details.
   *
   * @throws {SdkError} Throws `SdkErrorTypes.AddressInvalid` if the provided address is invalid.
   *
   * @example
   * ```typescript
   * const nfts = await client.getNfts("0x123...", { first: 5 });
   * console.log(nfts);
   * ```
   *
   * @see {@link PaginationArgs}
   */
  async getNfts(address: Address, pagination?: PaginationArgs) {
    if (!isAddress(address)) {
      throw new SdkError(SdkErrorTypes.AddressInvalid, "KeybanClient.getNfts");
    }

    const { data } = await this.apolloClient.query({
      query: walletNftsDocument,
      variables: { walletId: address, ...pagination },
    });

    return data.res;
  }

  /**
   * Retrieves the transaction history for a given address, including native currency transfers, token transfers, and NFT transfers.
   *
   * @param address - The Ethereum address for which to retrieve the transaction history.
   * @param pagination - Optional pagination arguments.
   *
   * @returns A promise resolving to the transaction history, including detailed information about each transfer.
   *
   * @throws {SdkError} Throws `SdkErrorTypes.AddressInvalid` if the provided address is invalid.
   *
   * @example
   * ```typescript
   * const history = await client.getTransferHistory("0x123...", { first: 10 });
   * console.log(history);
   * ```
   *
   * @see {@link PaginationArgs}
   */
  async getTransferHistory(address: Address, pagination?: PaginationArgs) {
    if (!isAddress(address)) {
      throw new SdkError(
        SdkErrorTypes.AddressInvalid,
        "KeybanClient.getTransferHistory",
      );
    }

    const { data } = await this.apolloClient.query({
      query: walletAssetTransfersDocument,
      variables: { walletId: address, ...pagination },
    });

    return data.res;
  }

  /**
   * Retrieves a specific NFT (ERC721 or ERC1155) owned by an address.
   *
   * @param address - The Ethereum address of the owner.
   * @param tokenAddress - The contract address of the NFT.
   * @param tokenId - The token ID of the NFT.
   *
   * @returns A promise resolving to the NFT data, including metadata and collection details.
   *
   * @throws {SdkError} Throws `SdkErrorTypes.AddressInvalid` if the provided addresses are invalid.
   * @throws {SdkError} Throws `SdkErrorTypes.NftNotFound` if the NFT is not found.
   *
   * @example
   * ```typescript
   * const nft = await client.getNft("0xowner...", "0xcontract...", "1");
   * console.log(nft);
   * ```
   *
   * @see {@link KeybanNftBalance}
   */
  async getNft(address: Address, tokenAddress: Address, tokenId: string) {
    if (!isAddress(address)) {
      throw new SdkError(SdkErrorTypes.AddressInvalid, "KeybanClient.getNft");
    }

    if (!isAddress(tokenAddress)) {
      throw new SdkError(SdkErrorTypes.AddressInvalid, "KeybanClient.getNft");
    }

    const id = [address, tokenAddress, tokenId].join(":");
    const { data } = await this.apolloClient.query({
      query: walletNftDocument,
      variables: { nftBalanceId: id },
    });

    const nft = data.res;

    if (!nft) {
      throw new SdkError(SdkErrorTypes.NftNotFound, "KeybanClient.getNft");
    }

    return nft;
  }

  /**
   * Performs a health check on the Keyban API to determine its operational status.
   *
   * @returns A promise resolving to the API status, either `"operational"` or `"down"`.
   *
   * @example
   * ```typescript
   * const status = await client.apiStatus();
   * console.log(`API Status: ${status}`);
   * ```
   *
   * @throws {Error} Throws an error if the health check request fails.
   *
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
}
