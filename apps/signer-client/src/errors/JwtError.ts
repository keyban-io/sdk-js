import { KeybanBaseError } from "@keyban/sdk-base/errors";

export enum JwtErrorType {
  InvalidToken = "InvalidToken",
}

export class JwtError extends KeybanBaseError<JwtErrorType> {
  static types = JwtErrorType;

  constructor(type: JwtErrorType, instance: string, rootError?: Error) {
    super({
      type,
      instance,
      rootError,
      title: JwtError.#getTitle(type),
    });
  }

  static #getTitle(errorType: JwtErrorType): string {
    switch (errorType) {
      case JwtErrorType.InvalidToken:
        return "You provided an invalid access token";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
