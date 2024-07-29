import { Hex } from "viem";
import { publicKeyToAddress } from "viem/accounts";
import { KeybanClientImpl } from "~/client";

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
  clientShare: Share;
  clientPublicKey: string;

  constructor(
    client: KeybanClientImpl<Share>,
    keyId: string,
    clientShare: Share
  ) {
    this.client = client;

    this.keyId = keyId;
    this.clientShare = clientShare;
    this.clientPublicKey = client.signer.clientPublicKey(this.clientShare);
  }

  async getPublicKey() {
    return this.client.signer.publicKey(this.clientShare);
  }

  async getAddress() {
    const publicKey = await this.getPublicKey();
    return publicKeyToAddress(publicKey);
  }

  /**
   * Fetches the account balance as a raw bigint value.
   * @remarks On the Polygon network, the balance is returned in wei units.
   */
  async getBalance(): Promise<bigint> {
    const address = await this.getAddress();
    return this.client.publicClient.getBalance({ address });
  }

  /**
   * Signs a payload using the client's secret share.
   */
  sign(payload: string) {
    return this.client.signer.sign(this.keyId, this.clientShare, payload);
  }

  /**
   * Sums two numbers using the WebAssembly API. This method is for testing purposes only.
   */
  add(a: number, b: number) {
    return this.client.signer.add(a, b);
  }
}
