import { KeybanClientImpl } from '@keyban/sdk-base';
import type {
  KeybanApiStatus,
  KeybanClient,
  KeybanSigner,
  KeybanStorage,
} from '@keyban/sdk-base';
import React from 'react';

export type KeybanContextType = {
  client: KeybanClient;
  apiStatus?: KeybanApiStatus;
};
const KeybanContext = React.createContext<KeybanContextType | null>(null);

export type KeybanProviderProps<
  Share,
  S extends KeybanStorage<Share>,
> = React.PropsWithChildren<{
  apiUrl?: string;
  signer: () => KeybanSigner<Share>;
  storage: new () => S;
}>;

export function KeybanProvider<Share, S extends KeybanStorage<Share>>({
  apiUrl = 'https://keyban.localtest.me',
  signer,
  storage,
  children,
}: KeybanProviderProps<Share, S>) {
  const client = React.useMemo(
    () => new KeybanClientImpl(apiUrl, signer(), new storage()),
    [apiUrl, signer, storage],
  );

  const [apiStatus, setApiStatus] = React.useState<KeybanApiStatus>();
  React.useEffect(() => {
    client?.apiStatus().then(setApiStatus);
  }, [client]);

  const value = React.useMemo(
    () => ({
      client,
      apiStatus,
    }),
    [client, apiStatus],
  );

  return (
    <KeybanContext.Provider value={value}>{children}</KeybanContext.Provider>
  );
}

export const useKeyban = () => {
  const ctx = React.useContext(KeybanContext);
  if (!ctx)
    throw new Error('useKeyban hook must be used within a KeybanProvider');
  return ctx;
};
