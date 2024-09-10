import React from 'react';

import ApplicationHeader from '@/components/ApplicationHeader';
import { AppRouter } from '@/lib/router';
import {
  KeybanChain,
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from '@keyban/sdk-react';
import {
  Container,
  Stack,
} from '@mui/material';

import { ChainContext } from './hooks/useChain';

export default function App() {
  const chainState = React.useState(KeybanChain.KeybanTestnet);

  const handleChainSelect = (chainId: KeybanChain) => {
    chainState[1](chainId);
  };

  return (
    <Container maxWidth="md" sx={{ py: [2, 5] }}>
      <Stack spacing={2}>
        <ApplicationHeader
          selectedChainId={chainState[0]}
          onSelectChain={handleChainSelect}
        />
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
