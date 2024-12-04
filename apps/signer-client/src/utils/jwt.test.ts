import * as jose from "jose";
import { describe, expect, it } from "vitest";

import { SignerClientError } from "~/errors/SignerClientError";
import { decodeJwt } from "~/utils/jwt";

describe("with a valid jwt", () => {
  it("should return payload", async () => {
    const payload = { foo: "bar" };

    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode("secret"));

    expect(decodeJwt(token)).toMatchObject(payload);
  });
});

describe("with invalid jwt", () => {
  it("should throw an error", async () => {
    const token = `header.${btoa("not a valid json")}.signature`;
    expect(() => decodeJwt(token)).toThrowError(
      new SignerClientError(
        SignerClientError.types.InvalidAccessToken,
        "decodesJwt",
      ),
    );
  });
});
