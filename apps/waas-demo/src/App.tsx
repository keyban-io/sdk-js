import { useState } from 'react';

import ApplicationHeader from '@/components/ApplicationHeader';
import config from '@/config';
import { AppRouter } from '@/lib/router';
import { useAuth0 } from '@auth0/auth0-react';
import {
  type KeybanChain,
  KeybanProvider,
} from '@keyban/sdk-react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';

export default function App() {
  const { getAccessTokenSilently } = useAuth0();

  const [chain, setChain] = useState<KeybanChain>(config.keybanProvider.chain);

  const handleChainSelect = (chainId: KeybanChain) => setChain(chainId);

  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        openUrl(url: string) {
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
  console.log(config);

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
          <KeybanProvider
            {...config.keybanProvider}
            chain={chain}
            accessTokenProvider={getAccessTokenSilently}
          >
            <AppRouter />
          </KeybanProvider>
        </Stack>
      )}
    </Container>
  );
}
