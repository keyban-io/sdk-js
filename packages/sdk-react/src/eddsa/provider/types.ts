import type { EddsaAccount, EddsaClient, WasmApi, StorageProviderApi } from '@keyban/sdk-base';

/**
 * @typedef KeybanEddsaContext
 * 
 * The context type for the Keyban EDDSA client, providing necessary properties and methods to interact with the EDDSA client.
 */
export type KeybanEddsaContext = {
  /** The WebAssembly API interface, or null if not initialized. */
  wasmApi: WasmApi | null;
  /** The EDDSA client instance, or null if not initialized. */
  eddsaClient: EddsaClient | null;
  /** Indicates whether the EDDSA client has been initialized. 
   * Is set automatically to true, when the wasmApi is available.
   */
  initialized: boolean;
  /** An array of known EDDSA accounts. */
  knownAccounts: EddsaAccount[];
  /** The current status of the EDDSA client, which can be 'operational', 'down', or null. 
   * It means that the backend services used by the wasmApi are operational or down.
   */
  clientStatus: 'operational' | 'down' | null;

  /**
 * Initializes an EdDSA Account instance.
 * 
 * This method is exposed from the `EddsaClient` and can be used to initialize
 * the EDDSA client with the necessary configurations. It ensures that the client
 * is properly set up with the given storage provider and key identifier.
 * 
 * @param storageProvider - Any storage provider following {@link StorageProviderApi}. For web, it can be local storage; for native, AsyncStorage.
 * @param keyId - The key identifier used for storing and retrieving shares.
 * @returns Instance of {@link EddsaAccount}

 */
  initialize: (storageProvider: StorageProviderApi, keyId: string) => Promise<EddsaAccount>;
} & Pick<EddsaClient, 'initialize'>;