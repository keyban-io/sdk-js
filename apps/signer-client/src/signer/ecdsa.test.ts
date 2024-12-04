import * as jose from "jose";
import { http, HttpResponse } from "msw";
import { beforeEach, describe, it } from "vitest";

import { KeybanSigner_ECDSA } from "~/signer/ecdsa";
import { apiUrl } from "~/utils/api";
import { server } from "~/vitest.setup";

let signer: KeybanSigner_ECDSA;

beforeEach(() => {
  signer = new KeybanSigner_ECDSA();
});

describe("dkg", () => {
  it("should store share", async () => {
    server.use(
      http.post(apiUrl("/client-shares/:appId").toString(), () => {
        return HttpResponse.json({});
      }),
    );

    const accessToken = await new jose.SignJWT()
      .setProtectedHeader({ alg: "HS256" })
      .setSubject("subject")
      .setAudience("audience")
      .sign(new TextEncoder().encode("secret"));

    await signer.dkg("foo", accessToken);
  });
});
