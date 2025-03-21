import { KeybanBaseError } from "@keyban/sdk-base/errors";

export enum TppErrorType {
  ClaimFailed = "ClaimFailed",
}

export class TppError extends KeybanBaseError<TppErrorType> {
  static types = TppErrorType;

  constructor(type: TppErrorType, instance: string, rootError?: Error) {
    super({
      type,
      instance,
      rootError,
      title: TppError.#getTitle(type),
    });
  }

  static #getTitle(errorType: TppErrorType): string {
    switch (errorType) {
      case TppErrorType.ClaimFailed:
        return "TPP claim failed";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
