import type { KeybanBaseError } from './base';

/**
 * @enum
 * Enum representing possible SDK error types.
 *
 */
export enum SdkErrorTypes {
  /**
   * Client was not initialized properly. Make sure that your enviroment supports WebAssembly.
   */
  ClientNotInitialized = 'ClientNotInitialized',
  /**
   * Enviroment that was used doesn't support WebAssembly module.
   */
  WebAssemblyNotSupported = 'WebAssemblyNotSupported',
}

export class SdkError implements KeybanBaseError<SdkErrorTypes> {
  title: string;
  type: string;
  status: number | null = null;
  detail: string;
  instance: string;
  timestamp: string;
  rootError: Error | null;
  static types = SdkErrorTypes;

  constructor(type: SdkErrorTypes, instance: string, rootError?: Error) {
    this.title = type;
    this.type = type;
    this.detail = this.getDescription(type);
    this.instance = instance;
    this.timestamp = new Date().toISOString();
    this.rootError = rootError ?? null;
  }

  getDescription(errorType: SdkErrorTypes) {
    switch (errorType) {
      case SdkErrorTypes.ClientNotInitialized:
        return 'Client was not initialized properly. Make sure that your enviroment supports WebAssembly.';

      case SdkErrorTypes.WebAssemblyNotSupported:
        return "Enviroment that was used doesn't support WebAssembly module.";

      default:
        return 'Unknown error type';
    }
  }
}
