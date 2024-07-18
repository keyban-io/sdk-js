/**
 * Interface for the storage provider API.
 * @typedef {Object} StorageProviderApi
 * @property {Function} save - Saves a client share to storage.
 * @property {Function} get - Retrieves a client share from storage.
 */
export type StorageProviderApi<S> = {
  save: (key: string, share: S, password?: string) => Promise<boolean>;
  get: (key: string, password?: string) => Promise<S | undefined>;
};

/**
 * Represents a hexadecimal string.
 * @typedef {string} Hex
 */
export type Hex = string;
