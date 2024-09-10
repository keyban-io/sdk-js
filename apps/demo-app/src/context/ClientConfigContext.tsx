import {
  type ReactNode,
  useState,
} from 'react';

import { ClientConfigContext } from '@/hooks/useClientConfig';
import {
  KeybanChain,
  type KeybanClientConfig,
  KeybanLocalStorage,
  KeybanSigner,
} from '@keyban/sdk-react';

const DEFAULT_API_URL = "https://api.keyban.localtest.me";

// Composant Provider pour gérer la configuration KeybanClientConfig
export function ClientConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<KeybanClientConfig>({
    apiUrl: DEFAULT_API_URL,
    chain: KeybanChain.KeybanTestnet,
    signer: KeybanSigner.ECDSA,
    storage: KeybanLocalStorage,
  });

  return (
    <ClientConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ClientConfigContext.Provider>
  );
}
