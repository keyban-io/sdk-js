import { EddsaClient, SdkError, initEddsaWasm } from '@keyban/sdk-base';
import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { KeybanLocalStorage } from '../../storages';
import type { KeybanEddsaContext } from './eddsa.types';

/** @ignore */
export const KeybanEddsaReactContext = createContext<null | KeybanEddsaContext>(
  null,
);

/**
 * Checks if any of the provided arguments use KeybanLocalStorage and logs a warning if found.
 * @param args - The arguments to check.
 * @remarks
 * Using KeybanLocalStorage in production is unsafe.
 */
const checkIfStorageIsUnsafe = (args: unknown[]) => {
  if (args.some((arg) => arg instanceof KeybanLocalStorage)) {
    console.warn("IMPORTANT: KEYBAN SDK SHOULDN'T BE USED WITH UNSAFE STORAGE");
  }
};

/**
 * React wrapper around EdDSA Client.
 * Provides context for interacting with the EdDSA client.
 *
 * @param children - The React children components.
 * @returns A React context provider for the EdDSA client.
 */
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

  useEffect(() => {
    const init = async () => {
      if (!WebAssembly) {
        throw new SdkError(
          SdkError.types.WebAssemblyNotSupported,
          'KeybanEddsaProvider.init',
        );
      }

      eddsaClientRef.current = new EddsaClient(await initEddsaWasm());
      setInitialized(true);
      const clientHealth = await eddsaClientRef.current?.healthCheck();
      setClientStatus(clientHealth);
    };

    init();
  }, []);

  /**
   * Initializes the EdDSA client with the provided arguments.
   * @param args - The arguments for initializing the EdDSA client.
   * @throws SignerClientError if the client is not initialized.
   * @returns The initialized EdDSA account.
   */
  const initialize: KeybanEddsaContext['initialize'] = useCallback(
    async (...args) => {
      if (!initialized || !eddsaClientRef.current) {
        throw new SdkError(
          SdkError.types.ClientNotInitialized,
          'KeybanEddsaProvider.initialize',
        );
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
