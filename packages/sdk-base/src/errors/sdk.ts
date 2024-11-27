import { KeybanBaseError } from "./base";

/**
 * Enum representing all possible SDK error types.
 *
 * This enumeration defines the various error conditions that can occur within the Keyban SDK.
 * Each error type is associated with a specific scenario, allowing developers to handle errors
 * gracefully and provide meaningful feedback to users.
 *
 * @enum {string}
 */
export enum SdkErrorTypes {
  /**
   * The environment does not support WebAssembly modules.
   *
   * **Description:** WebAssembly is required for certain SDK functionalities.
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

  /**
   * The provided address is invalid.
   *
   * **Description:** The Ethereum address does not conform to the expected format.
   * **Possible Cause:** Typographical errors in the address or incorrect formatting.
   */
  AddressInvalid = "AddressInvalid",

  /**
   * The provided amount is invalid.
   *
   * **Description:** The amount specified for a transaction is not acceptable.
   * **Possible Cause:** Amount is zero, negative, or exceeds allowed limits.
   */
  AmountInvalid = "AmountInvalid",

  /**
   * The amount is required for this operation.
   *
   * **Description:** An operation that requires a monetary amount did not receive one.
   * **Possible Cause:** Missing amount parameter in the function call.
   */
  AmountRequired = "AmountRequired",

  /**
   * The amount provided is irrelevant and should not be provided.
   *
   * **Description:** An operation does not require an amount, but one was supplied.
   * **Possible Cause:** Misuse of the API by providing unnecessary parameters.
   */
  AmountIrrelevant = "AmountIrrelevant",

  /**
   * The recipient address is the same as the sender address.
   *
   * **Description:** A transaction was attempted where the sender and recipient are identical.
   * **Possible Cause:** User error in specifying addresses or attempting redundant transactions.
   */
  RecipientAddressEqualsSender = "RecipientAddressEqualsSender",

  /**
   * Gas estimation failed during transaction processing.
   *
   * **Description:** The SDK was unable to estimate the gas required for a transaction.
   * **Possible Cause:** Network issues, incorrect transaction parameters, or contract errors.
   */
  EstimateGasExecution = "EstimateGasExecution",

  /**
   * The account has insufficient funds to perform the operation.
   *
   * **Description:** The user's account balance is too low to cover the transaction amount and associated fees.
   * **Possible Cause:** Attempting a transaction with an amount exceeding the available balance.
   */
  InsufficientFunds = "InsufficientFunds",

  /**
   * The NFT standard provided is invalid.
   *
   * **Description:** An unsupported NFT standard was specified.
   * **Possible Cause:** Using an NFT standard other than ERC721 or ERC1155.
   */
  InvalidNftStandard = "InvalidNftStandard",

  /**
   * The specified NFT was not found.
   *
   * **Description:** The NFT identified by the provided contract address and token ID does not exist.
   * **Possible Cause:** Incorrect token ID, wrong contract address, or the NFT has been burned.
   */
  NftNotFound = "NftNotFound",
}

/**
 * Class representing an SDK-specific error.
 *
 * The `SdkError` class extends the `KeybanBaseError` to provide detailed error information
 * based on predefined `SdkErrorTypes`. It facilitates consistent error handling across
 * the Keyban SDK by categorizing errors and providing meaningful messages.
 *
 * @extends KeybanBaseError
 */
export class SdkError extends KeybanBaseError<SdkErrorTypes> {
  /**
   * The available SDK error types.
   *
   * @static
   * @type {typeof SdkErrorTypes}
   */
  static types = SdkErrorTypes;

  /**
   * Creates an instance of `SdkError`.
   *
   * @param {SdkErrorTypes} type - The specific type of SDK error.
   * @param {string} instance - The identifier of the instance where the error occurred.
   * @param {Error} [rootError] - The original error that caused this SDK error, if any.
   *
   * @throws {SdkError} Throws an error if an unknown `SdkErrorTypes` is provided.
   *
   * @example
   * ```typescript
   * throw new SdkError(SdkErrorTypes.InsufficientFunds, "transferFunction");
   * ```
   */
  constructor(type: SdkErrorTypes, instance: string, rootError?: Error) {
    super({
      type,
      instance,
      rootError,
      title: SdkError.#getTitle(type),
    });
  }

  /**
   * Retrieves a human-readable title based on the error type.
   *
   * @private
   * @param {SdkErrorTypes} errorType - The type of SDK error.
   * @returns {string} A descriptive title for the error.
   *
   * @example
   * ```typescript
   * const title = SdkError.#getTitle(SdkErrorTypes.InvalidAccessToken);
   * console.log(title); // Outputs: "You provided an invalid access token"
   * ```
   */
  static #getTitle(errorType: SdkErrorTypes): string {
    switch (errorType) {
      case SdkErrorTypes.WebAssemblyNotSupported:
        return "Environment does not support WebAssembly modules";

      case SdkErrorTypes.InvalidAccessToken:
        return "You provided an invalid access token";

      case SdkErrorTypes.AddressInvalid:
        return "Address is invalid";

      case SdkErrorTypes.AmountInvalid:
        return "The specified amount is invalid";

      case SdkErrorTypes.AmountRequired:
        return "An amount is required for this operation";

      case SdkErrorTypes.AmountIrrelevant:
        return "The amount provided is irrelevant and should not be included";

      case SdkErrorTypes.RecipientAddressEqualsSender:
        return "Recipient address cannot be the same as the sender address";

      case SdkErrorTypes.EstimateGasExecution:
        return "Gas estimation failed";

      case SdkErrorTypes.InsufficientFunds:
        return "Insufficient funds to complete the transaction";

      case SdkErrorTypes.InvalidNftStandard:
        return "Invalid NFT standard. Supported standards are ERC721 and ERC1155";

      case SdkErrorTypes.NftNotFound:
        return "NFT not found with the provided contract address and token ID";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
