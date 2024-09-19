import { SdkError, SdkErrorTypes } from "~/errors";

// Unicode text JWT parser function
// @see https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
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
