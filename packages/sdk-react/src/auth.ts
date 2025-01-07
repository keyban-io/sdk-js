import React from "react";

import { useKeybanClient } from "~/provider";

/**
 * Keyban authentication methods.
 * @returns An object with authentication properties.
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
