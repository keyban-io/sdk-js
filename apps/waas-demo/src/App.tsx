import { useAuth0 } from "@auth0/auth0-react";
import { type KeybanChain, KeybanProvider } from "@keyban/sdk-react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import ApplicationHeader from "~/components/ApplicationHeader";
import config from "~/config";
import { useLocalStorage } from "~/lib/localStorage";
import { AppRouter } from "~/lib/router";

export default function App() {
  const { getAccessTokenSilently } = useAuth0();

  const [chain, setChain] = useLocalStorage<KeybanChain>(
    "selectedChain",
    config.keyban.chain,
  );

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

  return (
    <Container maxWidth="md" sx={{ py: [2], backgroundColor: "white" }}>
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
          <ApplicationHeader selectedChainId={chain} onSelectChain={setChain} />
          <KeybanProvider
            {...config.keyban}
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
