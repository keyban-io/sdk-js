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

type Fixtures = {
  clientShares: Map<string, EncryptedData>;
  server: SetupServerApi;

  appId: string;
  clientShareKey: JsonWebKey;
  jwtSubject: string;
  accessToken: string;
  storageKey: string;
};

export const test = testBase.extend<Fixtures>({
  clientShares: ({}, use) => use(new Map()),

  server: [
    async ({ clientShares }, use) => {
      const getClientShareKey = (params: { appId: string }, headers: Headers) =>
        [
          params.appId,
          jose.decodeJwt(headers.get("Authorization")?.split(" ").pop() ?? "")
            .sub,
        ].join(":");

      const server = setupServer(
        http.post<{ appId: string }, EncryptedData>(
          apiUrl("/client-shares/:appId").toString(),
          async ({ request, params }) => {
            clientShares.set(
              getClientShareKey(params, request.headers),
              await request.json(),
            );

            return HttpResponse.json({});
          },
        ),
        http.get<{ appId: string }>(
          apiUrl("/client-shares/:appId").toString(),
          async ({ request, params }) => {
            const clientShare = clientShares.get(
              getClientShareKey(params, request.headers),
            );

            if (!clientShare) return HttpResponse.json({}, { status: 404 });

            return HttpResponse.json(clientShare);
          },
        ),
      );

      server.listen({ onUnhandledRequest: "error" });

      await use(server);

      server.close();
    },
    { auto: true },
  ],

  appId: ({}, use) => use(crypto.randomUUID()),

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

  storageKey: ({ appId, jwtSubject }, use) =>
    use(`keyban:signer:${appId}:${jwtSubject}:key`),
});

export const beforeEach: typeof beforeEachBase<Fixtures> = beforeEachBase;
export const afterEach: typeof afterEachBase<Fixtures> = afterEachBase;
