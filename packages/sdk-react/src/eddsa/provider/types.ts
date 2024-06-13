import type { EddsaAccount, EddsaClient, WasmApi } from '@keyban/sdk-base';

export type KeybanEddsaContext = {
  // Base
  wasmApi: WasmApi | null;
  eddsaClient: EddsaClient | null;
  initialized: boolean;
  knownAccounts: EddsaAccount[];
  clientStatus: 'operational' | 'down' | null;
} & Pick<EddsaClient, 'initialize'>;
