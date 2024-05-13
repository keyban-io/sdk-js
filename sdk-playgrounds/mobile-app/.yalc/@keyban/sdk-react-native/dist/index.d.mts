import { WasmApi, EddsaClient, StorageProviderApi } from '@keyban/sdk-base';
import * as react from 'react';
import { ReactNode } from 'react';

type KeybanEddsaContext$1<T = WasmApi> = {
    wasmApi: T | null;
    eddsaClient: EddsaClient | null;
    storageProvider: StorageProviderApi;
    initialized?: boolean;
} & Pick<EddsaClient, "add">;

declare const useKeybanEddsa: () => KeybanEddsaContext$1;

declare const KeybanEddsaContext: react.Context<KeybanEddsaContext$1 | null>;
declare const KeybanEddsaProvider: ({ children, storageProvider, webApp, }: {
    children: ReactNode;
    storageProvider: KeybanEddsaContext$1["storageProvider"];
    webApp: string;
}) => JSX.Element;

export { KeybanEddsaContext, KeybanEddsaProvider, useKeybanEddsa };
