import { KeybanBaseError } from "@keyban/sdk-base";
import { IKeybanAccount } from "@keyban/sdk-base/rpc";

import { KeybanAuth } from "~/auth";
import { API_URL, NETWORK } from "~/constants";

export class KeybanAccount implements IKeybanAccount {
  #auth: KeybanAuth;

  constructor(auth: KeybanAuth) {
    this.#auth = auth;
  }

  async getAddress(): Promise<string> {
    const accessToken = await this.#auth.getToken();

    const url = new URL("/v1/accounts", API_URL);
    url.searchParams.set("network", NETWORK);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) throw new KeybanBaseError(await res.json());

    const { address } = await res.json();
    return address;
  }
}
