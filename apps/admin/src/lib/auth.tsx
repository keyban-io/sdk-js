import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

export function AppAuthProvider({ children }: React.PropsWithChildren) {
  return (
    <Auth0Provider
      domain="auth.testing.keyban.io"
      clientId="Kwpa9AalNhzVh6xMf4BVfkMvsuZAOZBM"
      useRefreshTokens={true}
      cacheLocation="localstorage"
      scope="openid profile offline_access"
      audience="https://api.keyban.localtest.me"
      redirectUri={new URL("/auth/callback", window.location.origin).toString()}
    >
      {children}
    </Auth0Provider>
  );
}
