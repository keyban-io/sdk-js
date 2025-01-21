import { KeybanBaseError } from "@keyban/sdk-base";
import { IKeybanClientShareStorage } from "@keyban/sdk-base/rpc";

import { KeybanAuth } from "~/auth";
import { apiUrl } from "~/utils/api";

export class KeybanClientShareStorage implements IKeybanClientShareStorage {
  #auth: KeybanAuth;

  constructor(auth: KeybanAuth) {
    this.#auth = auth;
  }

  async get(): Promise<string | null> {
    const accessToken = await this.#auth.getToken();
    const res = await fetch(apiUrl("/client-shares"), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok) return res.text();

    if (res.status === 404) return null;

    throw new KeybanBaseError(await res.json());
  }

  async set(clientShare: string): Promise<void> {
    const accessToken = await this.#auth.getToken();
    const res = await fetch(apiUrl("/client-shares"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: clientShare,
    });

    if (!res.ok) throw new KeybanBaseError(await res.json());
  }
}
