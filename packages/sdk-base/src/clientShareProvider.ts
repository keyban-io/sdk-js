import { ClientShareProvider, KeybanClientBase } from "~/client";
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
  #client!: KeybanClientBase;

  /**
   * Internal use only.
   * @param client - A keyban client
   * @private
   */
  registerClient(client: KeybanClientBase) {
    this.#client = client;
  }

  get #rpcClient() {
    return RpcClient.getInstance(this.#client);
  }

  /**
   * Retrieves the client share information.
   * @returns - A promise that resolves to a string containing the client share, or null if not available.
   */
  async get(): Promise<string | null> {
    return this.#rpcClient.call("clientShareStorage", "get");
  }

  /**
   * Sets the client share information.
   * @param clientShare - The client share string to set.
   * @returns - A promise that resolves when the client share has been set.
   */
  async set(clientShare: string): Promise<unknown> {
    return this.#rpcClient.call("clientShareStorage", "set", clientShare);
  }
}
