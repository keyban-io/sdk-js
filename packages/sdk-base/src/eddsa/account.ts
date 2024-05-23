import type { ClientShare } from "~/eddsa/account.types";
import type { WasmApi } from "~/eddsa/types";

export class EddsaAccount {
  /** Interface offering the WebAssembly Rust logic following {@link WasmApi} */
  wasmApi;
  /** Account address retrieved from ${@link clientKeyShare} */
  address;
  /** The client key share retrieved from storage. */
  private clientKeyShare;

  /**
   * The constructor of the `EddsaClient` class.
   * @param wasmApi - The source of the WebAssembly Rust logic, for web is plain WebAssembly object, for react-native it required bridger
   * @param clientKeyShare - The client key share retrieved from storage.
   */
  constructor(clientKeyShare: ClientShare, wasmApi: WasmApi) {
    this.wasmApi = wasmApi;
    this.clientKeyShare = clientKeyShare;
    this.address = clientKeyShare;
  }

  async signPayload(payload: Record<string, unknown>) {
    const wasmReadyPayload = this.prepareWasmPayload(payload);

    const signature = await this.wasmApi.signMessage(
      this.clientKeyShare,
      wasmReadyPayload
    );

    return signature;
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
