import { KeybanBaseError } from "@keyban/sdk-base/errors";

export enum ClientShareErrorType {
  GetClientShare = "GetClientShare",
  SaveClientShare = "SaveClientShare",
}

export class ClientShareError extends KeybanBaseError<ClientShareErrorType> {
  static types = ClientShareErrorType;

  constructor(type: ClientShareErrorType, instance: string, rootError?: Error) {
    super({
      type,
      instance,
      rootError,
      title: ClientShareError.#getTitle(type),
    });
  }

  static #getTitle(errorType: ClientShareErrorType): string {
    switch (errorType) {
      case ClientShareErrorType.GetClientShare:
        return "Error getting client share";

      case ClientShareErrorType.SaveClientShare:
        return "Error saving client share";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
