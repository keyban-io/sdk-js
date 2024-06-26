import { type SdkError, parseSdkError } from './sdk';
import { type ServerError, parseServerError } from './server';
import { type StorageError, parseStorageError } from './storage';
import { type WasmErrors, parseWasmError } from './wasm';

const errorTypeToDetails = (errorType: KeybanErrorTypes): string => {
  if (errorType.startsWith('WasmError')) {
    return parseWasmError(errorType as `${string}:${WasmErrors}`);
  }

  if (errorType.startsWith('ServerError')) {
    return parseServerError(errorType as `${string}:${ServerError}`);
  }

  if (errorType.startsWith('StorageError')) {
    return parseStorageError(errorType as `${string}:${StorageError}`);
  }

  if (errorType.startsWith('SdkError')) {
    return parseSdkError(errorType as `${string}:${SdkError}`);
  }

  return `Unknown error type: ${errorType}`;
};

/**
 * Enum representing all possible error types in the system.
 *
 * This includes:
 * - {@link WasmErrors}
 * - {@link ServerError}
 * - {@link StorageError}
 * - {@link SdkError}
 */
export type KeybanErrorTypes =
  | `WasmError:${WasmErrors}`
  | `ServerError:${ServerError}`
  | `StorageError:${StorageError}`
  | `SdkError:${SdkError}`;

/**
 * @category errors
 * A class representing an error in the SDK.
 */
export class KeybanError extends Error {
  /**
   * Timestamp when the error occurred.
   */
  timestamp: Date;

  /**
   * The type of error.
   */
  name: KeybanErrorTypes;

  /**
   * The original error, if any.
   */
  rootError?: Error;

  /**
   * Creates an instance of KeybanError.
   *
   * @param type - The type of the error.
   * @param rootError - The original error, if any.
   */
  constructor(type: KeybanErrorTypes, rootError?: Error) {
    super(type);
    this.name = type;
    this.timestamp = new Date();
    this.message = errorTypeToDetails(type);
    this.rootError = rootError;
    this.stack = new Error().stack;
  }
}

export type { SdkError, WasmErrors, StorageError, ServerError };
