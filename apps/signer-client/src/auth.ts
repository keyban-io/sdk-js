import { Auth0Client } from "@auth0/auth0-spa-js";
import { KeybanBaseError } from "@keyban/sdk-base";
import { IKeybanAuth } from "@keyban/sdk-base/rpc";

import { apiUrl } from "~/utils/api";
import { APP_ID } from "~/utils/appId";

export class KeybanAuth implements IKeybanAuth {
  #auth0: Promise<Auth0Client>;

  constructor() {
    const audienceUrl = apiUrl();
    audienceUrl.searchParams.set("appId", APP_ID);

    this.#auth0 = fetch(apiUrl("/metadata"))
      .then((res) => res.json())
      .then(({ auth }) => {
        return new Auth0Client({
          ...auth,
          useRefreshTokens: true,
          cacheLocation: "localstorage",
          authorizationParams: {
            scope: "openid",
            audience: audienceUrl.toString(),
            redirect_uri: apiUrl("/signer-client/login").toString(),
          },
        });
      });

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

  async getLoginUrl() {
    const auth0 = await this.#auth0;

    return new Promise<string>((resolve) => {
      auth0.loginWithRedirect({
        openUrl: resolve,
      });
    });
  }

  async getLogoutUrl(redirect: string) {
    const auth0 = await this.#auth0;

    const redirectUrl = apiUrl("/signer-client/logout");
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
