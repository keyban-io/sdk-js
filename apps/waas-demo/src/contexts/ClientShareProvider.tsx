import { useAuth0 } from "@auth0/auth0-react";
import { KeybanChain, KeybanProvider } from "@keyban/sdk-react";
import React from "react";

import config from "~/config";

let chain: KeybanChain;

try {
  const stored = localStorage.getItem("selectedChain");
  if (stored) {
    chain = JSON.parse(stored) as KeybanChain;
  } else {
    chain = config.keyban.chain;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (e) {
  chain = config.keyban.chain;
}

function ClientShareProvider({ children }: React.PropsWithChildren) {
  const { user, isAuthenticated } = useAuth0();

  const clientShareProvider = React.useMemo(
    () => ({
      async get(): Promise<string | null> {
        if (!user || !user.sub) {
          return null;
        }
        const userId = user.sub;
        const key = `clientShare_${userId}`;
        const clientShare = localStorage.getItem(key);
        return clientShare ?? null;
      },
      async set(clientShare: string): Promise<void> {
        if (!isAuthenticated || !user || !user.sub) {
          throw new Error("Unidentified user, unable to store client share.");
        }
        const userId = user.sub;
        const key = `clientShare_${userId}`;
        localStorage.setItem(key, clientShare);
      },
    }),
    [user, isAuthenticated],
  );

  return (
    <KeybanProvider
      {...config.keyban}
      chain={chain}
      clientShareProvider={clientShareProvider}
      children={children}
    />
  );
}

export default ClientShareProvider;
