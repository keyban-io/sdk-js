import { StorageProviderApi, WasmApi } from "~/eddsa/types";

class EddsaClient {
  wasmApi;
  storageProvider;
  clientKeyShare: string | null = null;

  constructor(wasmApi: WasmApi, storageProvider: StorageProviderApi) {
    this.wasmApi = wasmApi;
    this.storageProvider = storageProvider;
  }

  async initialize() {
    // Check if there is any client key already stored in the store provider
    const clientKeyShare = await this.storageProvider.get("keyban-key");

    if (!clientKeyShare) {
      return "initialized-empty";
    }

    // Feed the client share to the wasmApi (?)
    // this.wasmApi.init(clientKeyShare)
    // for now save it in the state
    this.clientKeyShare = clientKeyShare;

    return "initialized-with-key";
  }

  async sign(payload: Record<string, unknown>) {
    if (!this.clientKeyShare) {
      throw new Error("cannot sign without key");
    }
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

  async createKeypair() {}

  // TESTING ONLY
  add(num1: number, num2: number) {
    return this.wasmApi.add(num1, num2);
  }
}

export { StorageProviderApi, WasmApi, EddsaClient };
