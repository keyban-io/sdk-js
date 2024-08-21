import type { KeybanStorage } from "@keyban/sdk-base";

/**
 * @class KeybanLocalStorage
 *
 * This class implements the KeybanStorage interface using the localStorage Web API.
 * It provides methods to get and save client shares to localStorage.
 *
 * @remarks
 * This storage solution is intended for development environments only and should not be used in production due to the limited security of localStorage.
 * LocalStorage provides no encryption or protection against cross-site scripting (XSS) attacks, making it unsuitable for storing sensitive data in a production environment.
 * Ensure to use a more secure storage solution for production deployments.
 */
export class KeybanLocalStorage implements KeybanStorage {
  /**
   * The constructor of the `KeybanLocalStorage` class.
   * Initializes the storage provider and checks for the presence of the localStorage API in the environment.
   *
   * @throws Error if the environment does not support the localStorage Web API.
   */
  constructor() {
    if (!localStorage)
      throw new Error("Your environment doesn't support localStorage web API");

    console.warn("IMPORTANT: KEYBAN SDK SHOULDN'T BE USED WITH UNSAFE STORAGE");
  }

  /**
   * Retrieves a value from localStorage.
   * This method fetches the stored value using the provided key.
   *
   * @param key - The key used to retrieve the value.
   * @returns A promise that resolves to the value, or null if not found.
   */
  async get(key: string) {
    const value = localStorage.getItem(key);
    return value;
  }

  /**
   * Saves a value to localStorage.
   * This method stores the value using the provided key.
   *
   * @param key - The key used to save the value.
   * @param value - The value to be saved.
   * @returns A promise that resolves when the value is successfully saved.
   */
  async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }
}
