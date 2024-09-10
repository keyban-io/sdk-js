import ApplicationHeader from '@/components/ApplicationHeader';
import { AppRouter } from '@/lib/router';
import {
  type KeybanChain,
  KeybanProvider,
} from '@keyban/sdk-react';
import {
  Container,
  Stack,
} from '@mui/material';

import { ClientConfigProvider } from './context/ClientConfigContext';
import { useClientConfig } from './hooks/useClientConfig';

function MainApp() {
  const { config, setConfig } = useClientConfig();

  const handleChainSelect = (chainId: KeybanChain) => {
    setConfig((prevConfig) => ({ ...prevConfig, chain: chainId }));
  };

  return (
    <Container maxWidth="md" sx={{ py: [2, 5] }}>
      <Stack spacing={2}>
        <ApplicationHeader
          selectedChainId={config.chain}
          onSelectChain={handleChainSelect}
        />
        <KeybanProvider {...config}>
          <AppRouter />
        </KeybanProvider>
      </Stack>
    </Container>
  );
}

export default function App() {
  return (
    <ClientConfigProvider>
      <MainApp />
    </ClientConfigProvider>
  );
}
