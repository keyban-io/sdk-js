import type { Hex } from '~/types';

/**
 * Interface for the WebAssembly API.
 * All return types are promises to ensure compatibility with environments like React Native, which promisifies synchronous methods.
 * @typedef {Object} WasmApi
 * @property {Function} signMessage - Signs a message using the provided key ID and secret share.
 * @property {Function} dkg - Executes the distributed key generation (DKG) process for a given key ID.
 * @property {Function} add - Adds two numbers.
 */
export type EcdsaWasmApi = {
  signMessage: (
    keyid: string,
    secretShare: EcdsaClientShare['SecretShare'],
    message: string,
  ) => Promise<Hex>;
  dkg: (keyId: string) => Promise<string>;
  add: (n1: number, n2: number) => Promise<number>;
};

/**
 * Represents a client share containing the secret share and public keys.
 * @typedef {Object} ClientShare
 * @property {SecretShare} secret_share - The client's secret share.
 * @property {string} client_pubkey - The client's public key.
 * @property {string} server_pubkey - The server's public key.
 * @property {string} keyId - The key ID associated with the client share.
 */
export type EcdsaClientShare = {
  SecretShare: string;
  ChainKey: string;
  Public: string;
  keyId: string;
};
