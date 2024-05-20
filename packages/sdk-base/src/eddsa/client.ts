import { StorageProviderApi, WasmApi } from "./types";
import { EddsaAccount } from "./account";
import type { ClientShare } from "./account.types";
import SignerClientError, {
  SignerClientErrors,
} from "~/errors/SignerClientError";

/**
 * Client class for EDDSA Hedera connectivity and general logic.
 */
class EddsaClient {
  /** Interface offering the WebAssembly Rust logic following {@link WasmApi} */
  wasmApi;

  /**
   * The constructor of the `EddsaClient` class.
   * @param wasmApi - The source of the WebAssembly Rust logic, for web is plain WebAssembly object, for react-native it required bridger
   */
  constructor(wasmApi: WasmApi) {
    this.wasmApi = wasmApi;
  }

  /**
   * Function for EDDSA account creation
   * @param storageProvider - Any storage provider following {@link StorageProviderApi}. For web, it can be local storage, for native AsyncStorage.
   * @returns Instance of {@link EddsaAccount}
   */
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

  /**
   * Function for retrieving EDDSA accounts from provided storage
   * @param storageProvider - Any storage provider following {@link StorageProviderApi}. For web, it can be local storage, for native AsyncStorage.
   * @returns Array of {@link EddsaAccount}
   */
  async getSaveAccounts(
    storageProvider: StorageProviderApi
  ): Promise<EddsaAccount[]> {
    // 3. Get all client shares for storage
    const savedSharesString = await storageProvider
      .get("keyban-eddsa")
      .catch((e) => {
        throw new SignerClientError(
          SignerClientErrors.FAILED_TO_READ_FROM_STORE,
          e
        );
      });
    const savedShares = JSON.parse(savedSharesString ?? "[]") as ClientShare[];
    // 4. Return Account instances
    return savedShares.map(
      (clientShare) => new EddsaAccount(clientShare, this.wasmApi)
    );
  }

  /**
   * Function for setting up chain metadata
   */
  async setChainMetadata() {
    /**/
  }

  /**
   * Function for connecting to chain provider
   */
  async connectToProvider() {
    /**/
  }
}

export { StorageProviderApi, WasmApi, EddsaClient };
