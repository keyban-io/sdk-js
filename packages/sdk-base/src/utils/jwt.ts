/**
 * @module Utils
 */
import { SdkError, SdkErrorTypes } from "~/errors";

/**
 * Parses a JWT access token and returns the decoded payload.
 * @param {string} accessToken - The JWT access token to parse.
 * @returns {object} The decoded payload of the JWT.
 * @throws {SdkError} If the access token is invalid.
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
 */
export function parseJwt(accessToken: string) {
  try {
    const base64 = accessToken.split(".")[1];
    const bin = Uint8Array.from(
      atob(base64)
        .split("")
        .map((m) => m.codePointAt(0)!),
    );
    const json = new TextDecoder().decode(bin);

    return JSON.parse(json);
  } catch (err) {
    throw new SdkError(
      SdkErrorTypes.InvalidAccessToken,
      "parseJwt",
      err as Error,
    );
  }
}
