import { ClientShareProvider } from "~/client";
import { RpcClient } from "~/rpc";

export class KeybanClientShareProvider implements ClientShareProvider {
  #rpcClient: RpcClient;

  constructor(apiUrl: URL | string, appId: string) {
    const rpcUrl = new URL("/signer-client/", apiUrl);
    rpcUrl.searchParams.set("appId", appId);
    this.#rpcClient = RpcClient.getInstance(rpcUrl);
  }

  async get(): Promise<string | null> {
    return this.#rpcClient.call("clientShareStorage", "get");
  }

  async set(clientShare: string): Promise<unknown> {
    return this.#rpcClient.call("clientShareStorage", "set", clientShare);
  }
}
