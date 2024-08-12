import { KeybanClientImpl } from "@keyban/sdk-base";
import type {
  KeybanApiStatus,
  KeybanChain,
  KeybanClient,
  KeybanSigner,
  KeybanStorage,
} from "@keyban/sdk-base";
import React from "react";

export type KeybanContextType = {
  client: KeybanClient;
  apiStatus?: KeybanApiStatus;
};
const KeybanContext = React.createContext<KeybanContextType | null>(null);

export type KeybanProviderProps<Share> = React.PropsWithChildren<{
  apiUrl?: string;
  chain: KeybanChain;
  signer: () => KeybanSigner<Share>;
  storage: new <T>() => KeybanStorage<T>;
}>;

export function KeybanProvider<Share>({
  apiUrl = "https://keyban.localtest.me",
  chain,
  signer,
  storage,
  children,
}: KeybanProviderProps<Share>) {
  const client = React.useMemo(
    () => new KeybanClientImpl(apiUrl, chain, signer, storage),
    [apiUrl, signer, storage],
  );

  const [apiStatus, setApiStatus] = React.useState<KeybanApiStatus>();
  React.useEffect(() => {
    client.apiStatus().then(setApiStatus);
  }, [client]);

  const value = React.useMemo(
    () => ({ client, apiStatus }),
    [client, apiStatus],
  );

  return (
    <KeybanContext.Provider value={value}>{children}</KeybanContext.Provider>
  );
}

export const useKeyban = () => {
  const ctx = React.useContext(KeybanContext);
  if (!ctx)
    throw new Error("useKeyban hook must be used within a KeybanProvider");
  return ctx;
};
