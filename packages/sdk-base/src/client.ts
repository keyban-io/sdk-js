import {
  createPublicClient,
  createWalletClient,
  http,
  PublicClient,
  WalletClient,
} from "viem";
import { polygonAmoy } from "viem/chains";

import { Account, KeybanAccount } from "~/account";
import { KeybanSigner } from "~/signer";
import { KeybanStorage } from "~/storage";
import { StorageError } from "~/errors";
import { publicKeyToAddress } from "viem/accounts";

export type KeybanApiStatus = "operational" | "down";

export interface KeybanClient {
  publicClient: PublicClient;
  walletClient: WalletClient;

  initialize(keyId: string): Promise<KeybanAccount>;
  setChainMetadata(): Promise<void>;
  connectToProvider(): Promise<void>;
  apiStatus(): Promise<KeybanApiStatus>;
}
/**
 * @private
 * */
export class KeybanClientImpl<Share> implements KeybanClient {
  apiUrl: string;
  signer: KeybanSigner<Share>;
  storage: KeybanStorage<Share>;

  publicClient: PublicClient;
  walletClient: WalletClient;

  /**
   *
   * @param apiUrl
   * @param signer
   * @param storage - Any storage provider following {@link KeybanStorage}. For web, it can be local storage; for native, AsyncStorage.
   */
  constructor(
    apiUrl: string,
    signer: KeybanSigner<Share>,
    storage: KeybanStorage<Share>
  ) {
    this.apiUrl = apiUrl;
    this.signer = signer;
    this.storage = storage;

    this.publicClient = createPublicClient({
      chain: polygonAmoy,
      transport: http(),
    });
    this.walletClient = createWalletClient({
      chain: polygonAmoy,
      transport: http(),
    });
  }

  /**
   * Initializes a KeybanAccount instance.
   * @param keyId - The key identifier used for storing and retrieving shares.
   * @returns Instance of {@link Account}
   */
  async initialize(keyId: string): Promise<Account<Share>> {
    const storageKey = `${this.signer.storagePrefix}-${keyId}`;

    let clientShare = await this.storage.get(storageKey).catch((err) => {
      throw new StorageError(
        StorageError.types.RetrivalFailed,
        "Client.initialize",
        err
      );
    });
    clientShare ??= await this.signer.dkg(keyId);

    await this.storage.set(storageKey, clientShare).catch((err) => {
      throw new StorageError(
        StorageError.types.SaveFailed,
        "Client.initialize",
        err
      );
    });

    const publicKey = await this.signer.publicKey(clientShare);
    const address = publicKeyToAddress(publicKey);

    const clientPublicKey = this.signer.clientPublicKey(clientShare);

    return new Account(this, keyId, address, clientPublicKey);
  }

  /**
   * Function for setting up chain metadata.
   * This is a placeholder method and has not been implemented yet.
   */
  async setChainMetadata() {
    // TODO: implement me
    throw new Error("Not implemented: Client.setChainMetadata");
  }

  /**
   * Function for connecting to chain provider.
   * This is a placeholder method and has not been implemented yet.
   */
  async connectToProvider() {
    // TODO: implement me
    throw new Error("Not implemented: Client.connectToProvider");
  }

  /**
   * Performs a health check to determine the operational status.
   * @returns A promise that resolves to either 'operational' or 'down' based on the health check result.
   */
  async apiStatus(): Promise<KeybanApiStatus> {
    return fetch(`${this.apiUrl}/api/health`)
      .then((res) => (res.ok ? "operational" : "down"))
      .catch((err) => {
        console.error("Failed to perform health check", err);
        return "down";
      });
  }
}
