import { KeybanBaseError } from "@keyban/sdk-base/errors";

export enum AuthErrorType {
  EmbededAuthNotAllowed = "EmbededAuthNotAllowed",
}

export class AuthError extends KeybanBaseError<AuthErrorType> {
  static types = AuthErrorType;

  constructor(type: AuthErrorType, instance: string, rootError?: Error) {
    super({
      type,
      instance,
      rootError,
      title: AuthError.#getTitle(type),
    });
  }

  static #getTitle(errorType: AuthErrorType): string {
    switch (errorType) {
      case AuthErrorType.EmbededAuthNotAllowed:
        return "Embeded authentication not allowed for this application";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
