import { KeybanBaseError } from "@keyban/sdk-base";
import { IKeybanTpp } from "@keyban/sdk-base/rpc";
import { EventSource } from "eventsource";

import { KeybanAuth } from "~/auth";
import { TppError } from "~/errors/TppError";
import { API_URL } from "~/utils/api";

export class KeybanTpp implements IKeybanTpp {
  #auth: KeybanAuth;

  constructor(auth: KeybanAuth) {
    this.#auth = auth;
  }

  async claim(
    network: string,
    tppId: string,
    recipient: string,
  ): Promise<{ transactionHash: string }> {
    const accessToken = await this.#auth.getToken();

    const claimUrl = new URL("/v1/tpp/claim", API_URL);
    claimUrl.searchParams.set("network", network);

    const { jobId } = await fetch(claimUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ tppId, recipient }),
    }).then(async (res) => {
      if (!res.ok) throw new KeybanBaseError(await res.json());
      return res.json();
    });

    return new Promise<{
      transactionHash: string;
    }>((resolve, reject) => {
      const url = new URL(`/v1/tpp/claim/${jobId}/status/sse`, API_URL);
      const eventSource = new EventSource(url, {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            headers: {
              ...init?.headers,
              Authorization: `Bearer ${accessToken}`,
            },
          }),
      });

      eventSource.onmessage = (e) => {
        const data: {
          state: string;
          result?: { transactionHash: string };
          error?: string;
        } = JSON.parse(e.data);
        const { state, result, error } = data;

        switch (state) {
          case "completed":
            resolve(result!);
            eventSource.close();
            break;

          case "failed": {
            reject(
              Object.assign(
                new TppError(TppError.types.ClaimFailed, "KeybanTpp"),
                { detail: error },
              ),
            );
            eventSource.close();
            break;
          }
        }
      };
    });
  }
}
