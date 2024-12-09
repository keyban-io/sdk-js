/**
 * @module Utils
 */

import "core-js/actual/typed-array/from-base64";

import { JwtError } from "~/errors";

/**
 * Parses a JWT access token and returns the decoded payload.
 * @param accessToken - The JWT access token to parse.
 * @returns The decoded payload of the JWT.
 * @throws {SdkError} If the access token is invalid.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
 */
export function decodeJwt(accessToken: string) {
  try {
    const base64 = accessToken.split(".")[1];
    // @ts-expect-error: Uint8Array.fromBase64 is polyfilled by core-js
    const bin = Uint8Array.fromBase64(base64);
    const json = new TextDecoder().decode(bin);

    return JSON.parse(json);
  } catch (err) {
    throw new JwtError(JwtError.types.InvalidToken, "decodeJwt", err as Error);
  }
}
