import initWasmFile from "@keyban/ecdsa-wasm-client";
import { KeybanBaseError } from "@keyban/sdk-base";
import { IKeybanSigner } from "@keyban/sdk-base/rpc";

import { API_URL } from "~/constants";
import { SignerClientError } from "~/errors/SignerClientError";
import { WasmKeybanSigner } from "~/signer/wasm";
import { decrypt, encrypt, generateKey } from "~/utils/crypto";
import { parseJwt } from "~/utils/jwt";

export class KeybanSigner_ECDSA
  extends WasmKeybanSigner(initWasmFile)
  implements IKeybanSigner
{
  async #getClientShare(appId: string, accessToken: string) {
    const { sub } = parseJwt(accessToken);
    const localStorageKey = `keyban:ecdsa:${appId}:${sub}:key`;

    // Get the encryption key
    const storedKey = localStorage.getItem(localStorageKey);

    // If we have an encryption key, feth the client share and decrypt it
    if (storedKey) {
      return fetch(new URL(`/client-shares/${appId}`, API_URL), {
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
            return this.#getClientShare(appId, accessToken);
          }
          throw new KeybanBaseError(await res.json());
        })

        .catch((err: Error) => {
          if (err instanceof KeybanBaseError) throw err;

          throw new SignerClientError(
            SignerClientError.types.ClientShare,
            "ecdsa.getClientShare.fetch",
            err,
          );
        });
    }

    // Create an encryption key and a share
    const [key, clientShare] = await Promise.all([
      generateKey(),
      globalThis.ecdsa.dkg(API_URL.origin, appId, accessToken),
    ]);

    // Send the encrypted share to our API
    await fetch(new URL(`/client-shares/${appId}`, API_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: await encrypt(key, clientShare).then(JSON.stringify),
    }).catch((err: Error) => {
      throw new SignerClientError(
        SignerClientError.types.ClientShare,
        "ecdsa.getClientShare.create",
        err,
      );
    });

    // Save the encryption key locally
    localStorage.setItem(localStorageKey, JSON.stringify(key));

    // Return decrypted share
    return clientShare;
  }

  dkg: IKeybanSigner["dkg"] = KeybanSigner_ECDSA.wrap(
    async (appId, accessToken) => {
      await this.#getClientShare(appId, accessToken);
    },
  );

  sign: IKeybanSigner["sign"] = KeybanSigner_ECDSA.wrap(
    async (appId, accessToken, message) => {
      const clientShare = await this.#getClientShare(appId, accessToken);

      return globalThis.ecdsa.sign(
        API_URL.origin,
        appId,
        accessToken,
        clientShare,
        message,
      );
    },
  );

  publicKey: IKeybanSigner["publicKey"] = KeybanSigner_ECDSA.wrap(
    async (appId, accessToken) => {
      const clientShare = await this.#getClientShare(appId, accessToken);
      return globalThis.ecdsa.publicKey(clientShare);
    },
  );
}
