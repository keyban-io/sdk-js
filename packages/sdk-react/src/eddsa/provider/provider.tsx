import React, {
  type ReactNode,
  createContext,
  useCallback,
  useRef,
  useState
} from 'react';
import {
  EddsaClient,
  SignerClientError,
  SignerClientErrors,
  initWasm
} from '@keyban/sdk-base';
import { KeybanLocalStorage } from '../storages';
import type { KeybanEddsaContext } from './types';

/** @ignore */
export const KeybanEddsaReactContext = createContext<null | KeybanEddsaContext>(
  null,
);

const checkIfStorageIsUnsafe = (args: unknown[]) => {
  if (args.some((arg) => arg instanceof KeybanLocalStorage)) {
    console.warn("IMPORTANT: KEYBAN SDK SHOULDN'T BE USED WITH UNSAFE STORAGE");
  }
};

/** React wrapper around EDDSA Client
 *
 * */
export const KeybanEddsaProvider = ({ children }: { children: ReactNode }) => {
  const wasmApiRef = useRef<KeybanEddsaContext['wasmApi'] | null>(null);
  const eddsaClientRef = useRef<KeybanEddsaContext['eddsaClient'] | null>(null);
  const [knownAccounts, setKnownAccounts] = useState<
    KeybanEddsaContext['knownAccounts']
  >([]);
  const [initialized, setInitialized] = useState(false);
  const [clientStatus, setClientStatus] = useState<
    'operational' | 'down' | null
  >(null);

  React.useEffect(() => {
    const init = async () => {
      if (!WebAssembly) {
        throw new Error(
          'provider initialized in environment where WebAssembly is not supported!',
        );
      }

      eddsaClientRef.current = new EddsaClient(await initWasm());
      setInitialized(true);
      const clientHealth = await eddsaClientRef.current?.healthCheck();
      setClientStatus(clientHealth);
    };

    init();
  }, []);

  const initialize: KeybanEddsaContext['initialize'] = useCallback(
    async (...args) => {
      if (!initialized || !eddsaClientRef.current) {
        throw new SignerClientError(SignerClientErrors.CLIENT_NOT_INITIALIZED);
      }

      checkIfStorageIsUnsafe(args);

      const account = await eddsaClientRef.current?.initialize(...args);

      setKnownAccounts((prev) => {
        prev.push(account);
        return [...prev];
      });
      return account;
    },
    [initialized],
  );

  return (
    <KeybanEddsaReactContext.Provider
      value={{
        eddsaClient: eddsaClientRef.current,
        wasmApi: wasmApiRef.current,
        initialized,
        initialize,
        knownAccounts,
        clientStatus,
      }}
    >
      {children}
    </KeybanEddsaReactContext.Provider>
  );
};