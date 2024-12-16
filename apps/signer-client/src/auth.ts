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
    const audience = audienceUrl.toString();

    this.#auth0 = fetch(apiUrl("/metadata"))
      .then((res) => res.json())
      .then(({ auth }) => {
        return new Auth0Client({
          ...auth,
          authorizationParams: {
            scope: "openid",
            audience,
            redirect_uri: apiUrl("/signer-client/login").toString(),
          },
        });
      });
  }

  async isAuthenticated() {
    const auth0 = await this.#auth0;
    return auth0.isAuthenticated();
  }

  async getLoginUrl(redirect: string) {
    const auth0 = await this.#auth0;

    const audience = apiUrl();
    audience.searchParams.set("appId", APP_ID);

    return new Promise<string>((resolve) => {
      auth0.loginWithRedirect({
        appState: { redirect },
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
      throw new KeybanBaseError({
        type: err.error,
        instance: "KeybanAuth.getToken",
        rootError: err,
        title: err.error_description,
      });
    });
  }

  async handleRedirectCallback() {
    const auth0 = await this.#auth0;

    auth0.handleRedirectCallback().then(({ appState }) => {
      window.location.href = appState.redirect;
    });
  }
}
