import type { KeybanStorage } from '@keyban/sdk-base';

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
export class KeybanLocalStorage<T> implements KeybanStorage<T> {
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
   * Retrieves a client share from localStorage.
   * This method fetches the stored client share using the provided key.
   *
   * @param key - The key used to retrieve the client share.
   * @returns A promise that resolves to the client share, or undefined if not found.
   *
   * @example
   * const storage = new KeybanLocalStorage<EcdsaClientShare>();
   * const share = await storage.get('my-key-id');
   * if (share) {
   *   console.log('Client share retrieved:', share);
   * } else {
   *   console.log('No client share found for the given key.');
   * }
   */
  async get(key: string): Promise<T | undefined> {
    const value = localStorage.getItem(key);
    if (!value) return;

    try {
      return JSON.parse(value) as T;
    } catch (err) {
      return;
    }
  }

  /**
   * Saves a client share to localStorage.
   * This method stores the client share using the provided key.
   *
   * @param key - The key used to save the client share.
   * @param share - The client share to be saved.
   * @returns A promise that resolves to true if the client share was successfully saved.
   *
   * @example
   * const storage = new KeybanLocalStorage<EcdsaClientShare>();
   * const share: EcdsaClientShare = { ... }; // Your client share object
   * const success = await storage.save('my-key-id', share);
   * if (success) {
   *   console.log('Client share saved successfully.');
   * } else {
   *   console.log('Failed to save client share.');
   * }
   */
  async set(key: string, share: T): Promise<boolean> {
    try {
      localStorage.setItem(key, JSON.stringify(share));
      return true;
    } catch (err) {
      return false;
    }
  }
}
