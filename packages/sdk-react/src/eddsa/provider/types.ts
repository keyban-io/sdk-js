import type { EddsaAccount, EddsaClient, WasmApi } from '@keyban/sdk-base';

export type KeybanEddsaContext = {
	// Base
	wasmApi: WasmApi | null;
	eddsaClient: EddsaClient | null;
	initialized: boolean;
	knownAccounts: EddsaAccount[];
} & Pick<EddsaClient, 'createAccount' | 'getSaveAccounts'>;
