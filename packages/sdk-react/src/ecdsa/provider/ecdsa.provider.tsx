import { EcdsaClient, SdkError, initEcdsaWasm } from '@keyban/sdk-base';
import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { KeybanLocalStorage } from '../../storages';
import type { KeybanEcdsaContext } from './ecdsa.types';

/** @ignore */
export const KeybanEcdsaReactContext = createContext<null | KeybanEcdsaContext>(
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
 * React wrapper around ECDSA Client.
 * Provides context for interacting with the ECDSA client.
 *
 * @param children - The React children components.
 * @returns A React context provider for the ECDSA client.
 */
export const KeybanEcdsaProvider = ({ children }: { children: ReactNode }) => {
  const wasmApiRef = useRef<KeybanEcdsaContext['wasmApi'] | null>(null);
  const ecdsaClientRef = useRef<KeybanEcdsaContext['ecdsaClient'] | null>(null);
  const [knownAccounts, setKnownAccounts] = useState<
    KeybanEcdsaContext['knownAccounts']
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
          'KeybanEcdsaProvider.init',
        );
      }

      const wasmApi = await initEcdsaWasm();

      ecdsaClientRef.current = new EcdsaClient(wasmApi);
      setInitialized(true);
      const clientHealth = await ecdsaClientRef.current?.healthCheck();
      setClientStatus(clientHealth);
    };

    init();
  }, []);

  /**
   * Initializes the ECDSA client with the provided arguments.
   * @param args - The arguments for initializing the ECDSA client.
   * @throws SignerClientError if the client is not initialized.
   * @returns The initialized ECDSA account.
   */
  const initialize: KeybanEcdsaContext['initialize'] = useCallback(
    async (...args) => {
      if (!initialized || !ecdsaClientRef.current) {
        throw new SdkError(
          SdkError.types.ClientNotInitialized,
          'KeybanEcdsaProvider.initialize',
        );
      }

      checkIfStorageIsUnsafe(args);

      const account = await ecdsaClientRef.current?.initialize(...args);

      setKnownAccounts((prev) => {
        prev.push(account);
        return [...prev];
      });
      return account;
    },
    [initialized],
  );

  return (
    <KeybanEcdsaReactContext.Provider
      value={{
        ecdsaClient: ecdsaClientRef.current,
        wasmApi: wasmApiRef.current,
        initialized,
        initialize,
        knownAccounts,
        clientStatus,
      }}
    >
      {children}
    </KeybanEcdsaReactContext.Provider>
  );
};
