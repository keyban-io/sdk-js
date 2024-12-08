import { KeybanBaseError } from "@keyban/sdk-base/errors";

export enum CryptoErrorType {
  GenerateKey = "GenerateKey",
  ExportKey = "ExportKey",
  ImportKey = "ImportKey",
  Encrypt = "Encrypt",
  Decrypt = "Decrypt",
}

export class CryptoError extends KeybanBaseError<CryptoErrorType> {
  static types = CryptoErrorType;

  constructor(type: CryptoErrorType, instance: string, rootError?: Error) {
    super({
      type,
      instance,
      rootError,
      title: CryptoError.#getTitle(type),
    });
  }

  static #getTitle(errorType: CryptoErrorType): string {
    switch (errorType) {
      case CryptoErrorType.GenerateKey:
        return "Error generating a cryptographic key";

      case CryptoErrorType.ExportKey:
        return "Error exporting a cryptographic key";

      case CryptoErrorType.ImportKey:
        return "Error importing a cryptographic key";

      case CryptoErrorType.Encrypt:
        return "Error encrypting data";

      case CryptoErrorType.Decrypt:
        return "Error decrypting data";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
