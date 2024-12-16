import { EncryptedData, generateKey } from "@keyban/sdk-base/crypto";
import * as jose from "jose";
import { http, HttpResponse } from "msw";
import { setupServer, SetupServerApi } from "msw/node";
import {
  afterEach as afterEachBase,
  beforeEach as beforeEachBase,
  test as testBase,
} from "vitest";

import { apiUrl } from "~/utils/api";
import { APP_ID } from "~/utils/appId";

type Fixtures = {
  clientShares: Map<string, EncryptedData>;
  server: SetupServerApi;

  clientShareKey: JsonWebKey;
  jwtSubject: string;
  accessToken: string;
  storageKey: string;
};

export const test = testBase.extend<Fixtures>({
  clientShares: ({}, use) => use(new Map()),

  server: [
    async ({ clientShares }, use) => {
      const getClientShareKey = (request: Request) => {
        const jwt =
          request.headers.get("Authorization")?.split(" ").pop() ?? "";
        return jose.decodeJwt(jwt).sub!;
      };

      const server = setupServer(
        http.post<never, EncryptedData>(
          apiUrl("/client-share").toString(),
          async ({ request }) => {
            clientShares.set(getClientShareKey(request), await request.json());

            return HttpResponse.json({});
          },
        ),
        http.get(apiUrl("/client-share").toString(), async ({ request }) => {
          const clientShare = clientShares.get(getClientShareKey(request));

          if (!clientShare) return HttpResponse.json({}, { status: 404 });

          return HttpResponse.json(clientShare);
        }),
      );

      server.listen({ onUnhandledRequest: "error" });

      await use(server);

      server.close();
    },
    { auto: true },
  ],

  clientShareKey: async ({}, use) => use(await generateKey()),

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
