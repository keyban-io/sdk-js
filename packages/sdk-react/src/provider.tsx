import {
  KeybanClientImpl,
  KeybanApiStatus,
  KeybanClient,
  KeybanSigner,
  KeybanStorage,
} from "@keyban/sdk-base";
import React from "react";

export * from "@keyban/sdk-base";
export { KeybanSigner } from "@keyban/sdk-base";

type KeybanContextType = {
  initialized: boolean;
  client?: KeybanClient;
  apiStatus?: KeybanApiStatus;
};
const KeybanContext = React.createContext<KeybanContextType>({
  initialized: false,
});

export type KeybanProviderProps<
  Share,
  S extends KeybanStorage<Share>
> = React.PropsWithChildren<{
  apiUrl?: string;
  signer: () => Promise<KeybanSigner<Share>>;
  storage: new () => S;
}>;

export function KeybanProvider<Share, S extends KeybanStorage<Share>>({
  apiUrl = "https://keyban.localtest.me",
  signer,
  storage,
  children,
}: KeybanProviderProps<Share, S>) {
  const [client, setClient] = React.useState<KeybanClient>();
  React.useEffect(() => {
    signer()
      .then((signer) => new KeybanClientImpl(apiUrl, signer, new storage()))
      .then(setClient);
  }, [apiUrl, signer, storage]);

  const [apiStatus, setApiStatus] = React.useState<KeybanApiStatus>();
  React.useEffect(() => {
    client?.apiStatus().then(setApiStatus);
  }, [client]);

  const value = React.useMemo(
    () => ({
      initialized: Boolean(client),
      client,
      apiStatus,
    }),
    [client, apiStatus]
  );

  return (
    <KeybanContext.Provider value={value}>{children}</KeybanContext.Provider>
  );
}

export const useKeyban = () => React.useContext(KeybanContext);
