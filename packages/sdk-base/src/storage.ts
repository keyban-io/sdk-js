/**
 * Storage interface
 *
 * This interface defines the methods that a Keyban storage must implement.
 */
export interface KeybanStorage {
  get: (key: string, password?: string) => Promise<string | null>;
  set: (key: string, value: string, password?: string) => Promise<void>;
}
