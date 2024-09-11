import { useState } from 'react';

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

const DEFAULT_CONFIG = {
  apiUrl: "https://api.keyban.localtest.me",
  chain: KeybanChain.KeybanTestnet,
  signer: KeybanSigner.ECDSA,
  storage: KeybanLocalStorage,
};

export default function App() {
  const [chain, setChain] = useState<KeybanChain>(DEFAULT_CONFIG.chain);

  const handleChainSelect = (chainId: KeybanChain) => setChain(chainId);

  return (
    <Container maxWidth="md" sx={{ py: [2, 5] }}>
      <Stack spacing={2}>
        <ApplicationHeader
          selectedChainId={chain}
          onSelectChain={handleChainSelect}
        />
        <KeybanProvider {...DEFAULT_CONFIG} chain={chain}>
          <AppRouter />
        </KeybanProvider>
      </Stack>
    </Container>
  );
}
