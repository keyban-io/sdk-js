import { StorageProviderApi, WasmApi } from "./types";
import { EddsaAccount } from "./account";
import type { ClientShare } from "./account.types";
import SignerClientError, {
  SignerClientErrors,
} from "~/errors/SignerClientError";

class EddsaClient {
  wasmApi;
  clientKeyShare: string | null = null;

  constructor(wasmApi: WasmApi) {
    this.wasmApi = wasmApi;
  }

  async createAccount(
    storageProvider: StorageProviderApi
  ): Promise<EddsaAccount> {
    // 1. Generate account with WASM
    const [clientShare, serverShare] = ["ffeksahfkj", "lhefskhj"];
    // 2. Save client share to provided storage
    const savedSharesString = await storageProvider.get("keyban-eddsa");
    console.log("savedStr", savedSharesString);
    const savedShares = JSON.parse(savedSharesString || "[]") as ClientShare[];
    savedShares.push(clientShare);
    await storageProvider
      .save("keyban-eddsa", JSON.stringify(savedShares))
      .catch((e) => {
        throw new SignerClientError(
          SignerClientErrors.FAILED_TO_SAVE_TO_STORE,
          e
        );
      });
    // 3. Upload share to server
    console.log(serverShare);
    // 4. return Account instance
    return new EddsaAccount(clientShare, this.wasmApi);
  }

  async getSaveAccounts(
    storageProvider: StorageProviderApi
  ): Promise<EddsaAccount[]> {
    // 3. Get all client shares for storage
    const savedSharesString = await storageProvider.get("keyban-eddsa");
    const savedShares = JSON.parse(savedSharesString ?? "[]") as ClientShare[];
    // 4. Return Account instances
    return savedShares.map(
      (clientShare) => new EddsaAccount(clientShare, this.wasmApi)
    );
  }

  async setChainMetadata() {
    /**/
  }
  async connectToProvider() {
    /**/
  }
}

export { StorageProviderApi, WasmApi, EddsaClient };
