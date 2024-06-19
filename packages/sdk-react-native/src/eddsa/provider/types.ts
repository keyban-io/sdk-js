import type { EddsaAccount, EddsaClient, WasmApi } from '@keyban/sdk-base';

export type KeybanEddsaContext<T = WasmApi> = {
  // Base
  wasmApi: T | null;
  eddsaClient: EddsaClient | null;
  initialized: boolean;
  knownAccounts: EddsaAccount[];
  clientStatus: 'operational' | 'down' | null | false;
} & Pick<EddsaClient, 'initialize'>;
