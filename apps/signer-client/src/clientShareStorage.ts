import { KeybanBaseError } from "@keyban/sdk-base";
import { IKeybanClientShareStorage } from "@keyban/sdk-base/rpc";

import { KeybanAuth } from "~/auth";
import { API_URL } from "~/constants";

export class KeybanClientShareStorage implements IKeybanClientShareStorage {
  #auth: KeybanAuth;

  constructor(auth: KeybanAuth) {
    this.#auth = auth;
  }

  async get(key: string): Promise<string | null> {
    const accessToken = await this.#auth.getToken();
    const res = await fetch(new URL(`/v1/client-shares/${key}`, API_URL), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok) return res.text();

    if (res.status === 404) return null;

    throw new KeybanBaseError(await res.json());
  }

  async set(key: string, clientShare: string): Promise<void> {
    const accessToken = await this.#auth.getToken();
    const res = await fetch(new URL(`/v1/client-shares/${key}`, API_URL), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: clientShare,
    });

    if (!res.ok) throw new KeybanBaseError(await res.json());
  }
}
