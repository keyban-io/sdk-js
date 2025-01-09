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
 * - `login`: A memoized function to log in the user.
 * - `logout`: A memoized function to log out the user.
 * - `isAuthenticated`: A boolean indicating whether the user is authenticated.
 * - `isLoading`: A boolean indicating whether the authentication status is still being determined.
 */
export function useKeybanAuth() {
  const client = useKeybanClient();

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>();
  React.useEffect(() => {
    client.isAuthenticated().then(setIsAuthenticated);
  }, [client]);

  return {
    login: React.useMemo(() => () => client.login(), [client]),
    logout: React.useMemo(() => () => client.logout(), [client]),
    isAuthenticated,
    isLoading: isAuthenticated == null,
  };
}
