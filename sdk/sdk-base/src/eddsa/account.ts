import type { WasmApi } from "~/eddsa/types";
import type { ClientShare } from "~/eddsa/account.types";

export class EddsaAccount {
  wasmApi;
  address;
  private clientKeyShare;
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
