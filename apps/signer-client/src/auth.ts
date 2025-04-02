import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";
import { AuthConnection, KeybanBaseError, KeybanUser } from "@keyban/sdk-base";
import { IKeybanAuth } from "@keyban/sdk-base/rpc";

import { API_URL, APP_ID, METADATA_PROMISE } from "~/constants";

export class KeybanAuth implements IKeybanAuth {
  #auth0: Promise<Auth0Client>;

  constructor() {
    this.#auth0 = METADATA_PROMISE.then(async ({ auth }) =>
      createAuth0Client({
        ...auth,
        useRefreshTokens: true,
        cacheLocation: "localstorage",
        authorizationParams: {
          scope: "openid",
          audience: API_URL.origin,
          organization: APP_ID,
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
    const user = await this.getUser();
    return user != null;
  }

  async getUser() {
    const auth0 = await this.#auth0;

    const orgValid = await this.#checkOrganization();
    if (!orgValid) return null;

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

    const orgValid = await this.#checkOrganization();
    if (!orgValid) return "";

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

  /**
   * Validate organization, this is mostly a dev env problem:
   * We're using different orgs on the same top level domain (lvh.me) so
   * auth informations can be mixed up. In reality this is unlikely to
   * happen, unless one of our client hack into the system of another of
   * our client and inject its own appId in place of the intended one.
   */
  async #checkOrganization() {
    const auth0 = await this.#auth0;

    const claims = await auth0.getIdTokenClaims();
    return claims?.org_name === APP_ID;
  }
}
