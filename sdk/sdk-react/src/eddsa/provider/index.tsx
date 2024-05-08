import React, {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { type KeybanEddsaContext as ConetxtType, ErrorCodes } from "./types";
import { EddsaClient, getWasmBuffer } from "@keyban/sdk-base";
import type { WasmApi } from "@keyban/sdk-base";

export const KeybanEddsaContext = createContext<null | ConetxtType>(null);

export const KeybanProvider = ({
  children,
  storageProvider,
}: {
  children: ReactNode;
  storageProvider: ConetxtType["storageProvider"];
}) => {
  const wasmApiRef = useRef<ConetxtType["wasmApi"] | null>(null);
  const eddsaClientRef = useRef<ConetxtType["eddsaClient"] | null>(null);
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

      eddsaClientRef.current = new EddsaClient(wasmApi, storageProvider);
      setInitialized(true);
    };

    init();
  }, [storageProvider]);

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
      {children}
    </KeybanEddsaContext.Provider>
  );
};
