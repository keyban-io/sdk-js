import {
  EddsaClient,
  getWasmBuffer,
  SignerClientError,
  SignerClientErrors,
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
import type { KeybanEddsaContext as ConetxtType } from "./types";

export const KeybanEddsaContext = createContext<null | ConetxtType>(null);

export const KeybanEddsaProvider = ({ children }: { children: ReactNode }) => {
  const wasmApiRef = useRef<ConetxtType["wasmApi"] | null>(null);
  const eddsaClientRef = useRef<ConetxtType["eddsaClient"] | null>(null);
  const [knownAccounts, setKnownAccounts] = useState<
    ConetxtType["knownAccounts"]
  >([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!WebAssembly) {
        throw new Error(
          "provider initialized in environment where WebAssembly is not supported!"
        );
      }
      const wasmBuffer = await getWasmBuffer();
      const wasmApi = (await WebAssembly.instantiate(wasmBuffer)).instance
        .exports as WasmApi;
      wasmApiRef.current = wasmApi;

      eddsaClientRef.current = new EddsaClient(wasmApi);
      setInitialized(true);
    };

    init();
  }, []);

  const createAccount: ConetxtType["createAccount"] = useCallback(
    async (storageProvider) => {
      if (!initialized || !eddsaClientRef.current) {
        throw new SignerClientError(SignerClientErrors.CLIENT_NOT_INITIALIZED);
      }

      const account = await eddsaClientRef.current?.createAccount(
        storageProvider
      );
      setKnownAccounts((prev) => {
        prev.push(account);
        return prev;
      });

      return account;
    },
    [initialized]
  );

  const getSaveAccounts: ConetxtType["getSaveAccounts"] = useCallback(
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
    <KeybanEddsaContext.Provider
      value={{
        eddsaClient: eddsaClientRef.current,
        wasmApi: wasmApiRef.current,
        initialized,
        createAccount,
        getSaveAccounts,
        knownAccounts,
      }}
    >
      {children}
    </KeybanEddsaContext.Provider>
  );
};
