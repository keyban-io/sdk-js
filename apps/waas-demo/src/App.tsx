// src/App.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { darkThemeOptions, lightThemeOptions } from "@keyban/mui-theme"; // Ajustez le chemin si nécessaire
import { KeybanChain } from "@keyban/sdk-react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";

import ApplicationHeader from "~/components/ApplicationHeader";
import config from "~/config";
import { useLocalStorage } from "~/lib/localStorage";
import { AppRouter } from "~/lib/router";

export default function App() {
  const [chain, setChain] = useLocalStorage<KeybanChain>(
    "selectedChain",
    config.keyban.chain,
  );

  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  // État pour le thème, par défaut 'light'
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useLocalStorage<"light" | "dark">(
    "themeMode",
    prefersDarkMode ? "dark" : "light",
  );

  // Définir le thème basé sur le mode actuel
  const theme = useMemo(() => {
    return themeMode === "light"
      ? createTheme(lightThemeOptions)
      : createTheme(darkThemeOptions);
  }, [themeMode]);

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

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
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: [2] }}>
        {!isAuthenticated ? (
          <>
            <ApplicationHeader
              onToggleTheme={toggleTheme}
              themeMode={themeMode}
            />
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
          </>
        ) : (
          <>
            <ApplicationHeader
              selectedChainId={chain}
              onSelectChain={setChain}
              onToggleTheme={toggleTheme} // Passer la fonction de bascule
              themeMode={themeMode} // Passer le mode actuel
            />
            <Stack spacing={2}>
              <AppRouter />
            </Stack>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
