import { useAuth0 } from "@auth0/auth0-react";
import { useKeybanAuth } from "@keyban/sdk-react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { ErrorFallback } from "~/components/ErrorFallback";

// Fonction pour mapper les chemins de fichiers à des chemins de route
const mapFilepath = (filepath: string) =>
  filepath
    .replace(/^\.\.\/pages(.*?)(?:\/index)?\.tsx$/, "$1")
    .replace(/\[(.*?)\]/g, ":$1") // gestion des paramètres de route
    .replace(/\/_404$/, "/*");

const pages = import.meta.glob("../pages/**/*.tsx") as Record<
  string,
  () => Promise<{ default: React.ComponentType }>
>;

const ProtectedRoute = async ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const {
    isAuthenticated: isKeybanAuthenticated,
    isLoading: isKeybanLoading,
    login: keybanLogin,
  } = useKeybanAuth();

  console.log("isAuthenticated (auth0)", isAuthenticated);
  console.log("isKeybanAuthenticated (keyban)", isKeybanAuthenticated);

  if (isLoading || isKeybanLoading) {
    return (
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Checking authentication...</Typography>
      </Stack>
    );
  }

  // Si l'utilisateur n'est pas authentifié, on redirige vers la page de connexion via Auth0
  if (!isAuthenticated) {
    console.log("Auth0 not authenticated, redirecting to login...");
    loginWithRedirect();
    return null; // on retourne null pendant que la redirection est en cours
  }

  if (!isKeybanAuthenticated) {
    console.log("Keyban not authenticated, logging in...");
    await keybanLogin();
    return null;
  }

  return <>{element}</>;
};

const router = createBrowserRouter([
  {
    element: React.createElement(() => (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense
          fallback={
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
          }
        >
          <Outlet />
        </React.Suspense>
      </ErrorBoundary>
    )),
    children: Object.entries(pages).map(([filePath, factory]) => {
      const path = mapFilepath(filePath);

      // Protège toutes les routes sauf "/"
      const isRoot = path === "/";

      return {
        path,
        element: isRoot
          ? React.createElement(React.lazy(factory))
          : React.createElement(ProtectedRoute, {
              element: React.createElement(React.lazy(factory)),
            }),
      };
    }),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
