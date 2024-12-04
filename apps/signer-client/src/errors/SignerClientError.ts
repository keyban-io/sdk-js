import { KeybanBaseError } from "@keyban/sdk-base";

/**
 * Enum representing all possible SDK error types.
 *
 * This enumeration defines the various error conditions that can occur within the Keyban SDK.
 * Each error type is associated with a specific scenario, allowing developers to handle errors
 * gracefully and provide meaningful feedback to users.
 * @enum {string}
 */
export enum SignerClientErrorType {
  /**
   * The environment does not support WebAssembly modules.
   *
   * **Description:** WebAssembly is required for certain SDK functionalities.
   *
   * **Possible Cause:** Running the SDK in an outdated browser or environment that lacks WebAssembly support.
   */
  WebAssemblyNotSupported = "WebAssemblyNotSupported",

  /**
   * An invalid access token was provided.
   *
   * **Description:** The access token used for authentication is either malformed or expired.
   * **Possible Cause:** Using an incorrect token, token has expired, or token was not properly retrieved.
   */
  InvalidAccessToken = "InvalidAccessToken",

  CryptoError = "CryptoError",

  ClientShare = "ClientShare",
}

/**
 * Class representing an Signer Client specific error.
 *
 * The `SdkError` class extends the `KeybanBaseError` to provide detailed error information
 * based on predefined `SdkErrorTypes`. It facilitates consistent error handling across
 * the Keyban SDK by categorizing errors and providing meaningful messages.
 * @augments KeybanBaseError
 */
export class SignerClientError extends KeybanBaseError<SignerClientErrorType> {
  /**
   * The available Signer Client error types.
   */
  static types = SignerClientErrorType;

  /**
   * Creates an instance of `SdkError`.
   * @param type - The specific type of Signer Client error.
   * @param instance - The identifier of the instance where the error occurred.
   * @param rootError - The original error that caused this Signer Client error, if any.
   */
  constructor(
    type: SignerClientErrorType,
    instance: string,
    rootError?: Error,
  ) {
    super({
      type,
      instance,
      rootError,
      title: SignerClientError.#getTitle(type),
    });
  }

  /**
   * Retrieves a human-readable title based on the error type.
   * @private
   * @param errorType - The type of Signer Client error.
   * @returns - A descriptive title for the error.
   */
  static #getTitle(errorType: SignerClientErrorType): string {
    switch (errorType) {
      case SignerClientErrorType.WebAssemblyNotSupported:
        return "Environment does not support WebAssembly modules";

      case SignerClientErrorType.InvalidAccessToken:
        return "You provided an invalid access token";

      case SignerClientErrorType.CryptoError:
        return "CryptoError";

      case SignerClientErrorType.ClientShare:
        return "ClientShare";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
