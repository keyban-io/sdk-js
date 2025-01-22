import { ClientShareProvider } from "~/client";
import { RpcClient } from "~/rpc";

/**
 * A client share provider implementation for the Keyban client.
 *
 * The `KeybanClientShareProvider` class provides methods to get and set the client share.
 * This class is used to interact with the client share storage on the server side.
 * @remarks
 * The client share is saved in a service provided by Keyban, ensuring secure storage
 * and retrieval of the client share information.
 */
export class KeybanClientShareProvider implements ClientShareProvider {
  #rpcClient: RpcClient;

  /**
   * Creates an instance of `KeybanClientShareProvider`.
   * @param apiUrl - The base URL of the API.
   * @param appId - The application ID.
   */
  constructor(apiUrl: URL | string, appId: string) {
    const rpcUrl = new URL("/signer-client/", apiUrl);
    rpcUrl.searchParams.set("appId", appId);
    this.#rpcClient = RpcClient.getInstance(rpcUrl);
  }

  /**
   * Retrieves the client share information.
   * @returns A promise that resolves to a string containing the client share, or null if not available.
   */
  async get(): Promise<string | null> {
    return this.#rpcClient.call("clientShareStorage", "get");
  }

  /**
   * Sets the client share information.
   * @param clientShare - The client share string to set.
   * @returns A promise that resolves when the client share has been set.
   */
  async set(clientShare: string): Promise<unknown> {
    return this.#rpcClient.call("clientShareStorage", "set", clientShare);
  }
}
