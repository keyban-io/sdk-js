import { useState } from 'react';

import ApplicationHeader from '@/components/ApplicationHeader';
import { AppRouter } from '@/lib/router';
import { useAuth0 } from '@auth0/auth0-react';
import {
  KeybanChain,
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from '@keyban/sdk-react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
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

  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        openUrl(url) {
          window.location.replace(url);
        },
      });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (isLoading) {
    return (
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: [2] }}>
      {!isAuthenticated ? (
        <Stack
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 200,
              width: 200,
              maxHeight: { xs: 150, md: 200 },
              maxWidth: { xs: 150, md: 200 },
            }}
            alt="KEYBAN logo"
            src="/images/keyban-logo-small.svg"
          />
          <Stack>
            <Typography variant="h4">KEYBAN WAAS Demo</Typography>
          </Stack>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      ) : (
        <Stack spacing={2}>
          <ApplicationHeader
            selectedChainId={chain}
            onSelectChain={handleChainSelect}
          />
          <KeybanProvider {...DEFAULT_CONFIG} chain={chain}>
            <AppRouter />
          </KeybanProvider>
        </Stack>
      )}
    </Container>
  );
}
