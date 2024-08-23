import type { Chain, PublicClient, Transport } from "viem";
import { createPublicClient, http } from "viem";
import { publicKeyToAddress } from "viem/accounts";
import * as chains from "viem/chains";

import { KeybanAccount } from "~/account";
import { KeybanApiStatus } from "~/api";
import { KeybanChain } from "~/chains";
import { KeybanBaseError, StorageError } from "~/errors";
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

export class KeybanClient {
  apiUrl: string;
  signer: KeybanSigner;
  storage: KeybanStorage;
  accounts: Map<string, Promise<KeybanAccount>>;

  chain: KeybanChain;
  chainUrl?: string;
  publicClient: PublicClient<Transport, Chain>;

  /**
   * @param config.apiUrl
   * @param config.signer - Any signer builder
   * @param config.storage - Any storage provider following {@link KeybanStorage}. For web, it can be localStorage; for native, AsyncStorage.
   */
  constructor({
    apiUrl = "https://keyban.io",
    chain,
    chainUrl,
    signer,
    storage,
  }: KeybanClientConfig) {
    this.apiUrl = apiUrl;
    this.signer = new signer();
    this.storage = new storage();
    this.accounts = new Map();

    this.chain = chain;
    this.chainUrl = chainUrl;
    this.publicClient = createPublicClient({
      chain: chains[this.chain],
      transport: http(chainUrl),
    });
  }

  /**
   * Initializes a KeybanAccount instance.
   * @param keyId - The key identifier used for storing and retrieving shares.
   * @returns Instance of {@link KeybanAccount}
   */
  initialize(keyId: string): Promise<KeybanAccount> {
    const cached = this.accounts.get(keyId);
    if (cached) return cached;

    const promise = (async () => {
      const storageKey = `${this.signer.storagePrefix}-${keyId}`;

      let clientShare = await this.storage.get(storageKey).catch((err) => {
        throw new StorageError(
          StorageError.types.RetrivalFailed,
          "Client.initialize",
          err,
        );
      });

      clientShare ??= await this.signer.dkg(keyId, this.apiUrl).catch((err) => {
        throw new KeybanBaseError(err);
      });

      await this.storage.set(storageKey, clientShare).catch((err) => {
        throw new StorageError(
          StorageError.types.SaveFailed,
          "Client.initialize",
          err,
        );
      });

      const publicKey = await this.signer.publicKey(clientShare);
      const address = publicKeyToAddress(publicKey);

      return new KeybanAccount(this, keyId, address, publicKey);
    })();

    this.accounts.set(keyId, promise);
    promise.catch(() => {}).finally(() => this.accounts.delete(keyId));

    return this.initialize(keyId);
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
  requester = async <R, V>(query: string, variables?: V) =>
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
