/**
 * Enum representing possible SDK error types.
 *
 * - 'ClientNotInitialized': Client was not initialized properly. Make sure that your enviroment supports WebAssembly.
 * - 'WebAssemblyNotSupported': Enviroment that was used doesn't support WebAssembly module.
 */
export type SdkError = 'ClientNotInitialized' | 'WebAssemblyNotSupported';

export const parseSdkError = (errorType: `${string}:${SdkError}`) => {
  if (errorType.endsWith('ClientNotInitialized')) {
    return 'Client was not initialized properly. Make sure that your enviroment supports WebAssembly.';
  }

  if (errorType.endsWith('WebAssemblyNotSupported')) {
    return "Enviroment that was used doesn't support WebAssembly module.";
  }

  return 'Unkown error';
};
