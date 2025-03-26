import * as jose from "jose";
import { setupServer, SetupServerApi } from "msw/node";
import {
  afterEach as afterEachBase,
  beforeEach as beforeEachBase,
  test as testBase,
} from "vitest";

import { APP_ID } from "~/constants";

type Fixtures = {
  server: SetupServerApi;

  jwtSubject: string;
  accessToken: string;
  storageKey: string;
};

export const test = testBase.extend<Fixtures>({
  server: [
    async ({}, use) => {
      const server = setupServer();

      server.listen({ onUnhandledRequest: "error" });

      await use(server);

      server.close();
    },
    { auto: true },
  ],

  jwtSubject: ({}, use) => use(crypto.randomUUID()),

  accessToken: async ({ jwtSubject }, use) => {
    const token = await new jose.SignJWT()
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(jwtSubject)
      .setAudience("audience")
      .sign(new TextEncoder().encode("secret"));

    return use(token);
  },

  storageKey: ({ jwtSubject }, use) =>
    use(`keyban:signer:${APP_ID}:${jwtSubject}:key`),
});

export const beforeEach: typeof beforeEachBase<Fixtures> = beforeEachBase;
export const afterEach: typeof afterEachBase<Fixtures> = afterEachBase;
