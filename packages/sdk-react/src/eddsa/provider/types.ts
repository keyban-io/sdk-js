import type { EddsaAccount, EddsaClient, WasmApi } from '@keyban/sdk-base';

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
  /** Indicates whether the EDDSA client has been initialized. */
  initialized: boolean;
  /** An array of known EDDSA accounts. */
  knownAccounts: EddsaAccount[];
  /** The current status of the EDDSA client, which can be 'operational', 'down', or null. */
  clientStatus: 'operational' | 'down' | null;
} & Pick<EddsaClient, 'initialize'>;