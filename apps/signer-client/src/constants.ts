import { KeybanBaseError, KeybanNetwork } from "@keyban/sdk-base";

const url = new URL(window.location.href);

export const API_URL = new URL(window.location.origin);

export const APP_ID = url.searchParams.get("appId")!;

export const NETWORK = url.searchParams.get("network")! as KeybanNetwork;

const metadataUrl = new URL("/v1/metadata", API_URL);
metadataUrl.searchParams.set("network", NETWORK);

export const METADATA_PROMISE: Promise<{
  network: { rpcUrl: string; indexerUrl: string };
  auth: { domain: string; clientId: string };
}> = fetch(metadataUrl).then(async (res) => {
  if (!res.ok) throw new KeybanBaseError(await res.json());
  return res.json();
});

export const APPLICATION_PROMISE: Promise<{
  id: string;
  name?: string;
  domains: string[];
  allowEmbededAuth: boolean;
  tpps: {
    network: KeybanNetwork;
    address: string;
  }[];
}> = fetch(new URL(`/v1/applications/${APP_ID}`, API_URL)).then(async (res) => {
  if (!res.ok) throw new KeybanBaseError(await res.json());
  return res.json();
});
