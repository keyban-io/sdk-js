import type { ClientShare, StorageProviderApi, WasmApi } from '~/eddsa/types';
import { EDDSA_SDK_STORAGE_KEY } from '~/utils/constants';

export class EddsaAccount {
  /** Interface offering the WebAssembly Rust logic following {@link WasmApi} */
  wasmApi;
  /** The server public key. */
  serverPublicKey;
  /** The client key share retrieved from storage. */
  clientPublicKey;
  /** Storage solution to store client share. */
  accountStorageSolution;
  private secretShare: Uint8Array | null = null;

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
    this.secretShare = clientKeyShare.secretShare;
    this.accountStorageSolution = storage;
  }

  async signPayload(_: Record<string, unknown>) {
    // const wasmReadyPayload = this.prepareWasmPayload(payload);
    //
    // const signature = await this.wasmApi.signMessage(
    //   this.secretShare,
    //   wasmReadyPayload
    // );
    console.log(this.secretShare);

    return 'signature';
  }

  async authAndSign(
    payload: Record<string, unknown>,
    storagePassword?: string,
  ) {
    this.accountStorageSolution.get(
      EddsaAccount.getStorageKey(this.clientPublicKey),
      storagePassword,
    );
    console.log(payload);
  }

  async getClientShare(password?: string) {
    return this.accountStorageSolution.get(
      EddsaAccount.getStorageKey(this.clientPublicKey),
      password,
    );
  }

  async clearClientShare() {
    this.secretShare = null;
  }

  prepareWasmPayload(payload: Record<string, unknown>) {
    // Not sure how the payload should be prepared
    return JSON.stringify(payload);
  }

  static getStorageKey(publicKey: string) {
    return `${EDDSA_SDK_STORAGE_KEY}-${publicKey}`;
  }

  // FOR TESTING ONLY
  async add(num1: number, num2: number) {
    return this.wasmApi.add(num1, num2);
  }
}
