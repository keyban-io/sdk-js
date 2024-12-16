import { decrypt, encrypt } from "@keyban/sdk-base/crypto";
import { KeybanBaseError } from "@keyban/sdk-base/errors";

import { ClientShareError } from "~/errors/ClientShareError";
import { apiUrl } from "~/utils/api";

export abstract class AbstractKeybanSigner {
  auth: { getToken(): Promise<string> };

  constructor(auth: { getToken(): Promise<string> }) {
    this.auth = auth;
  }

  async createClientShare(clientShareKey: JsonWebKey) {
    const clientShare = await this.dkg();

    // Send the encrypted share to our API
    await fetch(apiUrl("/client-share"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await this.auth.getToken()}`,
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

  async getClientShare(clientShareKey: JsonWebKey) {
    return fetch(apiUrl("/client-share"), {
      method: "GET",
      headers: { Authorization: `Bearer ${await this.auth.getToken()}` },
    })
      .then(async (res): Promise<string> => {
        if (res.ok) {
          const data = await res.json();
          return decrypt(clientShareKey, data);
        }

        if (res.status === 404) return this.createClientShare(clientShareKey);

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

  async init(clientShareKey: JsonWebKey) {
    await this.getClientShare(clientShareKey);
  }

  abstract dkg(): Promise<string>;
}
