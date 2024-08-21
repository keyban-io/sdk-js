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

/**
 * @private
 */
export type KeybanProviderProps<Share> = React.PropsWithChildren<
  KeybanClientConfig<Share>
>;

/**
 * Provider component for the Keyban SDK.
 * This component must be used to wrap the application and provide the Keyban SDK
 * functionalities to the components.
 *
 * @returns The provider component.
 *
 * @see {@link KeybanClientConfig} for the configuration options.
 *
 * @example
 * ```tsx
 * import { KeybanProvider, KeybanChain, KeybanSigner, KeybanLocalStorage } from "@keyban/sdk-react";
 *
 * // Main Wallet component wrapped with KeybanProvider to supply SDK context
 * const Wallet: React.FC = () => (
 *   <KeybanProvider
 *     chain={KeybanChain.polygonAmoy} // Specifies the blockchain network (Polygon)
 *     signer={KeybanSigner.ECDSA} // Specifies the signing algorithm (ECDSA)
 *     storage={KeybanLocalStorage} // Specifies the storage mechanism (LocalStorage)
 *   >
 *     <WalletContent />  // WalletContent is a component that uses the Keyban SDK
 *   </KeybanProvider>
 * );
 * ```
 */
export function KeybanProvider<Share>({
  children,
  ...KeybanClientConfig
}: KeybanProviderProps<Share>) {
  const client = React.useMemo(
    () => new KeybanClientImpl(KeybanClientConfig),
    [Object.values(KeybanClientConfig)],
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
/**
 * Hook to access the Keyban SDK functionalities within a component
 * @throws Error if the hook is used outside of a {@link KeybanProvider}
 */
export const useKeyban = () => {
  const ctx = React.useContext(KeybanContext);
  if (!ctx)
    throw new Error("useKeyban hook must be used within a KeybanProvider");
  return ctx;
};
