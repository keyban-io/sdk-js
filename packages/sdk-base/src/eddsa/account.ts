import type { ClientShare, WasmApi } from '~/eddsa/types';

export class EddsaAccount {
  /** Interface offering the WebAssembly Rust logic following {@link WasmApi} */
  wasmApi;
  /** The server public key. */
  serverPublicKey;
  /** The client key share retrieved from storage. */
  clientPublicKey;
  private secretShare;

  /**
   * The constructor of the `EddsaClient` class.
   * @param wasmApi - The source of the WebAssembly Rust logic, for web is plain WebAssembly object, for react-native it required bridger
   * @param clientKeyShare - The client key share retrieved from storage.
   */
  constructor(clientKeyShare: ClientShare, wasmApi: WasmApi) {
    this.wasmApi = wasmApi;
    this.serverPublicKey = clientKeyShare.server_pubkey;
    this.clientPublicKey = clientKeyShare.client_pubkey;
    this.secretShare = clientKeyShare.secretShare;
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

  prepareWasmPayload(payload: Record<string, unknown>) {
    // Not sure how the payload should be prepared
    return JSON.stringify(payload);
  }

  // FOR TESTING ONLY
  async add(num1: number, num2: number) {
    return this.wasmApi.add(num1, num2);
  }
}
