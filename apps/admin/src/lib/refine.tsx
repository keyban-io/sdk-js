import { useAuth0 } from "@auth0/auth0-react";
import {
  AuthProvider,
  Refine,
  ResourceProps,
  ResourceRouteComposition,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import React from "react";
import { IntlShape, useIntl } from "react-intl";

const getRessources = (intl: IntlShape) =>
  Object.entries(
    import.meta.glob("../pages/**/_ressource.ts", {
      eager: true,
    }) as Record<string, { default: (intl: IntlShape) => ResourceProps }>,
  ).map(([filepath, { default: resourceFactory }]) => {
    const basePath = filepath.replace(
      /^\.\.\/pages(.*?)\/_ressource\.ts$/,
      "$1",
    );

    const prefixPath = (route?: ResourceRouteComposition) => {
      if (route == null) return route;
      if (typeof route === "string") return basePath + route;

      throw new Error("[TODO] Unsupported ResourceRouteComposition type");
    };

    const resource = resourceFactory(intl);

    return {
      ...resource,
      list: prefixPath(resource.list),
      create: prefixPath(resource.create),
      clone: prefixPath(resource.clone),
      edit: prefixPath(resource.edit),
      show: prefixPath(resource.show),
    };
  });

export function RefineProvider({ children }: React.PropsWithChildren) {
  const intl = useIntl();
  const ressources = React.useMemo(() => getRessources(intl), [intl]);

  const {
    isLoading,
    user,
    loginWithRedirect,
    logout,
    getIdTokenClaims,
    getAccessTokenSilently,
  } = useAuth0();

  const axiosInstance = React.useMemo(() => {
    const instance = axios.create();

    instance.interceptors.request.use(
      async (config) => {
        const accessToken = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error) => Promise.reject(error),
    );

    return instance;
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <span>loading...</span>;
  }

  const authProvider: AuthProvider = {
    login: async () => {
      await loginWithRedirect();

      return { success: true };
    },
    logout: async () => {
      const returnToUrl = new URL("/auth/logout", window.location.origin);
      logout({ returnTo: returnToUrl.toString() });

      // Do not return right now or auth0 redirect will be cancelled
      await new Promise(() => {});

      return { success: true };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const idToken = await getIdTokenClaims();
        return idToken
          ? { authenticated: true }
          : {
              authenticated: false,
              error: {
                message: "Check failed",
                name: "Token not found",
              },
              redirectTo: "/auth/login",
              logout: true,
            };
      } catch (error: unknown) {
        return {
          authenticated: false,
          error: new Error(error as string),
          redirectTo: "/auth/login",
          logout: true,
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (!user) return null;
      return { ...user, avatar: user.picture };
    },
  };

  return (
    <RefineKbarProvider>
      <RefineSnackbarProvider>
        <DevtoolsProvider>
          <Refine
            authProvider={authProvider}
            dataProvider={dataProvider(
              "https://api.keyban.localtest.me/v1",
              axiosInstance,
            )}
            notificationProvider={useNotificationProvider}
            routerProvider={routerBindings}
            resources={ressources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
            }}
          >
            {children}

            <RefineKbar />
            <DocumentTitleHandler />
            <UnsavedChangesNotifier />
          </Refine>

          {
            // eslint-disable-next-line no-constant-binary-expression
            false && <DevtoolsPanel />
          }
        </DevtoolsProvider>
      </RefineSnackbarProvider>
    </RefineKbarProvider>
  );
}
