import type {
  EddsaClient,
  StorageProviderApi,
  WasmApi,
} from "@keyban/sdk-base";

export type KeybanEddsaContext = {
  // Base
  wasmApi: WasmApi | null;
  eddsaClient: EddsaClient | null;
  storageProvider: StorageProviderApi;
  initialized?: boolean;
} & Pick<EddsaClient, "add">;

export enum ErrorCodes {
  /// Client didn't yet initialize client
  NOT_INITIALIZED = "NOT_INITIALIZED",
}
