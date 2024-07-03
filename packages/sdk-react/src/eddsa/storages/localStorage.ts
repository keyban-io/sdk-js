import type { ClientShare, StorageProviderApi } from '@keyban/sdk-base';

/**
 * @class KeybanLocalStorage
 * 
 * This class implements the StorageProviderApi interface using the localStorage Web API.
 * It provides methods to get and save client shares to localStorage.
 * 
 * @warning This storage solution is intended for development environments only and should not be used in production due to the limited security of localStorage.
 */
export class KeybanLocalStorage implements StorageProviderApi {
  /**
   * The constructor of the `KeybanLocalStorage` class.
   * @throws Error if the environment does not support the localStorage Web API.
   */
  constructor() {
    if (!localStorage) {
      throw new Error("Your environment doesn't support localStorage web API");
    }
  }

  /**
   * Retrieves a client share from localStorage.
   * @param key - The key used to retrieve the client share.
   * @returns A promise that resolves to the client share, or undefined if not found.
   */
  get(key: string): Promise<ClientShare | undefined> {
    const value = localStorage.getItem(key);
    if (!value) {
      return Promise.resolve(undefined);
    }
    const savedShares = JSON.parse(value) as ClientShare;
    return Promise.resolve(savedShares);
  }

  /**
   * Saves a client share to localStorage.
   * @param key - The key used to save the client share.
   * @param share - The client share to be saved.
   * @returns A promise that resolves to true if the client share was successfully saved.
   */
  save(key: string, share: ClientShare): Promise<boolean> {
    localStorage.setItem(key, JSON.stringify(share));
    return Promise.resolve(true);
  }
}
