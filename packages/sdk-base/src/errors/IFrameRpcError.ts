import { KeybanBaseError } from "./KeybanBaseError";

export enum IFrameRpcErrorType {
  InvalidOrigin = "InvalidOrigin",
  InvalidCall = "InvalidCall",
}

export class IFrameRpcError extends KeybanBaseError<IFrameRpcErrorType> {
  static types = IFrameRpcErrorType;

  constructor(type: IFrameRpcErrorType, instance: string, rootError?: Error) {
    super({
      type,
      instance,
      rootError,
      title: IFrameRpcError.#getTitle(type),
    });
  }

  static #getTitle(errorType: IFrameRpcErrorType): string {
    switch (errorType) {
      case IFrameRpcErrorType.InvalidOrigin:
        return "The current domain is not allowed for this appId";

      case IFrameRpcErrorType.InvalidCall:
        return "Invalid method call, either the method does not exists or is not allowed";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
