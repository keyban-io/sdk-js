import { Refine, Authenticated, type AuthProvider } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router";

import {
  ThemedLayoutV2,
  ThemedTitleV2,
  ErrorComponent,
  useNotificationProvider,
  RefineSnackbarProvider,
  AuthPage,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Google as GoogleIcon } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { lightThemeOptions } from "@keyban/mui-theme"; // Ajustez le chemin si nécessaire
import { createTheme } from "@mui/material/styles";
import { KeybanIcon } from "./components/KeybanIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Dashboard from "./pages/Dashboard.tsx";
import ProductRevenue from "./pages/ProductRevenue.tsx";

export default function App() {
  const { isLoading, user, logout, getIdTokenClaims, loginWithPopup } =
    useAuth0();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }
  const authProvider: AuthProvider = {
    login: async (params) => {
      if (params.providerName === "google") {
        await loginWithPopup({
          authorizationParams: {
            connection: "google-oauth2",
          },
        });
        return { success: true };
      }
      return { success: true };
    },
    logout: async () => {
      await logout({ logoutParams: { returnTo: window.location.origin } });
      return { success: true };
    },
    check: async () => {
      const token = await getIdTokenClaims();
      if (token) {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${token.__raw}`;
        return { authenticated: true };
      }
      return { authenticated: false, redirectTo: "/login" };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      return user ? { ...user, avatar: user.picture } : null;
    },
    onError: async (error) => ({ error }),
  };
  return (
    <BrowserRouter>
      <ThemeProvider theme={createTheme(lightThemeOptions)}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            authProvider={authProvider}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  label: "Dashboard",
                  icon: <DashboardIcon />,
                },
              },
              {
                name: "product-revenue",
                list: "/product-revenue",
                meta: {
                  label: "Product Revenue",
                  // Utilisation d'une icône adaptée pour Product Revenue
                  icon: <MonetizationOnIcon />,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              {/* Routes publiques : accessibles uniquement aux utilisateurs non authentifiés */}
              <Route
                element={
                  <Authenticated key="public-routes" fallback={<Outlet />}>
                    <Navigate to="/" replace />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      hideForm={true}
                      providers={[
                        {
                          name: "google",
                          icon: <GoogleIcon />,
                          label: "Sign in with Google",
                        },
                      ]}
                      registerLink={false}
                      renderContent={(content: React.ReactNode) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h2"
                              color="primary"
                              sx={{
                                mb: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1, // optionnel : ajoute un espace entre l'icône et le texte
                              }}
                            >
                              <KeybanIcon />
                              Keyban Dashboard
                            </Typography>
                            {content}
                          </div>
                        );
                      }}
                    />
                  }
                />
                {/* <Route
                path="/register"
                element={<AuthPage type="register" />}
              />
              <Route
                path="/update-password"
                element={<AuthPage type="updatePassword" />}
              />
              <Route
                path="/forgot-password"
                element={<AuthPage type="forgotPassword" />}
              /> */}
                <Route path="*" element={<ErrorComponent />} />
              </Route>

              {/* Routes protégées : accessibles uniquement aux utilisateurs authentifiés */}
              <Route
                element={
                  <Authenticated
                    key="protected-routes"
                    fallback={<Navigate to="/login" />}
                  >
                    <Outlet />
                  </Authenticated>
                }
              >
                <Route
                  path="/"
                  element={
                    <ThemedLayoutV2
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                          collapsed={collapsed}
                          icon={collapsed ? <KeybanIcon /> : <KeybanIcon />}
                          text="Keyban Dashboard"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  {/* Route par défaut: Dashboard */}
                  <Route index element={<Dashboard />} />
                  {/* Ajout de la route ProductRevenue */}
                  <Route path="product-revenue" element={<ProductRevenue />} />
                  {/* Ajoute ici toutes tes routes protégées */}
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
