import { Hex } from "viem";
import { publicKeyToAddress } from "viem/accounts";
import { KeybanClientImpl } from "~/client";
import { StorageError } from "~/errors";

export interface KeybanAccount {
  keyId: string;
  clientPublicKey: string;

  getPublicKey(): Promise<Hex>;
  getAddress(): Promise<Hex>;
  getBalance(): Promise<bigint>;
  sign(payload: string): Promise<string>;
  add(a: number, b: number): Promise<number>;
}

export class Account<Share> implements KeybanAccount {
  client: KeybanClientImpl<Share>;

  keyId: string;
  clientPublicKey: string;

  constructor(
    client: KeybanClientImpl<Share>,
    keyId: string,
    clientShare: Share
  ) {
    this.client = client;

    this.keyId = keyId;
    this.clientPublicKey = client.signer.clientPublicKey(clientShare);
  }

  async #getClientShare() {
    const storageKey = `${this.client.signer.storagePrefix}-${this.keyId}`;
    const clientShare = await this.client.storage.get(storageKey);

    if (!clientShare)
      throw new StorageError(
        StorageError.types.RetrivalFailed,
        "Account.getClientShare"
      );

    return clientShare;
  }

  async getPublicKey() {
    const clientShare = await this.#getClientShare();
    return this.client.signer.publicKey(clientShare);
  }

  async getAddress() {
    const publicKey = await this.getPublicKey();
    return publicKeyToAddress(publicKey);
  }

  async getBalance() {
    const address = await this.getAddress();
    return this.client.publicClient.getBalance({ address });
  }

  /**
   * Signs a payload using the client's secret share.
   */
  async sign(payload: string) {
    const clientShare = await this.#getClientShare();
    return this.client.signer.sign(this.keyId, clientShare, payload);
  }

  /**
   * Sums two numbers using the WebAssembly API. This method is for testing purposes only.
   */
  add(a: number, b: number) {
    return this.client.signer.add(a, b);
  }
}
