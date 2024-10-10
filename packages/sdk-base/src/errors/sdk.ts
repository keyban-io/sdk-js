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
   * You provided an invalid access token.
   */
  InvalidAccessToken = "InvalidAccessToken",

  /**
   * Address is invalid.
   */
  AddressInvalid = "AddressInvalid",

  /**
   * Amount is invalid.
   */
  AmountInvalid = "AmountInvalid",

  /**
   * Amount is required.
   */
  AmountRequired = "AmountRequired",

  /**
   * Amount is irrelevant and should not be different than 1.
   */
  AmountIrrelevant = "AmountIrrelevant",


  /**
   * Recipient address same as sender address.
   */
  RecipientAddressEqualsSender = "RecipientAddressEqualsSender",

  /**
   * Gas estimation failed.
   */
  EstimateGasExecution = "EstimateGasExecution",

  /**
   * Insufficient funds.
   */
  InsufficientFunds = "InsufficientFunds",

  /**
   * InvalidNFTStandard.
   */
  InvalidNFTStandard = "InvalidNFTStandard",

  /**
   * NFTNotFound.
   */
  NFTNotFound = "NFTNotFound",
}

export class SdkError extends KeybanBaseError<SdkErrorTypes> {
  static types = SdkErrorTypes;

  constructor(type: SdkErrorTypes, instance: string, rootError?: Error) {
    super({
      type,
      instance,
      rootError,
      title: SdkError.#getTitle(type),
    });
  }

  static #getTitle(errorType: SdkErrorTypes) {
    switch (errorType) {
      case SdkErrorTypes.WebAssemblyNotSupported:
        return "Environment that was used doesn't support WebAssembly module";

      case SdkErrorTypes.InvalidAccessToken:
        return "You provided an invalid access token";

      case SdkErrorTypes.AddressInvalid:
        return "Address is invalid";

      case SdkErrorTypes.AmountInvalid:
        return "Amount has to be greater than 0";

      case SdkErrorTypes.AmountRequired:
        return "Amount is required for this operation";

      case SdkErrorTypes.AmountIrrelevant:
        return "Amount is irrelevant and should not be provided";

      case SdkErrorTypes.RecipientAddressEqualsSender:
        return "Recipient address is the same as the sender";

      case SdkErrorTypes.EstimateGasExecution:
        return "Gas estimation failed";

      case SdkErrorTypes.InsufficientFunds:
        return "Insufficient funds";

      case SdkErrorTypes.InvalidNFTStandard:
        return "Invalid NFT standard. Supported standards are: ERC721, ERC1155";

      case SdkErrorTypes.NFTNotFound:
        return "NFT not found";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
