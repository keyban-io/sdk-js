import { Authenticated, useLogin } from "@refinedev/core";
import React from "react";
import {
  createBrowserRouter,
  isRouteErrorResponse,
  Outlet,
  RouteObject,
  RouterProvider,
  useRouteError,
} from "react-router";

const mapFilepath = (filepath: string) =>
  filepath
    .replace(/^\.\.\/pages(.*?)(?:\/index)?\.tsx$/, "$1")
    .replace(/\[(.*?)\]/g, ":$1")
    .replace(/\/_404$/, "/*");

export type LayoutProps = React.PropsWithChildren;

const layouts = Object.fromEntries(
  Object.entries(
    import.meta.glob("../pages/**/_layout.tsx", { eager: true }) as Record<
      string,
      {
        default: React.ComponentType<LayoutProps> & {
          Loader: React.ComponentType;
        };
      }
    >,
  ).map(([filepath, { default: Component }]) => [
    mapFilepath(filepath).replace(/\/_layout$/, ""),
    Component,
  ]),
);

const getLayout = (path: string) =>
  Object.entries(layouts)
    .filter(
      ([layoutPath]) =>
        layoutPath ===
        path.split("/").slice(0, layoutPath.split("/").length).join("/"),
    )
    .sort(([a], [b]) => b.length - a.length)[0][1];

const pages = import.meta.glob([
  "../pages/**/*.tsx",
  "!../pages/**/_layout.tsx",
  "!../pages/**/_ressource.ts",
]) as Record<string, () => Promise<{ default: React.ComponentType }>>;

const routes = Object.entries(pages)
  .map(([filePath, factory]): RouteObject => {
    const path = mapFilepath(filePath);
    const Layout = getLayout(path);
    const Page = React.lazy(factory);

    return {
      path,
      errorElement: (
        <Layout>
          <ErrorPage />
        </Layout>
      ),
      element: (
        <Layout>
          <React.Suspense fallback={<Layout.Loader />}>
            <Page />
          </React.Suspense>
        </Layout>
      ),
    };
  })
  .map((route) => ({
    ...route,
    element: (
      <Authenticated key="auth-guard" fallback={<Login />}>
        {route.element}
      </Authenticated>
    ),
  }));

const createRouter = (rootElement: React.ReactNode) =>
  createBrowserRouter([
    {
      element: rootElement,
      children: routes,
    },
  ]);

// Fix fast-refresh
const uuid = crypto.randomUUID();
export function AppRouter({ children = <Outlet /> }: React.PropsWithChildren) {
  const router = React.useMemo(() => createRouter(children), [children]);
  return <RouterProvider key={uuid} router={router} />;
}

function ErrorPage({ children }: React.PropsWithChildren) {
  const routeError = useRouteError();

  let error = new Error("Unknown error");

  if (routeError instanceof Error) error = routeError;
  if (isRouteErrorResponse(routeError))
    error = new Error(routeError.statusText);

  return <div>{children ?? error.message}</div>;
}

function Login() {
  const { mutate: login } = useLogin<void>();
  React.useEffect(() => login(), [login]);

  return null;
}
