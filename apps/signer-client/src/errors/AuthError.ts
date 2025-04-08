import { KeybanBaseError } from "@keyban/sdk-base/errors";

export enum AuthErrorType {
  EmbededAuthNotAllowed = "EmbededAuthNotAllowed",
  LoginFailed = "LoginFailed",
}

export class AuthError extends KeybanBaseError<AuthErrorType> {
  static types = AuthErrorType;

  constructor(
    type: AuthErrorType,
    instance: string,
    error?: Partial<AuthError>,
  ) {
    super({
      type,
      instance,
      title: AuthError.#getTitle(type),
      ...error,
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
