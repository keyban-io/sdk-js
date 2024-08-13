import { KeybanClientImpl } from "@keyban/sdk-base";
import type {
  KeybanApiStatus,
  KeybanClient,
  KeybanClientConfig,
} from "@keyban/sdk-base";
import React from "react";

export type KeybanContextType = {
  client: KeybanClient;
  apiStatus?: KeybanApiStatus;
};
const KeybanContext = React.createContext<KeybanContextType | null>(null);

export type KeybanProviderProps<Share> = React.PropsWithChildren<
  KeybanClientConfig<Share>
>;

export function KeybanProvider<Share>({
  children,
  ...clientConfig
}: KeybanProviderProps<Share>) {
  const client = React.useMemo(
    () => new KeybanClientImpl(clientConfig),
    [Object.values(clientConfig)],
  );

  const [apiStatus, setApiStatus] = React.useState<KeybanApiStatus>();
  React.useEffect(() => {
    let canceled = false;
    client.apiStatus().then((status) => {
      if (!canceled) setApiStatus(status);
    });
    return () => {
      canceled = true;
    };
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
