import { KeybanBaseError } from "@keyban/sdk-base/errors";

import { ClientShareError } from "~/errors/ClientShareError";
import { apiUrl } from "~/utils/api";
import { decrypt, encrypt, generateKey } from "~/utils/crypto";
import { decodeJwt } from "~/utils/jwt";

export abstract class AbstractKeybanSigner {
  async getClientShare(appId: string, accessToken: string) {
    const { sub } = decodeJwt(accessToken);
    const localStorageKey = `keyban:signer:${appId}:${sub}:key`;

    // Get the encryption key
    const storedKey = localStorage.getItem(localStorageKey);

    // If we have an encryption key, feth the client share and decrypt it
    if (storedKey) {
      return fetch(apiUrl(`/client-shares/${appId}`), {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then(async (res): Promise<string> => {
          if (res.ok) {
            const data = await res.json();
            return decrypt(JSON.parse(storedKey), data);
          }

          if (res.status === 404) {
            localStorage.removeItem(localStorageKey);
            return this.getClientShare(appId, accessToken);
          }

          throw new KeybanBaseError(await res.json());
        })
        .catch((err: Error) => {
          if (err instanceof KeybanBaseError) throw err;

          throw new ClientShareError(
            ClientShareError.types.GetClientShare,
            "ecdsa.getClientShare",
            err,
          );
        });
    }

    // Create an encryption key and a share
    const [key, clientShare] = await Promise.all([
      generateKey(),
      this.dkg(appId, accessToken),
    ]);

    // Send the encrypted share to our API
    await fetch(apiUrl(`/client-shares/${appId}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: await encrypt(key, clientShare).then(JSON.stringify),
    })
      .then(async (res): Promise<string> => {
        if (res.ok) return res.json();
        throw new KeybanBaseError(await res.json());
      })
      .catch((err: Error) => {
        throw new ClientShareError(
          ClientShareError.types.SaveClientShare,
          "ecdsa.getClientShare",
          err,
        );
      });

    // Save the encryption key locally
    localStorage.setItem(localStorageKey, JSON.stringify(key));

    // Return decrypted share
    return clientShare;
  }

  async init(appId: string, accessToken: string) {
    await this.getClientShare(appId, accessToken);
  }

  abstract dkg(appId: string, accessToken: string): Promise<string>;
}
