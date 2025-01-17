/**
 * @module Provider
 */

import { KeybanClient, type KeybanClientConfig } from "@keyban/sdk-base";
import React from "react";

import { PromiseCacheProvider } from "./promise";

const KeybanContext = React.createContext<{
  client: KeybanClient;
  auth: {
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated?: boolean;
    isLoading: boolean;
  };
} | null>(null);

/**
 * Defines the properties for the KeybanProvider component.
 *
 * Includes the Keyban client configuration and supports React children.
 * @see {@link KeybanClientConfig} for the available configuration options.
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
 * Additionally, the `clientShareProvider` prop allows for the injection of a client share provider function.
 * This function is used to cipher the client's share of the end user and is stored securely within Keyban's infrastructure.
 * By utilizing this, Keyban as the server and client share cannot sign operations on behalf of the end users.
 * We recommend providing a unique key per client share to enhance security.
 * @param props - The Keyban provider configuration options.
 * @throws {Error} If the configuration is invalid.
 * @returns The provider component wrapping the children components.
 * @see {@link KeybanClientConfig} for the available configuration options.
 * @see {@link ClientShareProvider} for managing shared keys in client-side operations.
 * @example
 * ```tsx
 * import React from "react";
 * import { KeybanProvider, KeybanChain } from "@keyban/sdk-react";
 * import { MyClientShareProvider } from './ClientShareProvider';
 *
 * const App: React.FC = () => {
 *
 *   return (
 *     <KeybanProvider
 *       apiUrl="https://api.keyban.io" // Base URL for Keyban API
 *       appId="your-app-id" // Your unique application ID from Keyban
 *       chain={KeybanChain.KeybanTestnet} // Specify the blockchain network (e.g., Testnet or Mainnet)
 *       clientShareProvider={new MyClientShareProvider()} // Custom provider for client shares
 *     >
 *       <YourMainComponent />
 *     </KeybanProvider>
 *   );
 * };
 *
 * export default App;
 * ```
 */
export function KeybanProvider(props: KeybanProviderProps) {
  const { children, clientShareProvider, ...config } = props;

  const clientShareProviderRef = React.useRef(clientShareProvider);
  React.useImperativeHandle(clientShareProviderRef, () => clientShareProvider, [
    clientShareProvider,
  ]);

  const client = React.useMemo(
    () =>
      new KeybanClient({
        ...config,
        clientShareProvider: {
          get: () => clientShareProviderRef.current.get(),
          set: (share: string) => clientShareProviderRef.current.set(share),
        },
      }),
    Object.values(config),
  );

  // In strict mode, this will cause the wrong client to be destroyed... 🤦
  // React.useEffect(() => () => client.destroy(), [client]);

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>();
  const updateIsAuthenticated = React.useCallback(
    () => client.isAuthenticated().then(setIsAuthenticated),
    [client],
  );

  React.useEffect(() => {
    updateIsAuthenticated();
  }, [updateIsAuthenticated]);

  const login = React.useCallback(
    () => client.login().then(updateIsAuthenticated),
    [client, updateIsAuthenticated],
  );
  const logout = React.useCallback(
    () => client.logout().then(updateIsAuthenticated),
    [client, updateIsAuthenticated],
  );

  const auth = React.useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
      isLoading: isAuthenticated == null,
    }),
    [login, logout, isAuthenticated],
  );

  return (
    <KeybanContext.Provider
      value={React.useMemo(() => ({ client, auth }), [client, auth])}
    >
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
 * @returns The initialized Keyban client.
 * @throws {Error} If the hook is used outside of a {@link KeybanProvider}, indicating that
 * the context is not properly configured to provide the Keyban client.
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
 * @see {@link KeybanClient} For more details on the Keyban client.
 * @see {@link KeybanProvider} To understand how to set up the Keyban SDK context in your application.
 */
export const useKeybanClient = () => {
  const ctx = React.useContext(KeybanContext);
  if (!ctx)
    throw new Error(
      "useKeybanClient hook must be used within a KeybanProvider",
    );
  return ctx.client;
};

/**
 * Hook that provides authentication functionality using the Keyban client.
 *
 * To access the Keyban service, the user must authenticate with the Keyban services.
 * The goal is to ensure that only the user has access to their wallet. The application
 * itself does not have direct access to the wallet unless the user authenticates.
 * This approach enhances security by preventing unauthorized access.
 * @returns An object containing:
 * - `login`: A function to log in the user.
 * - `logout`: A function to log out the user.
 * - `isAuthenticated`: A boolean indicating whether the user is authenticated.
 * - `isLoading`: A boolean indicating whether the authentication status is still being determined.
 */
export function useKeybanAuth() {
  const ctx = React.useContext(KeybanContext);
  if (!ctx)
    throw new Error("useKeybanAuth hook must be used within a KeybanProvider");
  return ctx.auth;
}
