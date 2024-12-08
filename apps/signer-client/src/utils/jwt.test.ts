import * as jose from "jose";
import { describe, test } from "vitest";

import { JwtError } from "~/errors/JwtError";
import { decodeJwt } from "~/utils/jwt";

describe("decodeJwt", () => {
  test("a valid jwt should return payload", async ({ expect }) => {
    const payload = { foo: "bar" };

    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode("secret"));

    expect(decodeJwt(token)).toMatchObject(payload);
  });

  test("an invalid jwt should throw an error", async ({ expect }) => {
    const token = `header.${btoa("not a valid json")}.signature`;
    expect(() => decodeJwt(token)).toThrowError(
      new JwtError(JwtError.types.InvalidToken, "decodeJwt"),
    );
  });
});
