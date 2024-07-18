import type {
  EcdsaAccount,
  EcdsaClient,
  EcdsaClientShare,
  EcdsaWasmApi,
  StorageProviderApi,
} from '@keyban/sdk-base';

/**
 * @typedef KeybanEcdsaContext
 *
 * The context type for the Keyban ECDSA client, providing necessary properties and methods to interact with the ECDSA client.
 */
export type KeybanEcdsaContext = {
  /** The WebAssembly API interface, or null if not initialized. */
  wasmApi: EcdsaWasmApi | null;
  /** The ECDSA client instance, or null if not initialized. */
  ecdsaClient: EcdsaClient | null;
  /** Indicates whether the ECDSA client has been initialized.
   * Is set automatically to true, when the wasmApi is available.
   */
  initialized: boolean;
  /** An array of known ECDSA accounts. */
  knownAccounts: EcdsaAccount[];
  /** The current status of the ECDSA client, which can be 'operational', 'down', or null.
   * It means that the backend services used by the wasmApi are operational or down.
   */
  clientStatus: 'operational' | 'down' | null;

  /**
 * Initializes an EcDSA Account instance.
 *
 * This method is exposed from the `EcdsaClient` and can be used to initialize
 * the ECDSA client with the necessary configurations. It ensures that the client
 * is properly set up with the given storage provider and key identifier.
 *
 * @param storageProvider - Any storage provider following {@link StorageProviderApi}. For web, it can be local storage; for native, AsyncStorage.
 * @param keyId - The key identifier used for storing and retrieving shares.
 * @returns Instance of {@link EcdsaAccount}

 */
  initialize: (
    storageProvider: StorageProviderApi<EcdsaClientShare>,
    keyId: string,
  ) => Promise<EcdsaAccount>;
} & Pick<EcdsaClient, 'initialize'>;
