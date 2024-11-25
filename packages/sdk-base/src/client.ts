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
import {
  FeesUnit,
  feesUnitChainsMap,
  signersChainMap,
  viemChainsMap,
} from "~/chains";
import { SdkError, SdkErrorTypes, StorageError } from "~/errors";
import {
  walletAssetTransfersDocument,
  walletBalanceDocument,
  walletNftDocument,
  walletNftsDocument,
  walletTokenBalancesDocument,
} from "~/graphql";
import { type Address, KeybanChain } from "~/index";
import type { IKeybanSigner } from "~/signer";
import type { IKeybanStorage } from "~/storage";
import { parseJwt } from "~/utils/jwt";

import type { NormalizedCacheObject } from "@apollo/client/cache";
import type { ApolloClient } from "@apollo/client/core";

/**
 * Configuration object for the Keyban client.
 *
 * @property {string} [apiUrl] - The URL for the Keyban API. Defaults to "https://api.keyban.io" if not provided.
 * @property {KeybanChain} chain - The blockchain Keyban operates on.
 * @property {new () => IKeybanSigner} signer - Constructor for the Keyban-specific signer.
 * @property {new () => IKeybanStorage} storage - Constructor for the Keyban-specific storage handler.
 */
export type KeybanClientConfig = {
  apiUrl?: string;
  appId: string;
  accessTokenProvider: () => string | Promise<string>;
  chain: KeybanChain;
  signer?: new () => IKeybanSigner;
  storage: new () => IKeybanStorage;
};

/**
 * Arguments for paginating a collection.
 */
export type PaginationArgs = {
  /** The maximum number of items to retrieve in the current page. */
  first?: number;

  /** A cursor representing the starting point for the next page of items. */
  after?: string;
};

/**
 * Main client for interacting with the Keyban API and associated services.
 *
 * @property {KeybanChain} chain - The blockchain used by Keyban.
 * @property {string} [chainUrl] - Optional URL for the chain, overriding the default.
 * @property {string} apiUrl - The Keyban API URL, defaulting to "https://api.keyban.io".
 *
 * @see {@link useKeybanClient}
 *
 * @class
 */
export class KeybanClient {
  apiUrl: string;
  appId: string;
  chain: KeybanChain;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  feesUnit: FeesUnit;

  #accessTokenProvider: () => string | Promise<string>;

  #signer: IKeybanSigner;
  #storage: IKeybanStorage;

  apolloClient: ApolloClient<NormalizedCacheObject>;

  #transport: Promise<Transport>;
  #publicClient: Promise<PublicClient<Transport, Chain>>;

  /**
   * Creates a new instance of `KeybanClient`.
   *
   * @param config - The configuration object to initialize the client.
   */
  constructor({
    apiUrl,
    appId,
    accessTokenProvider,
    chain,
    signer,
    storage,
  }: KeybanClientConfig) {
    apiUrl ??= "https://api.keyban.io";
    signer ??= signersChainMap[chain];

    this.apiUrl = apiUrl;
    this.appId = appId;
    this.chain = chain;
    this.nativeCurrency = viemChainsMap[this.chain].nativeCurrency;
    this.feesUnit = feesUnitChainsMap[this.chain];

    this.#accessTokenProvider = accessTokenProvider;

    this.#signer = new signer();
    this.#storage = new storage();

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

  #pendingAccounts: Map<string, Promise<KeybanAccount>> = new Map();
  /**
   * Initializes a KeybanAccount associated with a specific key ID.
   *
   * @returns - A promise that resolves to an instance of `KeybanAccount`.
   */
  async initialize(): Promise<KeybanAccount> {
    const accessToken = await this.#accessTokenProvider();
    const { sub } = parseJwt(accessToken);

    const pending = this.#pendingAccounts.get(sub);
    if (pending) return pending;

    const promise = (async () => {
      const storageKey = `${this.#signer.storagePrefix}-${sub}`;

      let clientShare = await this.#storage.get(storageKey).catch((err) => {
        throw new StorageError(
          StorageError.types.RetrivalFailed,
          "KeybanClient.initialize",
          err,
        );
      });

      clientShare ??= await this.#signer.dkg(
        this.apiUrl,
        this.appId,
        await this.#accessTokenProvider(),
      );

      await this.#storage.set(storageKey, clientShare).catch((err) => {
        throw new StorageError(
          StorageError.types.SaveFailed,
          "KeybanClient.initialize",
          err,
        );
      });

      const publicKey = await this.#signer.publicKey(clientShare);

      const account = toAccount({
        address: publicKeyToAddress(publicKey),
        signMessage: async ({ message }) => {
          const hash = hashMessage(message, "hex");
          return this.#signer.sign(
            this.apiUrl,
            this.appId,
            await this.#accessTokenProvider(),
            clientShare,
            hash,
          );
        },
        signTransaction: async (transaction, options) => {
          const serializer = options?.serializer ?? serializeTransaction;

          // For EIP-4844 Transactions, we want to sign the transaction payload body (tx_payload_body) without the sidecars (ie. without the network wrapper).
          // See: https://github.com/ethereum/EIPs/blob/e00f4daa66bd56e2dbd5f1d36d09fd613811a48b/EIPS/eip-4844.md#networking
          const signableTransaction =
            transaction.type === "eip4844"
              ? { ...transaction, sidecars: false }
              : transaction;

          const signature = await this.#signer
            .sign(
              this.apiUrl,
              this.appId,
              await this.#accessTokenProvider(),
              clientShare,
              keccak256(serializer(signableTransaction)),
            )
            .then(parseSignature);

          return serializer(transaction, signature);
        },
        signTypedData: async (typedDataDefinition) => {
          const hash = hashTypedData(typedDataDefinition);
          return this.#signer.sign(
            this.apiUrl,
            this.appId,
            await this.#accessTokenProvider(),
            clientShare,
            hash,
          );
        },
      });

      // Did viem forgot to fill the publicKey?
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
   * Retrieves the balance for a given address.
   *
   * @param address - The address for which to retrieve the balance.
   * @returns - A promise resolving to the balance as a BigInt.
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
   * @returns - An account balance in ERC20 tokens.
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
   * @returns - ERC721 and ERC1155 tokens of the account.
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
   * @returns - The account transaction history for native currency, tokens and Nfts.
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
   * @returns - ERC721 and ERC1155 tokens of the account.
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
   * @returns - The API status, either "operational" or "down".
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
