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
import { KeybanAccount } from "./account";
import { KeybanApiStatus } from "./api";
import { StorageError } from "./errors";
import { Address, KeybanChain } from "./index";
import type { KeybanSigner } from "./signer";
import type { KeybanStorage } from "./storage";
import { viemChainsMap } from "~/chains";
import { getSdk, Sdk } from "~/client.generated";

/**
 * Configuration object for the Keyban client.
 *
 * @see {@link KeybanChain}
 * @see {@link KeybanStorage}
 */
export type KeybanClientConfig = {
  apiUrl?: string;
  chain: KeybanChain;
  signer: new () => KeybanSigner;
  storage: new () => KeybanStorage;
};

/**
 * @see {@link userKeybanClient}
 */
export class KeybanClient {
  apiUrl: string;
  chain: KeybanChain;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };

  #signer: KeybanSigner;
  #storage: KeybanStorage;
  #graphql: Sdk;

  #accounts: Map<string, Promise<KeybanAccount>>;

  #transport: Promise<Transport>;
  #publicClient: Promise<PublicClient<Transport, Chain>>;

  /**
   * @param {Object} config The client config object
   */
  constructor({
    apiUrl = "https://api.keyban.io",
    chain,
    signer,
    storage,
  }: KeybanClientConfig) {
    this.apiUrl = apiUrl;
    this.chain = chain;
    this.nativeCurrency = viemChainsMap[this.chain].nativeCurrency;

    this.#signer = new signer();
    this.#storage = new storage();
    this.#graphql = getSdk(this.gqlRequester);

    this.#accounts = new Map();

    this.#transport = this.#graphql
      .KeybanClient_chain({ chain })
      .then(({ chain }) => http(chain.rpcUrl));
    this.#publicClient = this.#transport.then((transport) =>
      createPublicClient({
        chain: viemChainsMap[this.chain],
        transport,
      }),
    );
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

      clientShare ??= await this.#signer.dkg(keyId, this.apiUrl);

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

      const publicClient = await this.#publicClient;
      const walletClient = createWalletClient({
        chain: publicClient.chain,
        transport: await this.#transport,
        account,
      });

      return new KeybanAccount(keyId, this, publicClient, walletClient);
    })();

    this.#accounts.set(keyId, promise);
    promise.catch(() => {}).finally(() => this.#accounts.delete(keyId));

    return this.initialize(keyId);
  }

  async getBalance(address: Address) {
    const publicClient = await this.#publicClient;
    return publicClient.getBalance({ address });
  }

  /**
   * Performs a health check to determine the operational status.
   * @returns A promise that resolves to either {@link KeybanApiStatus} based on the health check result.
   */
  async apiStatus(): Promise<KeybanApiStatus> {
    return fetch(`${this.apiUrl}/health`)
      .then((res) => (res.ok ? "operational" : "down"))
      .catch((err) => {
        console.error("Failed to perform health check", err);
        return "down";
      });
  }

  /**
   * @private
   */
  gqlRequester = async <R, V>(query: string, variables?: V) => {
    const res = await fetch(new URL("/graphql", this.apiUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/graphql-response+json",
      },
      body: JSON.stringify({ query, variables }, (_, value) => {
        if (typeof value === "bigint") return value.toString();

        return value;
      }),
    });

    if (!res.ok) throw new Error("Network response was not ok");

    const text = await res.text();
    const { data, errors } = JSON.parse(text, (_, value) => {
      if (typeof value === "object" && value?.__typename === "BigIntScalar")
        return BigInt(value.value);

      return value;
    });

    if (errors?.length) throw new Error(errors[0].message);

    return data as R;
  };
}
