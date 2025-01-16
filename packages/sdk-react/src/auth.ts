import React from "react";

import { useKeybanClient } from "~/provider";

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
  const client = useKeybanClient();

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>();
  const updateIsAuthenticated = React.useCallback(
    () => client.isAuthenticated().then(setIsAuthenticated),
    [client],
  );

  React.useEffect(() => {
    updateIsAuthenticated();
  }, [updateIsAuthenticated]);

  return {
    login: React.useCallback(
      () => client.login().then(updateIsAuthenticated),
      [client, updateIsAuthenticated],
    ),
    logout: React.useCallback(
      () => client.logout().then(updateIsAuthenticated),
      [client, updateIsAuthenticated],
    ),
    isAuthenticated,
    isLoading: isAuthenticated == null,
  };
}
