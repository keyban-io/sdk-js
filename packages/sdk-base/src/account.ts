import type { Hex } from "viem";
import type { KeybanClientImpl } from "~/client";
import { StorageError } from "~/errors";

export interface KeybanAccount {
  keyId: string;
  address: Hex;
  publicKey: string;

  getBalance(): Promise<bigint>;
  sign(payload: string): Promise<string>;
  add(a: number, b: number): Promise<number>;
}
/**
 * @private
 * */
export class Account<Share> implements KeybanAccount {
  client: KeybanClientImpl<Share>;

  keyId: string;
  address: Hex;
  publicKey: string;

  constructor(
    client: KeybanClientImpl<Share>,
    keyId: string,
    address: Hex,
    publicKey: string
  ) {
    this.client = client;

    this.keyId = keyId;
    this.address = address;
    this.publicKey = publicKey;
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

  async getBalance() {
    return this.client.publicClient.getBalance({ address: this.address });
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
