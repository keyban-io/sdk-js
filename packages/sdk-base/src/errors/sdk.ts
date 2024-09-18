import { KeybanBaseError } from "./base";

/**
 * @enum
 * Enum representing possible SDK error types.
 *
 */
export enum SdkErrorTypes {
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

  /**
   * Recipient address same as sender address.
   */
  RecipientAddressEqualsSender = "RecipientAddressEqualsSender",

  /**
   * Insufficient funds.
   */
  EstimateGasExecution = "EstimateGasExecution",
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
      case SdkErrorTypes.WebAssemblyNotSupported:
        return "Environment that was used doesn't support WebAssembly module.";

      case SdkErrorTypes.AddressInvalid:
        return "Address is invalid.";

      case SdkErrorTypes.AmountInvalid:
        return "Amount has to be greater than 0.";

      case SdkErrorTypes.RecipientAddressEqualsSender:
        return "Recipient address is the same as the sender.";

      case SdkErrorTypes.EstimateGasExecution:
        return "Insufficient funds.";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
