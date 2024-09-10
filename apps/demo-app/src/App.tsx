import React from 'react';

import { AppRouter } from '@/lib/router';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  KeybanChain,
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from '@keyban/sdk-react';
import {
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import NetworkSelector from './components/NetworkSelector';

const ChainContext = React.createContext<
  [KeybanChain, React.Dispatch<React.SetStateAction<KeybanChain>>] | null
>(null);

export function useChain() {
  const ctx = React.useContext(ChainContext);
  if (!ctx) throw new Error("useChain must be used within a ChainProvider");
  return ctx;
}

export default function App() {
  const chainState = React.useState(KeybanChain.KeybanTestnet);

  const handleChainSelect = (chainId: KeybanChain) => {
    chainState[1](chainId); // Mise à jour de la chaîne sélectionnée
  };

  return (
    <Container maxWidth="md" sx={{ py: [2, 5] }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography variant="h4">Keyban WAAS Demo</Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <NetworkSelector
              selectedChainId={chainState[0]}
              onSelectChain={handleChainSelect}
            />
            <IconButton color="primary">
              <FontAwesomeIcon icon={faBell} />
            </IconButton>
          </Stack>
        </Stack>
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
      </Stack>
    </Container>
  );
}
