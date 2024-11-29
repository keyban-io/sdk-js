/**
 * @module Errors
 */
/**
 * The `KeybanBaseError` class serves as the foundational structure for all custom errors within the Keyban SDK.
 * It extends the native JavaScript `Error` class, providing additional properties to enrich error handling
 * with more context and information.
 * @template T - The enum type representing the specific error category.
 * @remarks
 * This class is intended to be extended by more specific error classes that define particular error types.
 * It standardizes error information, making it easier to handle and debug errors across the SDK.
 * @example
 * ```typescript
 * import { KeybanBaseError, SdkErrorTypes } from '@keyban/sdk';
 *
 * class AddressInvalidError extends KeybanBaseError<SdkErrorTypes.AddressInvalid> {
 *   constructor(instance: string, detail?: string) {
 *     super({
 *       type: SdkErrorTypes.AddressInvalid,
 *       instance,
 *       detail,
 *       title: "Invalid Ethereum Address",
 *       status: 400,
 *     });
 *   }
 * }
 *
 * // Usage in a function
 * function validateAddress(address: string) {
 *   if (!isValidEthereumAddress(address)) {
 *     throw new AddressInvalidError("validateAddress-001", "The provided Ethereum address is not valid.");
 *   }
 * }
 * ```
 */
export class KeybanBaseError<T extends string> extends Error {
  /**
   * A URI reference that identifies the problem type. This property is mandatory and provides a
   * machine-readable identifier for the error.
   * @example
   * ```typescript
   * error.type // "https://api.keyban.io/errors/address-invalid"
   * ```
   */
  type: T;

  /**
   * A short, human-readable summary of the problem type. It should remain consistent across
   * occurrences of the problem except for localization purposes.
   * @example
   * ```typescript
   * error.title // "Invalid Ethereum Address"
   * ```
   */
  title: string;

  /**
   * A URI reference that identifies the specific occurrence of the problem. This provides a
   * unique identifier for the particular instance of the error.
   * @example
   * ```typescript
   * error.instance // "validateAddress-001"
   * ```
   */
  instance: string;

  /**
   * The HTTP status code generated by the origin server for this occurrence of the problem.
   * It is a numeric value and is included for the convenience of the client.
   * @example
   * ```typescript
   * error.status // 400
   * ```
   */
  status?: number;

  /**
   * A human-readable explanation specific to this occurrence of the problem. This field helps
   * the client understand and potentially correct the issue.
   * @example
   * ```typescript
   * error.detail // "The provided Ethereum address is not valid."
   * ```
   */
  detail?: string;

  /**
   * A timestamp recording the exact date and time when the exception occurred, in ISO8601 format
   * (`YYYY-MM-DDTHH:mm:ss.sssZ`).
   * @example
   * ```typescript
   * error.timestamp // "2024-04-27T12:34:56.789Z"
   * ```
   */
  timestamp: string;

  /**
   * The original error instance, if any. This can be used to trace the root cause of the error.
   * @example
   * ```typescript
   * error.rootError // Original Error instance or additional error details
   * ```
   */
  rootError?: Error | Record<string, unknown>;

  /**
   * Serializes the error instance into a JSON object, including all relevant properties.
   * This is useful for logging, debugging, or transmitting error information.
   * @returns {object} A JSON representation of the error.
   * @example
   * ```typescript
   * const errorJson = error.toJSON();
   * console.log(errorJson);
   * ```
   */
  toJSON() {
    return {
      type: this.type,
      title: this.title,
      instance: this.instance,
      status: this.status,
      detail: this.detail,
      timestamp: this.timestamp,
      rootError: this.rootError,
    };
  }

  /**
   * Creates an instance of `KeybanBaseError`. It initializes the error with the provided properties,
   * sets the error message, and records the timestamp.
   * @param {object} params - The parameters to initialize the error.
   * @param {T} params.type - The specific error type identifier.
   * @param {string} [params.title] - A short summary of the error. Defaults to the `type` if not provided.
   * @param {string} params.instance - A unique identifier for this specific error occurrence.
   * @param {Error | Record<string, unknown>} [params.rootError] - The original error, if any.
   * @param {string} [params.detail] - A detailed explanation of the error.
   * @param {number} [params.status] - The HTTP status code associated with the error.
   * @example
   * ```typescript
   * const error = new KeybanBaseError({
   *   type: SdkErrorTypes.AddressInvalid,
   *   instance: "validateAddress-001",
   *   detail: "The provided Ethereum address is not valid.",
   *   status: 400,
   * });
   * ```
   */
  constructor({
    type,
    title,
    instance,
    rootError,
    detail,
    status,
  }: {
    type: KeybanBaseError<T>["type"];
    title?: KeybanBaseError<T>["title"];
    instance: KeybanBaseError<T>["instance"];
    rootError?: KeybanBaseError<T>["rootError"];
    detail?: KeybanBaseError<T>["detail"];
    status?: KeybanBaseError<T>["status"];
  }) {
    super(detail ?? title ?? type);

    this.type = type;
    this.title = title ?? type;
    this.instance = instance;
    this.detail = detail;
    this.status = status;
    this.timestamp = new Date().toISOString();
    this.rootError = rootError;
  }
}
