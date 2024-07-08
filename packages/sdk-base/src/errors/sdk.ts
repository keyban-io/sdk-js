import { KeybanBaseError } from './base';

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

export class SdkError extends KeybanBaseError<SdkErrorTypes> {
  static types = SdkErrorTypes;

  constructor(type: SdkErrorTypes, instance: string, rootError?: Error) {
    super(type, instance, rootError);
    this.detail = this.getDescription(type);
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
