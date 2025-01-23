import { useKeybanAuth } from "@keyban/sdk-react";
import {
  Button,
  CircularProgress,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import keybanLogo from "/images/keyban-logo-small.svg";
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

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const {
    isAuthenticated: isKeybanAuthenticated,
    isLoading: isKeybanLoading,
    login: keybanLogin,
  } = useKeybanAuth();

  if (isKeybanLoading) {
    return (
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
    );
  }

  return isKeybanAuthenticated ? (
    <>{element}</>
  ) : (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        padding: "0 20px",
      }}
      spacing={2}
    >
      <Typography variant="h5">Access my wallet secured by Keyban</Typography>
      <Button
        variant="contained"
        onClick={() => keybanLogin()}
        startIcon={
          <Icon>
            <img
              src={keybanLogo}
              alt="Keyban Logo"
              style={{ width: "24px", height: "24px" }}
            />
          </Icon>
        }
      >
        Login with Keyban
      </Button>
    </Stack>
  );
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
