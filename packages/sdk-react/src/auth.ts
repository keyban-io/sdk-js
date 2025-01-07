import React from "react";

import { useKeybanClient } from "~/provider";

/**
 * Hook that provides authentication functionality using the Keyban client.
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
