import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";
import { AuthConnection, KeybanBaseError, KeybanUser } from "@keyban/sdk-base";
import { IKeybanAuth } from "@keyban/sdk-base/rpc";

import { API_URL } from "~/utils/api";
import { APP_ID } from "~/utils/appId";

export class KeybanAuth implements IKeybanAuth {
  #auth0: Promise<Auth0Client>;

  constructor() {
    const audienceUrl = new URL(API_URL);
    audienceUrl.searchParams.set("appId", APP_ID);

    this.#auth0 = fetch(new URL("/v1/metadata", API_URL))
      .then((res) => res.json())
      .then(async ({ auth }) =>
        createAuth0Client({
          ...auth,
          useRefreshTokens: true,
          cacheLocation: "localstorage",
          authorizationParams: {
            scope: "openid",
            audience: audienceUrl.toString(),
            redirect_uri: new URL("/signer-client/login", API_URL).toString(),
          },
        }),
      );

    window.addEventListener(
      "message",
      async (event: MessageEvent<{ __KEYBAN_AUTH: true; url: string }>) => {
        if (event.origin !== window.location.origin) return;
        if (!event.data.__KEYBAN_AUTH) return;

        const auth0 = await this.#auth0;
        await auth0.handleRedirectCallback(event.data.url);

        window.parent.postMessage("keyban:auth:isAuthenticated", "*");
      },
    );
  }

  async isAuthenticated() {
    const auth0 = await this.#auth0;
    return auth0.isAuthenticated();
  }

  async getUser() {
    const auth0 = await this.#auth0;

    // We're using the same Auth0 app for multiple audiences, don't
    // assume user is connected just because we have an id_token
    // (which might come from another Keyban app). Check we also have
    // a valid access_token
    const token = await this.getToken().catch(() => null);
    if (!token) return null;

    const user = await auth0.getUser<KeybanUser>();
    return user ?? null;
  }

  async getLoginUrl(connection?: AuthConnection) {
    const auth0 = await this.#auth0;

    return new Promise<string>((resolve) => {
      auth0.loginWithRedirect({
        openUrl: resolve,
        authorizationParams: { connection },
      });
    });
  }

  async getLogoutUrl(redirect: string) {
    const auth0 = await this.#auth0;

    const redirectUrl = new URL("/signer-client/logout", API_URL);
    redirectUrl.searchParams.set("redirect", redirect);

    return new Promise<string>((resolve) => {
      auth0.logout({
        logoutParams: { returnTo: redirectUrl.toString() },
        openUrl: resolve,
      });
    });
  }

  async getToken() {
    const auth0 = await this.#auth0;

    return auth0.getTokenSilently().catch((err) => {
      if (err.error === "missing_refresh_token") return "";

      throw new KeybanBaseError({
        type: err.error,
        instance: "KeybanAuth.getToken",
        rootError: err,
        title: err.error_description,
      });
    });
  }
}
