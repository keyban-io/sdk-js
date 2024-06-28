import type { ClientShare, StorageProviderApi, WasmApi } from '~/eddsa/types';

/**
 * @class EddsaAccount
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
  keyId;
  secretShare: ClientShare['secret_share'] | null = null;

  /**
   * The constructor of the `EddsaClient` class.
   * @param wasmApi - The source of the WebAssembly Rust logic, for web is plain WebAssembly object, for react-native it required bridger
   * @param clientKeyShare - The client key share retrieved from storage.
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

  async authAndSign(
    payload: Record<string, unknown>,
    storagePassword?: string,
  ) {
    this.accountStorageSolution.get(this.keyId, storagePassword);
    console.log(payload);
  }

  async getClientShare(password?: string) {
    return this.accountStorageSolution.get(this.keyId, password);
  }

  async clearClientShare() {
    this.secretShare = null;
  }

  prepareWasmPayload(payload: Record<string, unknown>) {
    // Not sure how the payload should be prepared
    return JSON.stringify(payload);
  }

  // FOR TESTING ONLY
  async add(num1: number, num2: number) {
    return this.wasmApi.add(num1, num2);
  }
}
