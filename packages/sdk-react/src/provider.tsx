import { KeybanClient, type KeybanClientConfig } from "@keyban/sdk-base";
import React from "react";

import { PromiseCacheProvider } from "./promise";

const clients = new Map<string, KeybanClient>();

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
 * @param props - The Keyban provider configuration options.
 * @returns - The provider component that includes the Keyban client context.
 *
 * @throws {Error} If the configuration is invalid.
 *
 * @see {@link KeybanClientConfig} for the available configuration options.
 *
 * @example
 * ```tsx
 * import { KeybanProvider, KeybanChain, KeybanSigner } from "@keyban/sdk-react";
 * import { useState } from 'react';
 * import { AppRouter } from './AppRouter';
 *
 * // A component to allow the user to select the blockchain network (chain)
 * const ChainSelector: React.FC<{ onSelectChain: (chain: KeybanChain) => void }> = ({ onSelectChain }) => {
 *   return (
 *     <div>
 *       <button onClick={() => onSelectChain(KeybanChain.KeybanTestnet)}>Switch to Testnet</button>
 *       <button onClick={() => onSelectChain(KeybanChain.PolygonAmoy)}>Switch to Polygon Amoy</button>
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
 *       <KeybanProvider chain={chain}>
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

  const key = JSON.stringify(config);
  let client = clients.get(key);
  if (!client) {
    client = new KeybanClient({
      accessTokenProvider: () => atProviderRef.current(),
      ...config,
    });
    clients.set(key, client);
  }

  React.useEffect(
    () => () => {
      clients.delete(key);
    },
    [key],
  );

  return (
    <KeybanContext.Provider value={client}>
      <PromiseCacheProvider>{children}</PromiseCacheProvider>
    </KeybanContext.Provider>
  );
}

/**
 * Hook to access the Keyban SDK functionalities within a React component.
 *
 * The `useKeybanClient` hook allows you to access the initialized Keyban client,
 * enabling direct interaction with the SDK from functional React components. This hook
 * ensures that the Keyban client is available within the application's context and allows
 * you to utilize features such as account management, transactions, and blockchain queries.
 *
 * @returns {KeybanClient} The initialized Keyban client.
 *
 * @throws {Error} If the hook is used outside of a {@link KeybanProvider}, indicating that
 * the context is not properly configured to provide the Keyban client.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { useKeybanClient } from "@keyban/sdk-react";
 *
 * const MyComponent: React.FC = () => {
 *   const keybanClient = useKeybanClient();
 *
 *   const handleCheckStatus = async () => {
 *     try {
 *       const status = await keybanClient.apiStatus();
 *       console.log(`Keyban API Status: ${status}`);
 *     } catch (error) {
 *       console.error("Error checking Keyban API status:", error);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleCheckStatus}>Check API Status</button>
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 *
 * @see {@link KeybanClient} For more details on the Keyban client.
 * @see {@link KeybanProvider} To understand how to set up the Keyban SDK context in your application.
 *
 */
export const useKeybanClient = () => {
  const ctx = React.useContext(KeybanContext);
  if (!ctx)
    throw new Error(
      "useKeybanClient hook must be used within a KeybanProvider",
    );
  return ctx;
};
