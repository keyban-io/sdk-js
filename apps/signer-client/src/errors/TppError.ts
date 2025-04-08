import { KeybanBaseError } from "@keyban/sdk-base/errors";

export enum TppErrorType {
  ClaimFailed = "ClaimFailed",
}

export class TppError extends KeybanBaseError<TppErrorType> {
  static types = TppErrorType;

  constructor(type: TppErrorType, instance: string, error?: Partial<TppError>) {
    super({
      type,
      instance,
      title: TppError.#getTitle(type),
      ...error,
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
