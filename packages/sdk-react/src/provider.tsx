import { KeybanClient, KeybanClientConfig } from "@keyban/sdk-base";
import React from "react";
import { PromiseCacheProvider } from "./promise";

const KeybanContext = React.createContext<KeybanClient | null>(null);

/**
 * @private
 */
export type KeybanProviderProps = React.PropsWithChildren<KeybanClientConfig>;

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
export function KeybanProvider({ children, ...config }: KeybanProviderProps) {
  const client = React.useMemo(
    () => new KeybanClient(config),
    Object.values(config),
  );

  return (
    <PromiseCacheProvider>
      <KeybanContext.Provider value={client}>{children}</KeybanContext.Provider>
    </PromiseCacheProvider>
  );
}
/**
 * Hook to access the Keyban SDK functionalities within a component
 * @throws Error if the hook is used outside of a {@link KeybanProvider}
 */
export const useKeybanClient = () => {
  const ctx = React.useContext(KeybanContext);
  if (!ctx)
    throw new Error(
      "useKeybanClient hook must be used within a KeybanProvider",
    );
  return ctx;
};
