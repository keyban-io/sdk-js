import { AuthConnection, KeybanUser } from "@keyban/sdk-base";
import React from "react";

import { useKeybanClient } from "~/provider";

/**
 * Represents the authentication state of the user.
 *
 * This type can be one of the following states:
 *
 * - **Loading**:
 *   - `user`: `undefined`
 *   - `isAuthenticated`: `undefined`
 *   - `isLoading`: `true`
 *
 * - **Unauthenticated**:
 *   - `user`: `null`
 *   - `isAuthenticated`: `false`
 *   - `isLoading`: `false`
 *
 * - **Authenticated**:
 *   - `user`: `KeybanUser`
 *   - `isAuthenticated`: `true`
 *   - `isLoading`: `false`
 */
export type BaseAuth =
  | { user: undefined; isAuthenticated: undefined; isLoading: true }
  | { user: null; isAuthenticated: false; isLoading: false }
  | { user: KeybanUser; isAuthenticated: true; isLoading: false };

/**
 * Represents the authentication context which extends the base authentication.
 * Provides methods for logging in and logging out.
 * @property {function(AuthConnection): Promise<void>} login - Logs in using the provided connection.
 * @property {function(): Promise<void>} logout - Logs out the current user.
 */
export type AuthContext = BaseAuth & {
  login: (connection?: AuthConnection) => Promise<void>;
  logout: () => Promise<void>;
};

/**
 * Context for Keyban authentication.
 *
 * This context provides an `AuthContext` or `null` if not available.
 * It is used to manage authentication state and provide authentication-related
 * functionality throughout the application.
 * @type {React.Context<AuthContext | null>}
 */
export const KeybanAuthContext = React.createContext<AuthContext | null>(null);

/**
 * KeybanAuthProvider
 * @param props - Component props
 * @param props.children - Children
 * @returns - JSX element
 * @private
 */
export function KeybanAuthProvider({ children }: React.PropsWithChildren) {
  const client = useKeybanClient();

  const [user, setUser] = React.useState<KeybanUser | null>();
  const updateUser = React.useCallback(
    () => client.getUser().then(setUser),
    [client],
  );

  React.useEffect(() => {
    updateUser();
  }, [updateUser]);

  const login = React.useCallback(
    (connection?: AuthConnection) => client.login(connection).then(updateUser),
    [client, updateUser],
  );
  const logout = React.useCallback(
    () => client.logout().then(updateUser),
    [client, updateUser],
  );

  const auth = React.useMemo(
    () => ({
      login,
      logout,
      user,
      isAuthenticated: user === undefined ? undefined : user !== null,
      isLoading: user === undefined,
    }),
    [login, logout, user],
  );

  return (
    <KeybanAuthContext.Provider value={auth as AuthContext}>
      {children}
    </KeybanAuthContext.Provider>
  );
}

/**
 * Hook that provides authentication functionality using the Keyban client.
 *
 * To access the Keyban service, the user must authenticate with the Keyban services.
 * The goal is to ensure that only the user has access to their wallet. The application
 * itself does not have direct access to the wallet unless the user authenticates.
 * This approach enhances security by preventing unauthorized access.
 *
 * This hook must be used within a `KeybanProvider` component.
 * @throws {Error} If the hook is used outside of a `KeybanProvider`.
 * @returns The Keyban authentication context.
 *   - `login`: A function to log in the user, see {@link AuthContext}
 *   - `logout`: A function to log out the user, see {@link AuthContext}
 *   - `isAuthenticated`: A boolean indicating whether the user is authenticated, see {@link BaseAuth}
 *   - `user`: An object representing the user, see {@link BaseAuth}
 *   - `isLoading`: A boolean indicating whether the authentication status is still being determined, see {@link BaseAuth}
 */
export function useKeybanAuth() {
  const ctx = React.useContext(KeybanAuthContext);
  if (!ctx)
    throw new Error("useKeybanAuth hook must be used within a KeybanProvider");
  return ctx;
}
