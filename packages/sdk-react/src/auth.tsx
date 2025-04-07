import { AuthConnection, KeybanUser } from "@keyban/sdk-base";
import React from "react";

import { useKeybanClient } from "~/provider";

/**
 * Represents the authentication state of the user.
 *
 * This type can be one of the following states:
 *
 * - **Unintialized**:
 *   - `user`: `undefined`
 *   - `isAuthenticated`: `undefined`
 *
 * - **Unauthenticated**:
 *   - `user`: `null`
 *   - `isAuthenticated`: `false`
 *
 * - **Authenticated**:
 *   - `user`: `KeybanUser`
 *   - `isAuthenticated`: `true`
 */
export type BaseAuth =
  | { user: undefined; isAuthenticated: undefined }
  | { user: null; isAuthenticated: false }
  | { user: KeybanUser; isAuthenticated: true };

/**
 * Represents the authentication context which extends the base authentication.
 * Provides methods for logging in and logging out.
 * @property {boolean} isLoading - Authentication loading state.
 * @property {function(AuthConnection): Promise<void>} login - Logs in using the provided connection.
 * @property {function(): Promise<void>} logout - Logs out the current user.
 */
export type AuthContext = BaseAuth & {
  isLoading: boolean;
  login: (connection?: AuthConnection) => Promise<void>;
  logout: () => Promise<void>;

  passwordLogin(username: string, password: string): Promise<void>;

  passwordlessStart(
    connection: "email" | "sms",
    username: string,
  ): Promise<void>;

  passwordlessLogin(
    connection: "email" | "sms",
    username: string,
    otp: string,
  ): Promise<void>;
};

/**
 * Context for Keyban authentication.
 *
 * This context provides an `AuthContext` or `null` if not available.
 * It is used to manage authentication state and provide authentication-related
 * functionality throughout the application.
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
  const [pendingUpdates, setPendingUpdates] = React.useState(0);

  const wrapUpdate = React.useCallback(
    async (cb?: () => Promise<unknown>) => {
      try {
        setPendingUpdates((count) => count + 1);
        await cb?.();
        await client.getUser().then(setUser);
      } finally {
        setPendingUpdates((count) => count - 1);
      }
    },
    [client],
  );

  React.useEffect(() => {
    wrapUpdate();
  }, [wrapUpdate]);

  const login = React.useCallback(
    (connection?: AuthConnection) => wrapUpdate(() => client.login(connection)),
    [client, wrapUpdate],
  );

  const logout = React.useCallback(
    () => wrapUpdate(() => client.logout()),
    [client, wrapUpdate],
  );

  const passwordLogin = React.useCallback(
    (username: string, password: string) =>
      wrapUpdate(() => client.passwordLogin(username, password)),
    [client, wrapUpdate],
  );

  const passwordlessStart = React.useCallback(
    (connection: "email" | "sms", username: string) =>
      client.passwordlessStart(connection, username),
    [client],
  );

  const passwordlessLogin = React.useCallback(
    (connection: "email" | "sms", username: string, otp: string) =>
      wrapUpdate(() => client.passwordlessLogin(connection, username, otp)),
    [client, wrapUpdate],
  );

  const auth = React.useMemo(
    () => ({
      login,
      logout,
      passwordLogin,
      passwordlessStart,
      passwordlessLogin,
      user,
      isAuthenticated: user === undefined ? undefined : user !== null,
      isLoading: user === undefined || Boolean(pendingUpdates),
    }),
    [
      pendingUpdates,
      login,
      logout,
      passwordLogin,
      passwordlessStart,
      passwordlessLogin,
      user,
    ],
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
