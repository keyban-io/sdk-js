import React, {
  createContext,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { type KeybanEddsaContext as ConetxtType, ErrorCodes } from "./types";
import { EddsaClient } from "@keyban/sdk-base";
import { useWebViewMessage } from "react-native-react-bridge";
import WebView from "react-native-webview";
import { NativeWasm } from "~/eddsa/wasmBridge/nativeWasm";
import webApp from "../wasmBridge/wasmWebView";

export const KeybanEddsaContext = createContext<null | ConetxtType>(null);

export const KeybanEddsaProvider = ({
  children,
  storageProvider,
}: {
  children: ReactNode;
  storageProvider: ConetxtType["storageProvider"];
}) => {
  const wasmApiRef = useRef<NativeWasm | null>(null);
  const eddsaClientRef = useRef<ConetxtType["eddsaClient"] | null>(null);
  const [initialized, setInitialized] = useState(false);

  const { ref, onMessage, emit } = useWebViewMessage(async (message) => {
    if (message.type === "initialized") {
      console.log("WebAssembly initialized inside WebView");
      wasmApiRef.current = new NativeWasm(emit);
      eddsaClientRef.current = new EddsaClient(wasmApiRef.current, {
        get: (_) => Promise.resolve("1"),
        save: (_, _m) => Promise.resolve(true),
      });
      await eddsaClientRef.current?.initialize();
      setInitialized(true);
      return;
    }

    wasmApiRef.current?.receiveMessage(message.data as string);
  });

  const add: ConetxtType["add"] = useCallback(
    (num1: number, num2: number) => {
      if (!initialized || !eddsaClientRef.current) {
        throw new Error(ErrorCodes.NOT_INITIALIZED);
      }

      return eddsaClientRef.current.add(num1, num2);
    },
    [initialized]
  );

  return (
    <KeybanEddsaContext.Provider
      value={{
        storageProvider,
        eddsaClient: eddsaClientRef.current,
        wasmApi: wasmApiRef.current,
        initialized,
        add,
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
