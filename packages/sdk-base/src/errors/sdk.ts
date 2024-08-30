import { KeybanBaseError } from "./base";

/**
 * @enum
 * Enum representing possible SDK error types.
 *
 */
export enum SdkErrorTypes {
  /**
   * Client was not initialized properly. Make sure that your enviroment supports WebAssembly.
   */
  ClientNotInitialized = "ClientNotInitialized",

  /**
   * Environment that was used doesn't support WebAssembly module.
   */
  WebAssemblyNotSupported = "WebAssemblyNotSupported",

  /**
   * Address is invalid.
   */
  AddressInvalid = "AddressInvalid",

  /**
   * Amount is invalid.
   */
  AmountInvalid = "AmountInvalid",
}

export class SdkError extends KeybanBaseError<SdkErrorTypes> {
  static types = SdkErrorTypes;

  constructor(type: SdkErrorTypes, instance: string, rootError?: Error) {
    super({
      type,
      instance,
      rootError,
      detail: SdkError.#getDescription(type),
    });
  }

  static #getDescription(errorType: SdkErrorTypes) {
    switch (errorType) {
      case SdkErrorTypes.ClientNotInitialized:
        return "Client was not initialized properly. Make sure that your environment supports WebAssembly.";

      case SdkErrorTypes.WebAssemblyNotSupported:
        return "Environment that was used doesn't support WebAssembly module.";

      case SdkErrorTypes.AddressInvalid:
        return "Address is invalid.";

      case SdkErrorTypes.AmountInvalid:
        return "Amount has to be greater than 0.";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
