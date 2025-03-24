import { KeybanBaseError } from "@keyban/sdk-base";
import { IKeybanAccount } from "@keyban/sdk-base/rpc";

import { KeybanAuth } from "~/auth";
import { apiUrl } from "~/utils/api";

export class KeybanAccount implements IKeybanAccount {
  #auth: KeybanAuth;

  constructor(auth: KeybanAuth) {
    this.#auth = auth;
  }

  async getAddress(network: string): Promise<string> {
    const accessToken = await this.#auth.getToken();

    const url = apiUrl("/v1/accounts");
    url.searchParams.set("network", network);

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
