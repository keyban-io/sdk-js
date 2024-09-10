import React from "react";

import { AppRouter } from "@/lib/router";
import {
  KeybanChain,
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from "@keyban/sdk-react";

const ChainContext = React.createContext<
  [KeybanChain, React.Dispatch<React.SetStateAction<KeybanChain>>] | null
>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useChain() {
  const ctx = React.useContext(ChainContext);
  if (!ctx) throw new Error("useChain must be used within a ChainProvider");
  return ctx;
}

export default function App() {
  const chainState = React.useState(KeybanChain.KeybanTestnet);

  return (
    <KeybanProvider
      chain={chainState[0]}
      signer={KeybanSigner.ECDSA}
      storage={KeybanLocalStorage}
      apiUrl="https://api.keyban.localtest.me"
    >
      <ChainContext.Provider value={chainState}>
        <AppRouter />
      </ChainContext.Provider>
    </KeybanProvider>
  );
}
