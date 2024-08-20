import { KeybanBaseError } from "./base";

/**
 * @enum
 * Enum representing possible storage error types.
 *
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
   *  SDK encontered an error when trying to save your share into storage.
   */
  SaveFailed = "SaveFailed",
}

export class StorageError extends KeybanBaseError<StorageErrorTypes> {
  static types = StorageErrorTypes;

  constructor(type: StorageErrorTypes, instance: string, rootError?: Error) {
    super({ type, instance, rootError });
    this.detail = this.getDescription(type);
  }

  getDescription(errorType: StorageErrorTypes) {
    switch (errorType) {
      case StorageErrorTypes.SaveFailed:
        return "SDK encontered an error when trying to save your share into storage.";
      case StorageErrorTypes.RetrivalFailed:
        return "Retrival of the share from storage failed ungracefully. Storage provider might be implement incorrectly.";
      case StorageErrorTypes.ConnectionError:
        return "SDK was unable to connect to your storage solution.";

      default:
        return "Unknown error type";
    }
  }
}
