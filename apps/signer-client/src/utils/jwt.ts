import "core-js/actual/typed-array/from-base64";

import { SignerClientError } from "~/errors/SignerClientError";

export function parseJwt(accessToken: string) {
  try {
    const base64 = accessToken.split(".")[1];
    // @ts-expect-error: Uint8Array.fromBase64 is polyfilled by core-js
    const bin = Uint8Array.fromBase64(base64);
    const json = new TextDecoder().decode(bin);

    return JSON.parse(json);
  } catch (err) {
    throw new SignerClientError(
      SignerClientError.types.InvalidAccessToken,
      "parseJwt",
      err as Error,
    );
  }
}
