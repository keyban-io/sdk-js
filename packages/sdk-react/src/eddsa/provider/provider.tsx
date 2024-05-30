import {
  EddsaClient,
  SignerClientError,
  SignerClientErrors,
  initWasm,
} from "@keyban/sdk-base";
import type { WasmApi } from "@keyban/sdk-base";
import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { KeybanEddsaContext } from "./types";

/** @ignore */
export const KeybanEddsaReactContext = createContext<null | KeybanEddsaContext>(
  null
);

/** React wrapper around EDDSA Client
 * @component
 * */
export const KeybanEddsaProvider = ({ children }: { children: ReactNode }) => {
  const wasmApiRef = useRef<KeybanEddsaContext["wasmApi"] | null>(null);
  const eddsaClientRef = useRef<KeybanEddsaContext["eddsaClient"] | null>(null);
  const [knownAccounts, setKnownAccounts] = useState<
    KeybanEddsaContext["knownAccounts"]
  >([]);
  const [initialized, setInitialized] = useState(false);
  const [clientStatus, setClientStatus] = useState<
    "operational" | "down" | null
  >(null);

  useEffect(() => {
    const init = async () => {
      if (!WebAssembly) {
        throw new Error(
          "provider initialized in environment where WebAssembly is not supported!"
        );
      }
      const wasmApi = (await initWasm()) as unknown as WasmApi;

      // const wasmApi = (await WebAssembly.instantiate(wasmBuffer)).instance
      //   .exports as WasmApi;
      // wasmApiRef.current = wasmApi;

      eddsaClientRef.current = new EddsaClient(wasmApi);
      setInitialized(true);
      const clientHealth = await eddsaClientRef.current?.healthCheck();
      setClientStatus(clientHealth);
    };

    init();
  }, []);

  const createAccount: KeybanEddsaContext["createAccount"] = useCallback(
    async (storageProvider) => {
      if (!initialized || !eddsaClientRef.current) {
        throw new SignerClientError(SignerClientErrors.CLIENT_NOT_INITIALIZED);
      }

      const account = await eddsaClientRef.current?.createAccount(
        storageProvider
      );

      setKnownAccounts((prev) => {
        prev.push(account);
        return [...prev];
      });
      return account;
    },
    [initialized]
  );

  /**
   * Used to retrieve previously saved Keyaban account.
   * @param storageProvider - Any storage provider following @keyban/sdk-base {@link StorageProviderApi}. Eg. ${@link KeybanLocalStorage}
   * @returns Array of {@link EddsaAccount}
   */
  const getSaveAccounts: KeybanEddsaContext["getSaveAccounts"] = useCallback(
    async (storageProvider) => {
      if (!initialized || !eddsaClientRef.current) {
        throw new SignerClientError(SignerClientErrors.CLIENT_NOT_INITIALIZED);
      }

      const accounts = await eddsaClientRef.current?.getSaveAccounts(
        storageProvider
      );
      setKnownAccounts(accounts);
      return accounts;
    },
    [initialized]
  );

  return (
    <KeybanEddsaReactContext.Provider
      value={{
        eddsaClient: eddsaClientRef.current,
        wasmApi: wasmApiRef.current,
        initialized,
        createAccount,
        getSaveAccounts,
        knownAccounts,
        clientStatus,
      }}
    >
      {children}
    </KeybanEddsaReactContext.Provider>
  );
};
