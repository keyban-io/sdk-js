import initWasmFile from "@keyban/ecdsa-wasm-client";
import { IKeybanSigner } from "@keyban/sdk-base/rpc";

import { API_URL } from "~/constants";
import { WasmKeybanSigner } from "~/signer/wasm";
import { decrypt, encrypt, EncryptedData, generateKey } from "~/utils/crypto";
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
      const data: EncryptedData = await fetch(
        new URL(`/client-shares/${appId}`, API_URL),
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      ).then((res) => res.json());

      // Return decrypted share
      return decrypt(JSON.parse(storedKey), data);
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
