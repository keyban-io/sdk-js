import React from 'react';

import type { KeybanChain } from '@keyban/sdk-react';

const ChainContext = React.createContext<
  [KeybanChain, React.Dispatch<React.SetStateAction<KeybanChain>>] | null
>(null);

export function useChain() {
  const ctx = React.useContext(ChainContext);
  if (!ctx) throw new Error("useChain must be used within a ChainProvider");
  return ctx;
}

export { ChainContext };
