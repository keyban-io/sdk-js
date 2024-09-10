import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

import { ErrorFallback } from '@/components/ErrorFallback';
import {
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

const mapFilepath = (filepath: string) =>
  filepath
    .replace(/^\.\.\/pages(.*?)(?:\/index)?\.tsx$/, "$1")
    .replace(/\[(.*?)\]/g, ":$1") // route params handling
    .replace(/\/_404$/, "/*");

const pages = import.meta.glob("../pages/**/*.tsx") as Record<
  string,
  () => Promise<{ default: React.ComponentType }>
>;

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
    children: Object.entries(pages).map(([filePath, factory]) => ({
      path: mapFilepath(filePath),
      element: React.createElement(React.lazy(factory)),
    })),
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
