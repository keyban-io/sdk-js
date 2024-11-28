import { KeybanBaseError } from "./base";

/**
 * @enum
 * Enum representing possible storage error types.
 */
export enum StorageErrorTypes {
  /**
   *  SDK was unable to connect to your storage solution.
   */
  ConnectionError = "ConnectionError",
  /**
   *  Retrival of the share from storage failed ungracefully. Storage provider might be implement incorrectly.
   */
  RetrivalFailed = "RetrivalFailed",
  /**
   *  SDK encountered an error when trying to save your share into storage.
   */
  SaveFailed = "SaveFailed",
}

/**
 * Represents an error related to storage operations in the SDK.
 * Extends the `KeybanBaseError` class with specific error types for storage.
 */
export class StorageError extends KeybanBaseError<StorageErrorTypes> {
  /**
   * A static reference to the `StorageErrorTypes` enum.
   */
  static types = StorageErrorTypes;

  /**
   * Constructs a new `StorageError` instance.
   * @param {StorageErrorTypes} type - The type of the storage error.
   * @param {string} instance - The instance identifier where the error occurred.
   * @param {Error} [rootError] - An optional root error that caused this storage error.
   */
  constructor(type: StorageErrorTypes, instance: string, rootError?: Error) {
    super({
      type,
      instance,
      rootError,
      title: StorageError.#getTitle(type),
    });
  }

  /**
   * Retrieves the title message for a given storage error type.
   * @param {StorageErrorTypes} errorType - The type of the storage error.
   * @returns {string} The title message corresponding to the error type.
   */
  static #getTitle(errorType: StorageErrorTypes) {
    switch (errorType) {
      case StorageErrorTypes.SaveFailed:
        return "SDK encountered an error when trying to save your share into storage";
      case StorageErrorTypes.RetrivalFailed:
        return "Retrival of the share from storage failed ungracefully. Storage provider might be implement incorrectly";
      case StorageErrorTypes.ConnectionError:
        return "SDK was unable to connect to your storage solution";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
