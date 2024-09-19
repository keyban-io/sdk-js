import React from "react";

import { KeybanClient, type KeybanClientConfig } from "@keyban/sdk-base";

import { PromiseCacheProvider } from "./promise";

const KeybanContext = React.createContext<KeybanClient | null>(null);

/**
 * @private
 */
export type KeybanProviderProps = React.PropsWithChildren<KeybanClientConfig>;

/**
 * Provider component for the Keyban SDK.
 * This component wraps the application and provides Keyban SDK functionalities
 * to the components within the application. It is responsible for configuring
 * the Keyban client with the appropriate options and ensuring that the SDK is
 * accessible via the `useKeybanClient` hook.
 *
 * The configuration options for the Keyban SDK are specified via the {@link KeybanClientConfig}
 * type, which includes settings such as the API URL, blockchain network (`chain`), signing algorithm
 * (`signer`), and storage mechanism (`storage`).
 *
 * The provider supports dynamic updates to certain configuration options, such as `chain`,
 * allowing components to adjust the blockchain network or other configurations during the
 * application's lifecycle.
 *
 * @param {KeybanProviderProps} config - The Keyban configuration options.
 * @param {React.ReactNode} children - The child components to render within the provider.
 * @returns {React.ReactNode} The provider component that includes the Keyban client context.
 *
 * @throws {Error} If the configuration is invalid.
 *
 * @see {@link KeybanClientConfig} for the available configuration options.
 *
 * @example
 * ```tsx
 * import { KeybanProvider, KeybanChain, KeybanSigner, KeybanLocalStorage } from "@keyban/sdk-react";
 * import { useState } from 'react';
 * import { AppRouter } from './AppRouter';
 *
 * // A component to allow the user to select the blockchain network (chain)
 * const ChainSelector: React.FC<{ onSelectChain: (chain: KeybanChain) => void }> = ({ onSelectChain }) => {
 *   return (
 *     <div>
 *       <button onClick={() => onSelectChain(KeybanChain.KeybanTestnet)}>Switch to Testnet</button>
 *       <button onClick={() => onSelectChain(KeybanChain.PolygonAmoy)}>Switch to Polygon</button>
 *     </div>
 *   );
 * };
 *
 * const App: React.FC = () => {
 *   const [chain, setChain] = useState<KeybanChain>(KeybanChain.KeybanTestnet);
 *
 *   // Function to handle changes in the selected blockchain network
 *   const handleChainSelect = (newChain: KeybanChain) => {
 *     setChain(newChain);
 *   };
 *
 *   return (
 *     <>
 *       <ChainSelector onSelectChain={handleChainSelect} />
 *       <KeybanProvider
 *         apiUrl="https://api.keyban.localtest.me"
 *         chain={chain}
 *         storage={KeybanLocalStorage}
 *       >
 *         <AppRouter />  // The application router component
 *       </KeybanProvider>
 *     </>
 *   );
 * };
 * ```
 *
 * In this example:
 * - The blockchain network (`chain`) can be dynamically updated using the `handleChainSelect` function.
 * - The `ChainSelector` component is responsible for triggering updates to the `chain` configuration, and it is placed outside the `KeybanProvider` to ensure proper re-initialization of the provider.
 */
export function KeybanProvider({
  children,
  accessTokenProvider,
  ...config
}: KeybanProviderProps) {
  const atProviderRef = React.useRef(accessTokenProvider);
  React.useImperativeHandle(atProviderRef, () => accessTokenProvider, [
    accessTokenProvider,
  ]);

  const client = React.useMemo(
    () =>
      new KeybanClient({
        ...config,
        accessTokenProvider: () => atProviderRef.current(),
      }),
    Object.values(config),
  );

  return (
    <KeybanContext.Provider value={client}>
      <PromiseCacheProvider>{children}</PromiseCacheProvider>
    </KeybanContext.Provider>
  );
}

/**
 * Hook to access the Keyban SDK functionalities within a component.
 * This hook provides access to the initialized Keyban client, allowing the component
 * to interact with the SDK. It throws an error if called outside of a {@link KeybanProvider}.
 *
 * @throws {Error} If the hook is used outside of a {@link KeybanProvider}.
 *
 * @returns {KeybanClient} The initialized Keyban client.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const keybanClient = useKeybanClient();
 *   // Use the Keyban client to interact with blockchain functionality
 * };
 * ```
 */
export const useKeybanClient = () => {
  const ctx = React.useContext(KeybanContext);
  if (!ctx)
    throw new Error(
      "useKeybanClient hook must be used within a KeybanProvider",
    );
  return ctx;
};
