import type React from 'react';
import {
  createContext,
  useContext,
} from 'react';

import type { KeybanClientConfig } from '@keyban/sdk-react';

// Définir le type de la configuration basé sur KeybanClientConfig
type ClientConfigContextType = {
  config: KeybanClientConfig;
  setConfig: React.Dispatch<React.SetStateAction<KeybanClientConfig>>;
};

// Créer le contexte avec une valeur par défaut
const ClientConfigContext = createContext<ClientConfigContextType | undefined>(
  undefined,
);

// Hook pour accéder au contexte
export function useClientConfig() {
  const context = useContext(ClientConfigContext);
  if (!context) {
    throw new Error(
      "useClientConfig must be used within a ClientConfigProvider",
    );
  }
  return context;
}

export { ClientConfigContext };
