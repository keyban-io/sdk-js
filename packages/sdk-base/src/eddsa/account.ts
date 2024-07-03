import type { ClientShare, StorageProviderApi, WasmApi } from '~/eddsa/types';

/**
 * This class represents an account using the EdDSA algorithm. It provides methods for signing payloads and interacting with the WebAssembly API.
 */
export class EddsaAccount {
  /** Interface offering the WebAssembly Rust logic following {@link WasmApi} */
  wasmApi;
  /** The server public key. */
  serverPublicKey;
  /** The client key share retrieved from storage. */
  clientPublicKey;
  /** Storage solution to store client share. */
  accountStorageSolution;
  /** Key identifier for the client share. */
  keyId;
  /** The secret share of the client, if available. */
  secretShare: ClientShare['secret_share'] | null = null;

  /**
   * The constructor of the `EddsaAccount` class.
   * @param clientKeyShare - The client key share retrieved from storage.
   * @param wasmApi - The source of the WebAssembly Rust logic. For web, it is a plain WebAssembly object. For react-native, a bridger is required.
   * @param storage - The storage provider following {@link StorageProviderApi}.
   */
  constructor(
    clientKeyShare: ClientShare,
    wasmApi: WasmApi,
    storage: StorageProviderApi,
  ) {
    this.wasmApi = wasmApi;
    this.serverPublicKey = clientKeyShare.server_pubkey;
    this.clientPublicKey = clientKeyShare.client_pubkey;
    this.accountStorageSolution = storage;
    this.keyId = clientKeyShare.keyId;
  }

  /**
   * Signs a payload using the client's secret share.
   * @param payload - The payload to be signed.
   * @returns The signature of the payload.
   * @throws Error if the client share could not be retrieved from storage.
   */
  async signPayload(payload: string) {
    const share = await this.getClientShare();

    if (!share) {
      throw new Error('couldnt get share from storage');
    }

    const signature = await this.wasmApi.signMessage(
      this.keyId,
      share.secret_share,
      payload,
    );

    return signature;
  }

  /**
   * Authenticates and signs a payload.
   * @param payload - The payload to be authenticated and signed.
   * @param storagePassword - Optional password for accessing the storage.
   */
  async authAndSign(
    payload: Record<string, unknown>,
    storagePassword?: string,
  ) {
    this.accountStorageSolution.get(this.keyId, storagePassword);
    console.log(payload);
  }

  /**
   * Retrieves the client's secret share from storage.
   * @param password - Optional password for accessing the storage.
   * @returns The client's secret share.
   */
  async getClientShare(password?: string) {
    return this.accountStorageSolution.get(this.keyId, password);
  }

  /**
   * Clears the client's secret share from memory.
   */
  async clearClientShare() {
    this.secretShare = null;
  }

  /**
   * Prepares a payload for the WebAssembly API.
   * @param payload - The payload to be prepared.
   * @returns The prepared payload as a JSON string.
   */
  prepareWasmPayload(payload: Record<string, unknown>) {
    // Not sure how the payload should be prepared
    return JSON.stringify(payload);
  }

  /**
   * Adds two numbers using the WebAssembly API. This method is for testing purposes only.
   * @param num1 - The first number.
   * @param num2 - The second number.
   * @returns The sum of the two numbers.
   */
  async add(num1: number, num2: number) {
    return this.wasmApi.add(num1, num2);
  }
}
