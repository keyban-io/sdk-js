import type { Hex } from "~/index";

/**
 * Interface for the Keyban signer.
 * This interface defines the methods that a Keyban signer must implement.
 * The signer is responsible for generating and signing keys.
 * The signer is also responsible for generating the public key from the client share.
 * The signer is used by the Keyban client to sign messages and generate public keys.
 * @private
 */
export interface IKeybanSigner {
  dkg(apiUrl: string, keyId: string, accessToken: string): Promise<string>;
  sign(
    apiUrl: string,
    appId: string,
    accessToken: string,
    clientShare: string,
    message: string,
  ): Promise<Hex>;
  publicKey(clientShare: string): Promise<Hex>;
}
