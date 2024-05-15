import {
  createContext,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import type { KeybanEddsaContext as ConetxtType } from "./types";
import {
  EddsaClient,
  SignerClientError,
  SignerClientErrors,
} from "@keyban/sdk-base";
import { useWebViewMessage } from "react-native-react-bridge";
import WebView from "react-native-webview";
import { NativeWasm } from "../wasmBridge/nativeWasm";

export const KeybanEddsaContext = createContext<null | ConetxtType>(null);

export const KeybanEddsaProvider = ({
  children,
  webApp,
}: {
  children: ReactNode;
  webApp: string;
}) => {
  const wasmApiRef = useRef<NativeWasm | null>(null);
  const eddsaClientRef = useRef<ConetxtType["eddsaClient"] | null>(null);
  const [knownAccounts, setKnownAccounts] = useState<
    ConetxtType["knownAccounts"]
  >([]);
  const [initialized, setInitialized] = useState(false);

  const { ref, onMessage, emit } = useWebViewMessage(async (message) => {
    if (message.type === "initialized") {
      console.log("WebAssembly initialized inside WebView");
      wasmApiRef.current = new NativeWasm(emit);
      eddsaClientRef.current = new EddsaClient(wasmApiRef.current);
      setInitialized(true);
      return;
    }

    wasmApiRef.current?.receiveMessage(message.data as string);
  });

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
        knownAccounts,
        getSaveAccounts,
        createAccount,
      }}
    >
      <WebView
        ref={ref}
        style={{ display: "none" }}
        webviewDebuggingEnabled
        source={{ html: webApp }}
        onMessage={onMessage}
      />
      {children}
    </KeybanEddsaContext.Provider>
  );
};
