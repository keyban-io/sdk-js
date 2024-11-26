import type { IKeybanStorage } from "@keyban/sdk-base";

/**
 * Implements the `IKeybanStorage` interface using the Web Storage API (`localStorage`).
 * This class provides methods to get and save client shares to `localStorage`.
 *
 * @remarks
 * **Security Warning:** This storage solution is intended for development and testing environments only.
 * The use of `localStorage` for storing sensitive data is insecure due to the following reasons:
 * - Data stored in `localStorage` is accessible via any script running on the same origin, making it vulnerable to cross-site scripting (XSS) attacks.
 * - Data in `localStorage` is not encrypted and can be read by anyone with access to the user's device.
 *
 * **Best Practices:**
 * - **Do Not Use in Production:** Do not use this storage implementation in production environments.
 * - **Use Secure Storage Alternatives:** In production, use secure storage mechanisms such as secure cookies, IndexedDB with encryption, or platform-specific secure storage (e.g., Keychain on iOS, Keystore on Android).
 * - **Implement Security Measures:** Ensure that your application implements proper security measures to protect against XSS attacks and unauthorized access.
 *
 * **Typical Use Cases:**
 * - **Development and Testing:** Use this class during development and testing phases where security is not a primary concern.
 * - **Rapid Prototyping:** Suitable for quick prototypes that will not be exposed to untrusted environments.
 *
 * **Limitations of `localStorage`:**
 * - **No Encryption:** Data is stored in plaintext and is not encrypted.
 * - **Synchronous API:** `localStorage` operations are synchronous, which can affect performance.
 * - **Size Limitations:** Browsers impose limits on the amount of data that can be stored.
 * - **Shared Across Tabs and Windows:** Data is shared across all tabs and windows of the same origin.
 *
 * **Security Implications:**
 * - **Vulnerability to XSS Attacks:** If your application is vulnerable to XSS, attackers can access data stored in `localStorage`.
 * - **No Protection Against CSRF:** `localStorage` does not protect against Cross-Site Request Forgery attacks.
 *
 * @see {@link IKeybanStorage}
 */
export class KeybanLocalStorage implements IKeybanStorage {
  /**
   * Creates an instance of `KeybanLocalStorage`.
   * Initializes the storage provider and checks for the presence of the `localStorage` API in the environment.
   *
   * @throws {Error} If the environment does not support the `localStorage` Web API.
   *
   * @example
   * ```typescript
   * const storage = new KeybanLocalStorage();
   * ```
   */
  constructor() {
    if (typeof localStorage === "undefined") {
      throw new Error(
        "Your environment doesn't support the localStorage Web API.",
      );
    }

    console.warn(
      "WARNING: Using KeybanLocalStorage is not secure and should not be used in production environments.",
    );
  }

  /**
   * Retrieves a value from `localStorage`.
   * This method fetches the stored value using the provided key.
   *
   * @param key - The key used to retrieve the value.
   * @returns A promise that resolves to the value associated with the key, or `null` if the key does not exist.
   *
   * @example
   * ```typescript
   * const value = await storage.get("myKey");
   * ```
   */
  async get(key: string): Promise<string | null> {
    const value = localStorage.getItem(key);
    return value;
  }

  /**
   * Saves a value to `localStorage`.
   * This method stores the value using the provided key.
   *
   * @param key - The key under which the value will be stored.
   * @param value - The value to be saved.
   * @returns A promise that resolves when the value is successfully saved.
   *
   * @example
   * ```typescript
   * await storage.set("myKey", "myValue");
   * ```
   */
  async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }
}
