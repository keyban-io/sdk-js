import { KeybanBaseError } from "@keyban/sdk-base/errors";

export enum WasmErrorType {
  WebAssemblyNotSupported = "WebAssemblyNotSupported",
  WebAssemblyInitialization = "WebAssemblyInitialization",
}

export class WasmError extends KeybanBaseError<WasmErrorType> {
  static types = WasmErrorType;

  constructor(
    type: WasmErrorType,
    instance: string,
    error?: Partial<WasmError>,
  ) {
    super({
      type,
      instance,
      title: WasmError.#getTitle(type),
      ...error,
    });
  }

  static #getTitle(errorType: WasmErrorType): string {
    switch (errorType) {
      case WasmErrorType.WebAssemblyNotSupported:
        return "Environment does not support WebAssembly modules";

      case WasmErrorType.WebAssemblyInitialization:
        return "Wasm signer method not implemented";

      default:
        return `Unknown error type: ${errorType}`;
    }
  }
}
