import type { Chain, PublicClient, Transport } from "viem";
import {
  createPublicClient,
  createWalletClient,
  hashMessage,
  hashTypedData,
  http,
  keccak256,
  parseSignature,
  serializeTransaction,
} from "viem";
import { publicKeyToAddress, toAccount } from "viem/accounts";
import * as chains from "viem/chains";
import { KeybanAccount } from "~/account";
import { KeybanApiStatus } from "~/api";
import { KeybanChain } from "~/chains";
import { KeybanBaseError, StorageError } from "~/errors";
import { Address } from "~/index";
import type { KeybanSigner } from "~/signer";
import type { KeybanStorage } from "~/storage";

/**
 * Configuration object for the Keyban client.
 *
 * @see {@link KeybanChain}
 * @see {@link KeybanStorage}
 */
export type KeybanClientConfig = {
  apiUrl?: string;
  chain: KeybanChain;
  chainUrl?: string;
  signer: new () => KeybanSigner;
  storage: new () => KeybanStorage;
};

/**
 * @see {@link userKeybanClient}
 */
export class KeybanClient {
  chain: KeybanChain;
  chainUrl?: string;
  apiUrl: string;

  #signer: KeybanSigner;
  #storage: KeybanStorage;
  #accounts: Map<string, Promise<KeybanAccount>>;
  #publicClient: PublicClient<Transport, Chain>;

  /**
   * @param {Object} config The client config object
   */
  constructor({
    chain,
    chainUrl,
    apiUrl = "https://keyban.io",
    signer,
    storage,
  }: KeybanClientConfig) {
    this.apiUrl = apiUrl;
    this.chain = chain;
    this.chainUrl = chainUrl;

    this.#signer = new signer();
    this.#storage = new storage();
    this.#accounts = new Map();
    this.#publicClient = createPublicClient({
      chain: chains[this.chain],
      transport: http(this.chainUrl),
    });
  }

  /**
   * Initializes a KeybanAccount instance.
   * @param keyId - The key identifier used for storing and retrieving shares.
   * @returns Instance of {@link KeybanAccount}
   */
  initialize(keyId: string): Promise<KeybanAccount> {
    const cached = this.#accounts.get(keyId);
    if (cached) return cached;

    const promise = (async () => {
      const storageKey = `${this.#signer.storagePrefix}-${keyId}`;

      let clientShare = await this.#storage.get(storageKey).catch((err) => {
        throw new StorageError(
          StorageError.types.RetrivalFailed,
          "KeybanClient.initialize",
          err,
        );
      });

      clientShare ??= await this.#signer
        .dkg(keyId, this.apiUrl)
        .catch((err) => {
          throw new KeybanBaseError(err);
        });

      await this.#storage.set(storageKey, clientShare).catch((err) => {
        throw new StorageError(
          StorageError.types.SaveFailed,
          "KeybanClient.initialize",
          err,
        );
      });

      const publicKey = await this.#signer
        .publicKey(clientShare)
        .catch((err) => {
          throw new KeybanBaseError(err);
        });

      const account = toAccount({
        address: publicKeyToAddress(publicKey),
        signMessage: ({ message }) => {
          const hash = hashMessage(message, "hex");
          return this.#signer.sign(keyId, clientShare, hash, this.apiUrl);
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
              keyId,
              clientShare,
              keccak256(serializer(signableTransaction)),
              this.apiUrl,
            )
            .then(parseSignature);

          return serializer(transaction, signature);
        },
        signTypedData: async (typedDataDefinition) => {
          const hash = hashTypedData(typedDataDefinition);
          return this.#signer.sign(keyId, clientShare, hash, this.apiUrl);
        },
      });

      // Did viem forgot to fill the publicKey?
      account.publicKey = publicKey;

      const walletClient = createWalletClient({
        chain: chains[this.chain],
        transport: http(this.chainUrl),
        account,
      });

      return new KeybanAccount(keyId, this, this.#publicClient, walletClient);
    })();

    this.#accounts.set(keyId, promise);
    promise.catch(() => {}).finally(() => this.#accounts.delete(keyId));

    return this.initialize(keyId);
  }

  async getBalance(address: Address) {
    return this.#publicClient.getBalance({ address });
  }

  /**
   * Performs a health check to determine the operational status.
   * @returns A promise that resolves to either {@link KeybanApiStatus} based on the health check result.
   */
  async apiStatus(): Promise<KeybanApiStatus> {
    return fetch(`${this.apiUrl}/api/health`)
      .then((res) => (res.ok ? "operational" : "down"))
      .catch((err) => {
        console.error("Failed to perform health check", err);
        return "down";
      });
  }

  /**
   * @private
   */
  blockscoutRequester = async <T>(
    path: string,
    searchParams: Record<string, string> = {},
  ): Promise<T | null> => {
    const url = new URL(`/api/blockscout/api/v2${path}`, this.apiUrl);
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value);
    }

    const res = await fetch(url, { headers: { Accept: "application/json" } });
    const data = await res.json();
    if (res.ok) return data;

    switch (res.status) {
      case 404:
        return null;

      default:
        throw new Error(data.message);
    }
  };

  /**
   * @private
   */
  gqlRequester = async <R, V>(query: string, variables?: V) =>
    fetch(
      "https://swapi-graphql.netlify.app/.netlify/functions/index",
      // this.apiUrl + "/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/graphql-response+json",
        },
        body: JSON.stringify({ query, variables }),
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(({ data }) => data as R);
}
