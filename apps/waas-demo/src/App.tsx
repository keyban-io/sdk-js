// src/App.tsx
import { darkThemeOptions, lightThemeOptions } from "@keyban/mui-theme"; // Ajustez le chemin si nécessaire
import { KeybanNetwork, SignIn, useKeybanAuth } from "@keyban/sdk-react";
import {
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Stack,
  SvgIcon,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useMemo } from "react";

import ApplicationHeader from "~/components/ApplicationHeader";
import config from "~/config";
import { useLocalStorage } from "~/lib/localStorage";
import { AppRouter } from "~/lib/router";

/**
 * KeybanIcon component renders the Keyban logo using SVG.
 * @returns A JSX element containing the Keyban logo.
 */
export function KeybanIcon() {
  return (
    <SvgIcon viewBox="0 0 960 236" sx={{ width: 100, height: 25 }}>
      <rect fill="#a2d5f2" width="236" height="236" rx="10" ry="10" />
      <g
        transform="matrix(0.1, 0, 0, -0.1, 2.292, 220.5)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M320 1025 l0 -775 330 0 330 0 -92 85 -93 85 -152 0 -153 0 0 605 0 605 85 0 85 0 2 -311 3 -311 320 311 320 310 123 0 c67 1 122 -2 122 -6 0 -5 -198 -194 -440 -422 -242 -228 -439 -418 -438 -423 2 -4 131 -125 287 -268 l284 -260 380 0 c210 0 377 4 371 8 -15 14 -626 573 -664 608 l-35 33 -63 -57 -63 -57 195 -179 c108 -98 196 -180 196 -182 0 -2 -57 -4 -127 -4 l-128 1 -190 174 c-104 96 -190 181 -190 188 0 9 843 812 1059 1008 6 5 -154 9 -365 9 l-376 0 -204 -191 -204 -190 -3 190 -2 191 -255 0 -255 0 0 -775z"
          fill="#07689f"
        />
      </g>
      <path
        d="M 292.09 176.55 L 292.09 59.93 L 320.65 59.93 L 320.65 112.46 L 361.45 59.93 L 392.05 59.93 L 354.14 107.7 L 393.58 176.55 L 361.62 176.55 L 335.44 129.8 L 320.65 147.31 L 320.65 176.55 Z M 405.64 176.55 L 405.64 59.93 L 488.94 59.93 L 486.05 81.69 L 433.69 81.69 L 433.69 106.51 L 482.65 106.51 L 482.65 127.76 L 433.69 127.76 L 433.69 154.79 L 486.39 154.79 L 489.45 176.55 Z M 534.17 176.55 L 534.17 131.84 L 494.73 59.93 L 526.69 59.93 L 549.3 104.81 L 549.98 104.81 L 572.93 59.93 L 602 59.93 L 562.73 131.84 L 562.73 176.55 Z M 613.64 176.55 L 613.64 59.93 L 672.29 59.93 Q 681.13 59.93 688.19 63.16 Q 695.24 66.39 699.32 72.51 Q 703.4 78.63 703.4 87.3 Q 703.4 95.63 700.51 101.32 Q 697.62 107.02 693.12 110.42 Q 688.61 113.82 683.51 115.69 L 683.51 116.37 Q 687.25 117.22 691.16 119.09 Q 695.07 120.96 698.47 124.1 Q 701.87 127.25 704 131.84 Q 706.12 136.43 706.12 142.89 Q 706.12 152.75 701.45 160.4 Q 696.77 168.05 689.12 172.3 Q 681.47 176.55 671.95 176.55 Z M 640.33 155.47 L 664.64 155.47 Q 668.72 155.47 671.87 153.51 Q 675.01 151.56 676.71 148.16 Q 678.41 144.76 678.41 140.51 Q 678.41 136.09 676.54 133.28 Q 674.67 130.48 671.61 128.95 Q 668.55 127.42 664.81 127.42 L 640.33 127.42 Z M 640.33 106.85 L 663.62 106.85 Q 667.87 106.85 670.68 104.89 Q 673.48 102.94 674.84 99.71 Q 676.2 96.48 676.2 92.74 Q 676.2 86.28 673.06 83.3 Q 669.91 80.33 664.47 80.33 L 640.33 80.33 Z M 710.63 176.55 L 752.11 59.93 L 786.62 59.93 L 828.1 176.55 L 798.52 176.55 L 790.19 153.6 L 746.33 153.6 L 738.17 176.55 Z M 753.13 133.37 L 783.22 133.37 L 768.77 89.34 L 767.92 89.34 Z M 840 176.55 L 840 59.93 L 863.8 59.93 L 901.54 115.69 L 907.32 126.06 L 908.17 125.72 L 908.17 59.93 L 934.18 59.93 L 934.18 176.55 L 909.7 176.55 L 870.77 118.92 L 866.69 111.27 L 866.01 111.61 L 866.01 176.55 Z"
        style={{ fill: "rgb(0, 19, 68)" }}
      />
    </SvgIcon>
  );
}

export default function App() {
  const [network, setNetwork] = useLocalStorage<KeybanNetwork>(
    "selectedNetwork",
    config.keyban.network,
  );

  const { isAuthenticated, isLoading } = useKeybanAuth();

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

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ py: [2] }}>
          <ApplicationHeader
            selectedNetworkId={network}
            onSelectNetwork={setNetwork}
            onToggleTheme={toggleTheme}
            themeMode={themeMode}
          />
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
            <Typography variant="h6">Authenticating...</Typography>
          </Stack>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: [2] }}>
        {!isAuthenticated ? (
          <>
            <ApplicationHeader
              onToggleTheme={toggleTheme}
              themeMode={themeMode}
            />
            <SignIn
              enableFacebookAuth={false}
              sitemarkIcon={KeybanIcon}
              enableGoogleAuth
              enablePasswordlessEmailAuth
              enableUsernamePasswordAuth
              language="en"
            />
          </>
        ) : (
          <>
            <ApplicationHeader
              selectedNetworkId={network}
              onSelectNetwork={setNetwork}
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
