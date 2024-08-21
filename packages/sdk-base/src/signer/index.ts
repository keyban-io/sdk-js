import type { Hex } from "viem";
import { KeybanSigner_ECDSA } from "./ecdsa";
import { KeybanSigner_EdDSA } from "./eddsa";

/**
 * Interface for the Keyban signer.
 * This interface defines the methods that a Keyban signer must implement.
 * The signer is responsible for generating and signing keys.
 * The signer is also responsible for generating the public key from the client share.
 * The signer is used by the Keyban client to sign messages and generate public keys.
 * @private
 */
export interface KeybanSigner {
  storagePrefix: string;
  dkg(keyId: string, apiUrl: string): Promise<string>;
  sign(
    keyId: string,
    clientShare: string,
    message: string,
    apiUrl: string,
  ): Promise<Hex>;
  publicKey(clientShare: string): Promise<Hex>;
}

/**
 * Object that contains the Keyban signers.
 */
export const KeybanSigner: Record<string, new () => KeybanSigner> = {
  EdDSA: KeybanSigner_EdDSA,
  ECDSA: KeybanSigner_ECDSA,
};
