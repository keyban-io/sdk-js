import { decrypt, encrypt } from "@keyban/sdk-base/crypto";
import { KeybanBaseError } from "@keyban/sdk-base/errors";

import { ClientShareError } from "~/errors/ClientShareError";
import { apiUrl } from "~/utils/api";

export abstract class AbstractKeybanSigner {
  async createClientShare(
    appId: string,
    clientShareKey: JsonWebKey,
    accessToken: string,
  ) {
    const clientShare = await this.dkg(appId, accessToken);

    // Send the encrypted share to our API
    await fetch(apiUrl(`/client-shares/${appId}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: await encrypt(clientShareKey, clientShare).then(JSON.stringify),
    })
      .then(async (res): Promise<string> => {
        if (res.ok) return res.json();
        throw new KeybanBaseError(await res.json());
      })
      .catch((err: Error) => {
        throw new ClientShareError(
          ClientShareError.types.SaveClientShare,
          "ecdsa.createClientShare",
          err,
        );
      });

    // Return decrypted share
    return clientShare;
  }

  async getClientShare(
    appId: string,
    clientShareKey: JsonWebKey,
    accessToken: string,
  ) {
    return fetch(apiUrl(`/client-shares/${appId}`), {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(async (res): Promise<string> => {
        if (res.ok) {
          const data = await res.json();
          return decrypt(clientShareKey, data);
        }

        if (res.status === 404)
          return this.createClientShare(appId, clientShareKey, accessToken);

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

  async init(appId: string, clientShareKey: JsonWebKey, accessToken: string) {
    await this.getClientShare(appId, clientShareKey, accessToken);
  }

  abstract dkg(appId: string, accessToken: string): Promise<string>;
}
