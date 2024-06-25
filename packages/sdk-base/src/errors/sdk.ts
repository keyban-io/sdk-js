export type SdkError = 'ClientNotInitialized';

export const parseSdkError = (errorType: `${string}:${SdkError}`) => {
  if (errorType.endsWith('ClientNotInitialized')) {
    return 'Client was not initialized properly. Make sure that your enviroment supports WebAssembly.';
  }

  return 'Unkown error';
};
