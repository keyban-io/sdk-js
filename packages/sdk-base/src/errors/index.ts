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
 * Possible error types
 */
export type KeybanErrorTypes =
  | `WasmError:${WasmErrors}`
  | `ServerError:${ServerError}`
  | `StorageError:${StorageError}`
  | `SdkError:${SdkError}`;

/**
 * @category errors
 * Error class for SDK errors.
 */
export class KeybanError extends Error {
  timestamp;
  name: KeybanErrorTypes;
  rootError;

  constructor(type: KeybanErrorTypes, rootError?: Error) {
    super(type);
    this.name = type;
    this.timestamp = new Date();
    this.message = errorTypeToDetails(type);
    this.rootError = rootError;
    this.stack = new Error().stack;
  }
}
