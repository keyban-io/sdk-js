import React from "react";

import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Alert,
  AlertTitle,
  IconButton,
  CircularProgress,
  Container,
  styled,
  CardContent,
  Card,
  Stack,
} from "@mui/material";

const mapFilepath = (filepath: string) =>
  filepath
    .replace(/^\.\.\/pages(.*?)(?:\/index)?\.tsx$/, "$1")
    .replace(/\[(.*?)\]/g, ":$1") // route params handling
    .replace(/\/_404$/, "/*");

const pages = Object.entries(
  import.meta.glob("../pages/**/*.tsx") as Record<
    string,
    () => Promise<{ default: React.ComponentType }>
  >,
);

const Layout = ({ children }: React.PropsWithChildren) => (
  <Container fixed maxWidth="md" sx={{ py: [2, 3] }}>
    <Card>
      <CardContent component={Stack} alignItems="center" gap={4}>
        {children}
      </CardContent>
    </Card>
  </Container>
);

const Loader = styled(CircularProgress)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translte(-50%, -50%);
`;

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <Layout>
    <Alert
      severity="error"
      action={
        <IconButton
          color="inherit"
          onClick={resetErrorBoundary}
          size="small"
          title="Try again"
        >
          <RefreshIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>Something went wrong</AlertTitle>
      <p>{error.message}</p>
      <pre>{error.stack}</pre>
    </Alert>
  </Layout>
);

const router = createBrowserRouter([
  {
    element: React.createElement(() => (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <React.Suspense fallback={<Loader />}>
          <Layout>
            <Outlet />
          </Layout>
        </React.Suspense>
      </ErrorBoundary>
    )),
    children: pages.map(([filePath, factory]) => ({
      path: mapFilepath(filePath),
      element: React.createElement(React.lazy(factory)),
    })),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
